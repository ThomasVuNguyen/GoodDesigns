import { compareOpIds, END, expandIdRanges, idKey, sameId, START } from "./ids.js"
import { RgaText } from "./rga.js"
import { resolveRichText, richTextTokens } from "./rich-text.js"
import {
	createEmptyTextSliceTree,
	debugTextSliceTree,
	itemsInTextSlice,
	iterateTextSliceTree,
	splitTextSliceTreeNode,
	textSliceContainsItem,
} from "./text-slice-tree.js"

export function textInstanceIdForBlock(blockId) {
	return blockId
}

export class TextInstance {
	constructor(id) {
		this.id = id
		this.rga = new RgaText()
		this.annotationOperations = []
	}

	richCharacters() {
		return resolveRichText(this.rga, this.annotationOperations)
	}
}

export class BlockRecord {
	constructor(id, titleTextInstanceId) {
		this.id = id
		this.type = "text"
		this.alive = true
		this.title = createEmptyTextSliceTree(titleTextInstanceId)
	}
}

export class CrdtDocument {
	constructor(transactions = []) {
		this.blocks = new Map()
		this.blockOrder = []
		this.instances = new Map()
		this.textSliceBlockMappings = new Map()
		this.transactions = [...transactions].sort((a, b) => compareOpIds(a.id, b.id))
		for (const transaction of this.transactions) {
			for (const operation of transaction.operations) this.#apply(operation)
			this.#rebuildMappings()
		}
		this.#assertInvariants()
	}

