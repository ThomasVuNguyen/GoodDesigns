import { compareOpIds, END, idKey, START } from "./ids.js"

function anchorPosition(anchor, traversal) {
	if (anchor.id === START) return 0
	if (anchor.id === END) return traversal.items.length
	const key = idKey(anchor.id)
	return (anchor.anchor ?? anchor.affinity) === "before"
		? traversal.entryById.get(key)
		: traversal.exitById.get(key)
}

function operationContainsItem(operation, itemIndex, traversal) {
	const start = anchorPosition(operation.start, traversal)
	const end = anchorPosition(operation.end, traversal)
	return start !== undefined && end !== undefined && start <= itemIndex && itemIndex < end
}

/**
 * Resolve one boolean rich-text mark. Operations are sorted by Lamport ID and
 * the last add/remove operation covering a character wins.
 */
export function resolveRichText(rga, operations) {
	const traversal = rga.traversal()
	const sortedOperations = [...operations].sort((a, b) => compareOpIds(a.id, b.id))
	const characters = []

	traversal.items.forEach((item, itemIndex) => {
		if (item.kind !== "text" || item.deleted) return
		let bold = false
		for (const operation of sortedOperations) {
			if (operationContainsItem(operation, itemIndex, traversal)) {
				bold = operation.value
			}
		}
		characters.push({ id: item.id, text: item.content, bold })
	})
	return characters
}

export function richTextTokens(characters) {
	const tokens = []
	for (const character of characters) {
		const previous = tokens.at(-1)
		if (previous?.bold === character.bold) {
			previous.text += character.text
		} else {
			tokens.push({ text: character.text, bold: character.bold })
		}
	}
	return tokens
}
