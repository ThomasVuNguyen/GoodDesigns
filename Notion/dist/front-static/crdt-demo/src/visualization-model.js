import { displayId, idKey } from "./crdt/ids.js"
import { richTextTokens } from "./crdt/rich-text.js"
import { itemsInTextSlice, iterateTextSliceTree } from "./crdt/text-slice-tree.js"
import { printableSearchLabel } from "./crdt/search-labels.js"

function formatAnchor(anchor) {
	if (typeof anchor.id === "string") return anchor.id
	return `${displayId(anchor.id)}${(anchor.anchor ?? anchor.affinity) === "before" ? "<" : ">"}`
}

function tokensForSlice(node, instance) {
	const richCharacters = new Map(instance.richCharacters().map(character => [idKey(character.id), character]))
	return richTextTokens(
		itemsInTextSlice(node.textSlice, instance.rga)
			.filter(item => item.kind === "text")
			.map(item => richCharacters.get(idKey(item.id))),
	)
}

export function createVisualizationModel(state) {
	const blockIds = new Map()
	const instanceIds = new Map()
	const blocks = state.aliveBlocks()

	const allBlocks = [...state.blocks.values()]
	const allInstances = [...state.instances.values()]
	allBlocks.forEach((block, index) => blockIds.set(block.id, `B${index + 1}`))
	for (const instance of allInstances) {
		const originBlockId = blockIds.get(instance.id)
		if (!originBlockId) throw new Error(`Text instance ${instance.id} has no origin block`)
		instanceIds.set(instance.id, originBlockId)
	}

	const blockTrees = blocks.map(block => {
		const slices = []
		const visit = (node, depth) => {
			const instance = state.instances.get(node.textSlice.textInstanceId)
			slices.push({
				instanceId: instanceIds.get(instance.id),
				depth,
				searchLabel: printableSearchLabel(node.textSlice.searchLabel),
				tokens: tokensForSlice(node, instance),
			})
			for (const child of node.children) visit(child, depth + 1)
		}
		visit(block.title, 0)
		return { id: blockIds.get(block.id), rawId: block.id, slices }
	})

	const instances = allInstances.map(instance => ({
		id: instanceIds.get(instance.id),
		rawId: instance.id,
		tokens: richTextTokens(instance.richCharacters()),
		annotations: instance.annotationOperations.map(operation => ({
			id: displayId(operation.id),
			value: operation.value,
			start: formatAnchor(operation.start),
			end: formatAnchor(operation.end),
		})),
	}))

	return { blockIds, instanceIds, blockTrees, instances }
}
