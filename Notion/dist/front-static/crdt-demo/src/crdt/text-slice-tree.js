import { END, idKey, START } from "./ids.js"
import { INITIAL_SEARCH_LABEL, printableSearchLabel, splitSearchLabel } from "./search-labels.js"

export class TextSlice {
	constructor({ textInstanceId, startItemId = START, endItemId = END, searchLabel = INITIAL_SEARCH_LABEL }) {
		this.textInstanceId = textInstanceId
		this.startItemId = startItemId
		this.endItemId = endItemId
		this.searchLabel = searchLabel
	}
}

export class TextSliceTreeNode {
	constructor(textSlice) {
		this.textSlice = textSlice
		this.parent = undefined
		this.children = []
	}

	appendChild(child) {
		if (child.parent) throw new Error("A text-slice-tree node can only have one parent")
		for (let cursor = this; cursor; cursor = cursor.parent) {
			if (cursor === child) throw new Error("Moving this text slice would create a cycle")
		}
		child.parent = this
		this.children.push(child)
	}

	detachFromParent() {
		if (!this.parent) return
		const index = this.parent.children.indexOf(this)
		if (index >= 0) this.parent.children.splice(index, 1)
		this.parent = undefined
	}
}

export function createEmptyTextSliceTree(textInstanceId) {
	return new TextSliceTreeNode(new TextSlice({ textInstanceId }))
}

export function* iterateTextSliceTree(root) {
	const stack = [root]
	while (stack.length > 0) {
		const node = stack.pop()
		yield node
		for (let index = node.children.length - 1; index >= 0; index -= 1) {
			stack.push(node.children[index])
		}
	}
}

export function sliceItemBounds(textSlice, rga) {
	const traversal = rga.traversal()
	const start =
		textSlice.startItemId === START
			? 0
			: traversal.entryById.get(idKey(textSlice.startItemId)) + 1
	const end =
		textSlice.endItemId === END
			? traversal.items.length
			: traversal.entryById.get(idKey(textSlice.endItemId))
	if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
		throw new Error("Text slice boundaries are not present in its text instance")
	}
	return { start, end, traversal }
}

export function itemsInTextSlice(textSlice, rga, { includeDeleted = false, includeSplitItems = false } = {}) {
	const { start, end, traversal } = sliceItemBounds(textSlice, rga)
	return traversal.items.slice(start, end).filter(item => {
		if (item.kind === "split") return includeSplitItems
		return includeDeleted || !item.deleted
	})
}

export function textSliceContainsItem(textSlice, rga, itemId) {
	const { start, end, traversal } = sliceItemBounds(textSlice, rga)
	const position = traversal.entryById.get(idKey(itemId))
	return position !== undefined && start <= position && position < end
}

export function splitTextSliceTreeNode(node, markerId, rga) {
	const oldEndItemId = node.textSlice.endItemId
	const oldChildren = node.children
	const [leftLabel, rightLabel] = splitSearchLabel(node.textSlice.searchLabel)
	node.textSlice.endItemId = markerId
	node.textSlice.searchLabel = leftLabel
	node.children = []

	const rightNode = new TextSliceTreeNode(
		new TextSlice({
			textInstanceId: node.textSlice.textInstanceId,
			startItemId: markerId,
			endItemId: oldEndItemId,
			searchLabel: rightLabel,
		}),
	)
	node.appendChild(rightNode)
	for (const child of oldChildren) {
		child.parent = undefined
		rightNode.appendChild(child)
	}

	// Read both sides now so invalid boundary placement fails immediately.
	itemsInTextSlice(node.textSlice, rga)
	itemsInTextSlice(rightNode.textSlice, rga)
	return rightNode
}

export function debugTextSliceTree(root, instances) {
	const visit = node => {
		const instance = instances.get(node.textSlice.textInstanceId)
		return {
			textInstanceId: node.textSlice.textInstanceId,
			startItemId: idKey(node.textSlice.startItemId),
			endItemId: idKey(node.textSlice.endItemId),
			searchLabel: node.textSlice.searchLabel,
			printableLabel: printableSearchLabel(node.textSlice.searchLabel),
			text: itemsInTextSlice(node.textSlice, instance.rga)
				.filter(item => item.kind === "text")
				.map(item => item.content)
				.join(""),
			children: node.children.map(visit),
		}
	}
	return visit(root)
}
