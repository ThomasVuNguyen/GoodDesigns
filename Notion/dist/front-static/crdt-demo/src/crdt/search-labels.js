const ENCODE_MAX = 62
const PRINTABLE_START = 61
const UPPER_BOUND = String.fromCharCode(PRINTABLE_START + ENCODE_MAX + 1)

export const INITIAL_SEARCH_LABEL = ""

function encode(value) {
	if (value < 0 || value > ENCODE_MAX || value === 31) {
		throw new Error(`Invalid search-label value: ${value}`)
	}
	return String.fromCharCode(PRINTABLE_START + value)
}

function decode(character) {
	if (character.length !== 1) throw new Error("Expected one label character")
	const value = character.charCodeAt(0) - PRINTABLE_START
	if (value < 0 || value > ENCODE_MAX || value === 31) {
		throw new Error(`Invalid search-label character: ${character}`)
	}
	return value
}

function trailingOnes(input) {
	let value = input
	let count = 0
	while (value % 2 === 1) {
		count += 1
		value >>= 1
	}
	return count
}

export function splitSearchLabel(label) {
	if (label.length > 0) {
		const node = decode(label.at(-1))
		if (node % 2 !== 0) {
			const prefix = label.slice(0, -1)
			const delta = 1 << (trailingOnes(node) - 1)
			return [prefix + encode(node - delta), prefix + encode(node + delta)]
		}
	}
	return [label + encode(15), label + encode(47)]
}

export function searchBounds(label) {
	if (label === INITIAL_SEARCH_LABEL) return ["", UPPER_BOUND]
	const prefix = label.slice(0, -1)
	const node = decode(label.at(-1))
	const delta = (1 << trailingOnes(node)) - 1
	return [prefix + encode(node - delta), prefix + encode(node + delta) + UPPER_BOUND]
}

export function isDescendantLabel(child, parent) {
	const [lower, upper] = searchBounds(parent)
	return lower <= child && child <= upper
}

export function printableSearchLabel(label) {
	if (label === INITIAL_SEARCH_LABEL) return "root"
	return [...label]
		.map(character => {
			const value = decode(character)
			const lowerBit = trailingOnes(value)
			let result = ""
			for (let bit = 5; bit > lowerBit; bit -= 1) {
				result += (value & (1 << bit)) === 0 ? "L" : "R"
			}
			return result
		})
		.join("")
}
