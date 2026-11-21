import { compressIdsToRanges, displayId, idKey, LamportClock } from "./ids.js"
import { CrdtDocument, textInstanceIdForBlock, transactionClockMax } from "./document.js"
import { iterateTextSliceTree } from "./text-slice-tree.js"

function clone(value) {
	return JSON.parse(JSON.stringify(value))
}

function pointer(blockId) {
	return { table: "block", id: blockId }
}

function textOperation(command, blockId, args) {
	return { command, pointer: pointer(blockId), path: [], opVersion: 2, args }
}

function contiguousSegments(characters) {
	const segments = []
	for (const character of characters) {
		const previous = segments.at(-1)
		if (previous?.textInstanceId === character.textInstanceId) {
			previous.characters.push(character)
		} else {
			segments.push({ textInstanceId: character.textInstanceId, characters: [character] })
		}
	}
	return segments
}

export class Replica {
	constructor(sessionId, name, initialTransactions) {
		this.sessionId = sessionId
		this.name = name
		this.clock = new LamportClock(sessionId)
		this.transactionMap = new Map()
		for (const transaction of initialTransactions) this.receive(transaction)
	}

	receive(transaction) {
		const key = idKey(transaction.id)
		const existing = this.transactionMap.get(key)
		if (existing) {
			if (JSON.stringify(existing) !== JSON.stringify(transaction)) {
				throw new Error(`Transaction ID ${key} was reused with a different payload`)
			}
			return false
		}
		this.transactionMap.set(key, clone(transaction))
		this.clock.observe({ sessionId: transaction.id.sessionId, counter: transactionClockMax(transaction) })
		return true
	}

	document() {
		return new CrdtDocument(this.transactions())
	}

	transactions() {
		return [...this.transactionMap.values()]
	}

	insertText(blockId, index, content) {
		if ([...content].length === 0) return undefined
		const location = this.document().locateInsertion(blockId, index)
		const id = this.clock.reserve([...content].length)
		const transaction = {
			id,
			operations: [
				textOperation("insertText", blockId, {
					textInstanceId: location.textInstanceId,
					searchLabel: location.searchLabel,
					id,
					originId: location.originId,
					content,
				}),
			],
		}
		this.receive(transaction)
		return transaction
	}

	deleteText(blockId, start, end) {
		if (start === end) return undefined
		const document = this.document()
		const characters = document.blockCharacters(blockId).slice(start, end)
		if (characters.length === 0) return undefined
		const byInstance = new Map()
		for (const character of characters) {
			const group = byInstance.get(character.textInstanceId) ?? []
			group.push(character)
			byInstance.set(character.textInstanceId, group)
		}
		const transaction = {
			id: this.clock.reserve(),
			operations: [...byInstance.values()].map(group =>
				textOperation("deleteText", blockId, {
					textInstanceId: group[0].textInstanceId,
					searchLabel: group[0].searchLabel,
					idRanges: compressIdsToRanges(group.map(character => character.item.id)),
				}),
			),
		}
		this.receive(transaction)
		return transaction
	}

	toggleBold(blockId, start, end) {
		if (start === end) return undefined
		const document = this.document()
		const characters = document.blockCharacters(blockId).slice(start, end)
		if (characters.length === 0) return undefined
		const remove = characters.every(character => character.bold)
		const operations = []
		let transactionId
		for (const segment of contiguousSegments(characters)) {
			const id = this.clock.reserve()
			transactionId ??= id
			const first = segment.characters[0]
			const last = segment.characters.at(-1)
			operations.push(
				textOperation(remove ? "removeAnnotation" : "addAnnotation", blockId, {
					textInstanceId: segment.textInstanceId,
					searchLabel: first.searchLabel,
					id,
					...document.annotationAnchors(first, last),
					...(remove ? { annotationKey: "b" } : { annotation: ["b"] }),
				}),
			)
		}
		const transaction = { id: transactionId, operations }
		this.receive(transaction)
		return transaction
	}

	createBlock(afterBlockId) {
		const document = this.document()
		if (afterBlockId && !document.aliveBlocks().some(block => block.id === afterBlockId)) {
			throw new Error(`Cannot create a block after unknown block ${afterBlockId}`)
		}
		const id = this.clock.reserve()
		const newBlockId = `${this.sessionId}-block-${id.counter}`
		const transaction = {
			id,
			operations: [
				{
					command: "createBlock",
					pointer: pointer(newBlockId),
					path: [],
					args: {
						blockId: newBlockId,
						afterBlockId,
						titleTextInstanceId: textInstanceIdForBlock(newBlockId),
					},
				},
			],
		}
		this.receive(transaction)
		return { transaction, newBlockId }
	}

