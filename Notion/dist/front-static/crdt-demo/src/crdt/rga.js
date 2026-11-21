import { compareItemIds, idKey, nextId, sameId, START } from "./ids.js"

function cloneId(id) {
	return typeof id === "string" ? id : { ...id }
}

function itemsEqual(a, b) {
	return (
		a.kind === b.kind &&
		sameId(a.id, b.id) &&
		sameId(a.originId, b.originId) &&
		a.content === b.content
	)
}

/**
 * A deliberately direct Replicated Growable Array implementation.
 *
 * Items are stored in a map by stable ID. Their linear order is derived from
 * the causal tree: an item follows its origin, siblings sort by descending ID,
 * and the tree is read in preorder. Receiving the same item twice is harmless.
 */
export class RgaText {
	constructor() {
		this.items = new Map()
		this.deletedIds = new Set()
	}

	insertRun(firstId, originId, content) {
		const characters = [...content]
		if (characters.length === 0) return

		let previousId = cloneId(originId)
		characters.forEach((character, index) => {
			const id = nextId(firstId, index)
			this.#integrate({
				kind: "text",
				id,
				originId: previousId,
				content: character,
				deleted: this.deletedIds.has(idKey(id)),
			})
			previousId = id
		})
	}

	insertSplit(id, originId) {
		this.#integrate({
			kind: "split",
			id: cloneId(id),
			originId: cloneId(originId),
			deleted: false,
		})
	}

	delete(itemIds) {
		for (const id of itemIds) {
			const key = idKey(id)
			this.deletedIds.add(key)
			const item = this.items.get(key)
			if (item?.kind === "text") item.deleted = true
		}
	}

	#integrate(item) {
		const key = idKey(item.id)
		const existing = this.items.get(key)
		if (existing) {
			if (!itemsEqual(existing, item)) {
				throw new Error(`Operation ID ${key} was reused for different content`)
			}
			return
		}
		if (sameId(item.id, item.originId)) {
			throw new Error("An RGA item cannot be its own origin")
		}
		this.items.set(key, item)
	}

	/** Returns every reachable item, including split markers and tombstones. */
	orderedItems() {
		return this.traversal().items
	}

	/**
	 * Returns preorder indexes and subtree exits. `exitById` is exclusive, so
	 * it also acts as the stable position represented by an `after` anchor.
	 */
	traversal() {
		const children = new Map()
		for (const item of this.items.values()) {
			const originKey = idKey(item.originId)
			const siblings = children.get(originKey) ?? []
			siblings.push(item)
			children.set(originKey, siblings)
		}
		for (const siblings of children.values()) {
			siblings.sort((a, b) => -compareItemIds(a.id, b.id))
		}

		const items = []
		const entryById = new Map()
		const exitById = new Map()
		const visiting = new Set()
		const visitChildren = origin => {
			for (const item of children.get(idKey(origin)) ?? []) {
				const key = idKey(item.id)
				if (visiting.has(key)) throw new Error("Cycle in RGA origin graph")
				visiting.add(key)
				entryById.set(key, items.length)
				items.push(item)
				visitChildren(item.id)
				exitById.set(key, items.length)
				visiting.delete(key)
			}
		}
		visitChildren(START)

		return { items, entryById, exitById }
	}

	visibleItems() {
		return this.orderedItems().filter(item => item.kind === "text" && !item.deleted)
	}

	visibleText() {
		return this.visibleItems().map(item => item.content).join("")
	}

	originAtVisibleIndex(index) {
		const visible = this.visibleItems()
		if (!Number.isInteger(index) || index < 0 || index > visible.length) {
			throw new Error(`Invalid insertion index ${index}`)
		}
		return index === 0 ? START : cloneId(visible[index - 1].id)
	}

	idsInVisibleRange(start, end) {
		const visible = this.visibleItems()
		if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end > visible.length) {
			throw new Error(`Invalid deletion range [${start}, ${end})`)
		}
		return visible.slice(start, end).map(item => cloneId(item.id))
	}

	anchorsForVisibleRange(start, end) {
		if (start === end) return undefined
		const visible = this.visibleItems()
		if (start < 0 || end > visible.length || start > end) {
			throw new Error(`Invalid annotation range [${start}, ${end})`)
		}
		return {
			start: { id: cloneId(visible[start].id), affinity: "before" },
			// The end is the stable position before the item that originally
			// followed the selection. Concurrent text inserted at the range's end
			// sorts before that item and inherits bold; the existing following text
			// remains outside the range.
			end: visible[end]
				? { id: cloneId(visible[end].id), affinity: "before" }
				: { id: "end", affinity: "before" },
		}
	}
}