	#instance(id) {
		let instance = this.instances.get(id)
		if (!instance) {
			instance = new TextInstance(id)
			this.instances.set(id, instance)
		}
		return instance
	}

	#apply(operation) {
		switch (operation.command) {
			case "createBlock":
				this.#createBlock(operation.args)
				break
			case "removeBlock":
				this.#removeBlock(operation.args.blockId)
				break
			case "insertText": {
				const instance = this.#instance(operation.args.textInstanceId)
				instance.rga.insertRun(operation.args.id, operation.args.originId, operation.args.content)
				break
			}
			case "deleteText": {
				const instance = this.#instance(operation.args.textInstanceId)
				instance.rga.delete(expandIdRanges(operation.args.idRanges))
				break
			}
			case "splitText":
				this.#splitText(operation.args)
				break
			case "moveTextSliceIntoBlock":
				this.#moveTextSliceIntoBlock(operation.args)
				break
			case "moveTextSlice":
				this.#moveTextSlice(operation.args)
				break
			case "addAnnotation":
			case "removeAnnotation": {
				const instance = this.#instance(operation.args.textInstanceId)
				instance.annotationOperations.push({
					type: "bold",
					id: operation.args.id,
					start: operation.args.start,
					end: operation.args.end,
					value: operation.command === "addAnnotation",
				})
				break
			}
			default:
				throw new Error(`Unknown operation command: ${operation.command}`)
		}
	}

	#createBlock({ blockId, afterBlockId, titleTextInstanceId }) {
		const existing = this.blocks.get(blockId)
		if (existing) {
			if (existing.title.textSlice.textInstanceId !== titleTextInstanceId) {
				throw new Error(`Block ${blockId} was recreated with a different title instance`)
			}
			existing.alive = true
			return
		}
		this.#instance(titleTextInstanceId)
		this.blocks.set(blockId, new BlockRecord(blockId, titleTextInstanceId))
		const afterIndex = afterBlockId ? this.blockOrder.indexOf(afterBlockId) : -1
		this.blockOrder.splice(afterIndex + 1, 0, blockId)
	}

	#removeBlock(blockId) {
		const block = this.blocks.get(blockId)
		if (!block) return
		block.alive = false
		const index = this.blockOrder.indexOf(blockId)
		if (index >= 0) this.blockOrder.splice(index, 1)
	}

	#splitText(args) {
		const instance = this.#instance(args.textInstanceId)
		instance.rga.insertSplit(args.id, args.originId)
		const match = this.#allNodes().find(
			({ node }) =>
				node.textSlice.textInstanceId === args.textInstanceId &&
				textSliceContainsItem(node.textSlice, instance.rga, args.id),
		)
		if (!match) throw new Error("No text slice contains the new split marker")
		splitTextSliceTreeNode(match.node, args.id, instance.rga)
	}

	#moveTextSliceIntoBlock(args) {
		const source = this.#findNodeStartingWith(args.textInstanceId, args.textSliceStartItemId)
		const targetBlock = this.blocks.get(args.targetBlockId)
		if (!source || !targetBlock) throw new Error("Unable to resolve moveTextSliceIntoBlock")
		if (!source.node.parent) throw new Error("The root text slice cannot be moved into a new block")
		source.node.detachFromParent()
		targetBlock.title.appendChild(source.node)
	}

	#moveTextSlice(args) {
		const source = this.#findNodeStartingWith(args.textInstanceId, args.textSliceStartItemId)
		const target = this.#findNodeEndingWith(args.targetTextInstanceId, args.targetTextSliceEndItemId)
		if (!source || !target) throw new Error("Unable to resolve moveTextSlice")
		if (!source.node.parent) throw new Error("The root text slice cannot be moved")
		const originalParent = source.node.parent
		source.node.detachFromParent()
		try {
			target.node.appendChild(source.node)
		} catch {
			// Structural conflicts that would create a cycle are deterministic no-ops.
			if (source.node.parent) source.node.detachFromParent()
			originalParent.appendChild(source.node)
		}
	}

	#allNodes() {
		const result = []
		for (const block of this.blocks.values()) {
			for (const node of iterateTextSliceTree(block.title)) result.push({ block, node })
		}
		return result
	}

	#findNodeStartingWith(textInstanceId, startItemId) {
		return this.#allNodes().find(
			({ node }) =>
				node.textSlice.textInstanceId === textInstanceId &&
				sameId(node.textSlice.startItemId, startItemId),
		)
	}

	#findNodeEndingWith(textInstanceId, endItemId) {
		return this.#allNodes().find(
			({ node }) =>
				node.textSlice.textInstanceId === textInstanceId &&
				sameId(node.textSlice.endItemId, endItemId),
		)
	}

	#rebuildMappings() {
		this.textSliceBlockMappings.clear()
		for (const { block, node } of this.#allNodes()) {
			const slice = node.textSlice
			const key = `${slice.textInstanceId}|${slice.searchLabel}`
			if (this.textSliceBlockMappings.has(key)) {
				throw new Error(`Duplicate text-slice search label ${key}`)
			}
			this.textSliceBlockMappings.set(key, {
				textInstanceId: slice.textInstanceId,
				searchLabel: slice.searchLabel,
				blockId: block.id,
				textSliceStartItemId: slice.startItemId,
			})
		}
	}

	#assertInvariants() {
		const seenNodes = new Set()
		const visibleIdsByInstance = new Map()
		for (const block of this.blocks.values()) {
			if (block.title.parent) throw new Error("A block title root cannot have a parent")
			for (const node of iterateTextSliceTree(block.title)) {
				if (seenNodes.has(node)) throw new Error("A text slice is owned by multiple blocks")
				seenNodes.add(node)
				const instance = this.instances.get(node.textSlice.textInstanceId)
				if (!instance) throw new Error("Text slice references a missing text instance")
				const ids = visibleIdsByInstance.get(instance.id) ?? []
				ids.push(
					...itemsInTextSlice(node.textSlice, instance.rga)
						.filter(item => item.kind === "text")
						.map(item => idKey(item.id)),
				)
				visibleIdsByInstance.set(instance.id, ids)
			}
		}
		for (const instance of this.instances.values()) {
			const expected = instance.rga.visibleItems().map(item => idKey(item.id)).sort()
			const actual = (visibleIdsByInstance.get(instance.id) ?? []).sort()
			if (expected.join("|") !== actual.join("|")) {
				throw new Error(`Text slices must partition text instance ${instance.id}`)
			}
		}
	}

	aliveBlocks() {
		return this.blockOrder.map(id => this.blocks.get(id)).filter(block => block?.alive)
	}

	blockCharacters(blockId) {
		const block = this.blocks.get(blockId)
		if (!block) throw new Error(`Unknown block ${blockId}`)
		const richByInstance = new Map(
			[...this.instances.values()].map(instance => [
				instance.id,
				new Map(instance.richCharacters().map(character => [idKey(character.id), character])),
			]),
		)
		const result = []
		for (const node of iterateTextSliceTree(block.title)) {
			const slice = node.textSlice
			const instance = this.instances.get(slice.textInstanceId)
			for (const item of itemsInTextSlice(slice, instance.rga)) {
				if (item.kind !== "text") continue
				const rich = richByInstance.get(instance.id).get(idKey(item.id))
				result.push({
					...rich,
					blockId,
					textInstanceId: instance.id,
					searchLabel: slice.searchLabel,
					node,
					item,
				})
			}
		}
		return result
	}

	blockText(blockId) {
		return this.blockCharacters(blockId).map(character => character.text).join("")
	}

	blockTokens(blockId) {
		return richTextTokens(this.blockCharacters(blockId))
	}

	locateInsertion(blockId, index) {
		const block = this.blocks.get(blockId)
		const characters = this.blockCharacters(blockId)
		if (!block || index < 0 || index > characters.length) throw new Error("Invalid block insertion point")
		if (index > 0) {
			const previous = characters[index - 1]
			return {
				textInstanceId: previous.textInstanceId,
				searchLabel: previous.searchLabel,
				originId: previous.item.id,
				node: previous.node,
			}
		}

		let fallback = block.title
		for (const node of iterateTextSliceTree(block.title)) {
			fallback = node
			const instance = this.instances.get(node.textSlice.textInstanceId)
			if (itemsInTextSlice(node.textSlice, instance.rga).some(item => item.kind === "text")) {
				return {
					textInstanceId: node.textSlice.textInstanceId,
					searchLabel: node.textSlice.searchLabel,
					originId: node.textSlice.startItemId,
					node,
				}
			}
		}
		return {
			textInstanceId: fallback.textSlice.textInstanceId,
			searchLabel: fallback.textSlice.searchLabel,
			originId: fallback.textSlice.startItemId,
			node: fallback,
		}
	}

	annotationAnchors(firstCharacter, lastCharacter) {
		const instance = this.instances.get(firstCharacter.textInstanceId)
		if (!instance || instance.id !== lastCharacter.textInstanceId) {
			throw new Error("One annotation operation must stay within a text instance")
		}
		const visible = instance.rga.visibleItems()
		const lastIndex = visible.findIndex(item => sameId(item.id, lastCharacter.item.id))
		return {
			start: { id: firstCharacter.item.id, anchor: "before" },
			end: visible[lastIndex + 1]
				? { id: visible[lastIndex + 1].id, anchor: "before" }
				: { id: END, anchor: "before" },
		}
	}

	debugBlock(blockId) {
		const block = this.blocks.get(blockId)
		return debugTextSliceTree(block.title, this.instances)
	}
}

export function createInitialTransactions(text = "Build things") {
	const blockId = "block-A"
	const textInstanceId = textInstanceIdForBlock(blockId)
	return [
		{
			id: { sessionId: "A", counter: 1 },
			operations: [
				{
					command: "createBlock",
					pointer: { table: "block", id: blockId },
					path: [],
					args: { blockId, afterBlockId: undefined, titleTextInstanceId: textInstanceId },
				},
				{
					command: "insertText",
					pointer: { table: "block", id: blockId },
					path: [],
					opVersion: 2,
					args: {
						textInstanceId,
						searchLabel: "",
						id: { sessionId: "A", counter: 1 },
						originId: START,
						content: text,
					},
				},
			],
		},
	]
}

export function transactionClockMax(transaction) {
	let maximum = transaction.id.counter
	for (const operation of transaction.operations) {
		const id = operation.args?.id
		if (!id || typeof id === "string") continue
		const length = operation.command === "insertText" ? [...operation.args.content].length : 1
		maximum = Math.max(maximum, id.counter + length - 1)
	}
	return maximum
}