	splitBlock(blockId, index) {
		const document = this.document()
		const location = document.locateInsertion(blockId, index)
		const splitId = this.clock.reserve()
		const newBlockId = `${this.sessionId}-block-${splitId.counter}`
		const newTextInstanceId = textInstanceIdForBlock(newBlockId)
		const transaction = {
			id: splitId,
			operations: [
				{
					command: "createBlock",
					pointer: pointer(newBlockId),
					path: [],
					args: {
						blockId: newBlockId,
						afterBlockId: blockId,
						titleTextInstanceId: newTextInstanceId,
					},
				},
				textOperation("splitText", blockId, {
					textInstanceId: location.textInstanceId,
					searchLabel: location.searchLabel,
					id: splitId,
					originId: location.originId,
				}),
				textOperation("moveTextSliceIntoBlock", blockId, {
					textInstanceId: location.textInstanceId,
					sourceSearchLabel: location.searchLabel,
					textSliceStartItemId: splitId,
					targetBlockId: newBlockId,
				}),
			],
		}
		this.receive(transaction)
		return { transaction, newBlockId }
	}

	mergeBlock(blockId) {
		const document = this.document()
		const blocks = document.aliveBlocks()
		const sourceIndex = blocks.findIndex(block => block.id === blockId)
		if (sourceIndex <= 0) return undefined
		const source = blocks[sourceIndex]
		const target = blocks[sourceIndex - 1]
		const sourceRootSlice = source.title.textSlice
		let targetLastNode = target.title
		for (const node of iterateTextSliceTree(target.title)) targetLastNode = node

		this.clock.reserve(20)
		const splitId = this.clock.reserve()
		const transaction = {
			id: splitId,
			operations: [
				textOperation("splitText", source.id, {
					textInstanceId: sourceRootSlice.textInstanceId,
					searchLabel: sourceRootSlice.searchLabel,
					id: splitId,
					originId: sourceRootSlice.startItemId,
				}),
				textOperation("moveTextSlice", source.id, {
					textInstanceId: sourceRootSlice.textInstanceId,
					sourceSearchLabel: sourceRootSlice.searchLabel,
					textSliceStartItemId: splitId,
					targetBlockId: target.id,
					targetTextInstanceId: targetLastNode.textSlice.textInstanceId,
					targetSearchLabel: targetLastNode.textSlice.searchLabel,
					targetTextSliceEndItemId: targetLastNode.textSlice.endItemId,
					isMerge: true,
				}),
				{
					command: "removeBlock",
					pointer: pointer(source.id),
					path: [],
					args: { blockId: source.id },
				},
			],
		}
		this.receive(transaction)
		return { transaction, targetBlockId: target.id, targetIndex: document.blockCharacters(target.id).length }
	}
}

export function transactionSummary(transaction, labels = {}) {
	const blockId = labels.blockId ?? (value => value)
	const textInstanceId = labels.textInstanceId ?? (value => value)
	return transaction.operations
		.map(operation => {
			switch (operation.command) {
				case "insertText":
					return `${displayId(operation.args.id)} insert ${JSON.stringify(operation.args.content)} after ${displayId(operation.args.originId)}`
				case "deleteText":
					return `delete ${operation.args.idRanges.reduce((sum, range) => sum + range[1], 0)} item(s)`
				case "splitText":
					return `${displayId(operation.args.id)} split ${textInstanceId(operation.args.textInstanceId)}`
				case "moveTextSliceIntoBlock":
					return `move slice into ${blockId(operation.args.targetBlockId)}`
				case "moveTextSlice":
					return `move slice to ${blockId(operation.args.targetBlockId)}`
				case "createBlock":
					return `create ${blockId(operation.args.blockId)}`
				case "removeBlock":
					return `remove ${blockId(operation.args.blockId)}`
				case "addAnnotation":
					return `${displayId(operation.args.id)} add bold`
				case "removeAnnotation":
					return `${displayId(operation.args.id)} remove bold`
				default:
					return operation.command
			}
		})
		.join(" · ")
}
