export const START = "start"
export const END = "end"

export function opId(sessionId, counter) {
	if (!sessionId || !Number.isSafeInteger(counter) || counter < 1) {
		throw new Error("An operation ID needs a session and a positive integer counter")
	}
	return { sessionId, counter }
}

export function compareOpIds(a, b) {
	if (a.counter !== b.counter) {
		return a.counter < b.counter ? -1 : 1
	}
	if (a.sessionId === b.sessionId) {
		return 0
	}
	return a.sessionId < b.sessionId ? -1 : 1
}

export function compareItemIds(a, b) {
	if (a === START) return b === START ? 0 : -1
	if (a === END) return b === START ? 1 : b === END ? 0 : -1
	if (b === START || b === END) return 1
	return compareOpIds(a, b)
}

export function idKey(id) {
	return typeof id === "string" ? id : `${id.sessionId}:${id.counter}`
}

export function sameId(a, b) {
	return idKey(a) === idKey(b)
}

export function nextId(id, offset = 1) {
	return opId(id.sessionId, id.counter + offset)
}

export function expandIdRanges(idRanges) {
	return idRanges.flatMap(([firstId, length]) =>
		Array.from({ length }, (_, index) => nextId(firstId, index)),
	)
}

export function compressIdsToRanges(ids) {
	const sorted = [...ids].sort(compareOpIds)
	const ranges = []
	for (const id of sorted) {
		const previous = ranges.at(-1)
		if (
			previous &&
			previous[0].sessionId === id.sessionId &&
			previous[0].counter + previous[1] === id.counter
		) {
			previous[1] += 1
		} else {
			ranges.push([{ ...id }, 1])
		}
	}
	return ranges
}

export function displayId(id) {
	if (typeof id === "string") return id
	return `${id.sessionId}@${id.counter}`
}

export class LamportClock {
	constructor(sessionId) {
		this.sessionId = sessionId
		this.counter = 0
	}

	observe(id, length = 1) {
		this.counter = Math.max(this.counter, id.counter + length - 1)
	}

	reserve(length = 1) {
		if (!Number.isSafeInteger(length) || length < 1) {
			throw new Error("Clock reservations must contain at least one tick")
		}
		const first = opId(this.sessionId, this.counter + 1)
		this.counter += length
		return first
	}
}
