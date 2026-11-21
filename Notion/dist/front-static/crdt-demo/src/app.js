import { createInitialTransactions } from "./crdt/document.js"
import { displayId, END, idKey, START } from "./crdt/ids.js"
import { Replica, transactionSummary } from "./crdt/replica.js"
import { printableSearchLabel } from "./crdt/search-labels.js"
import { iterateTextSliceTree, sliceItemBounds } from "./crdt/text-slice-tree.js"
import { createVisualizationModel } from "./visualization-model.js"

const SVG_NS = "http://www.w3.org/2000/svg"
const START_X = 12
const FIRST_ITEM_X = 36
const ITEM_SPACING = 24
const ITEM_HALF_WIDTH = 8
const IS_EMBEDDED = new URLSearchParams(window.location.search).get("embed") === "1"
const PEERS = [
	{ id: "E", name: "Emma", color: "#337ea9" },
	{ id: "C", name: "Charlie", color: "#cb912f" },
]

if (IS_EMBEDDED) document.documentElement.dataset.embed = "true"

function pointLength(value) {
	return [...value].length
}

function textOffset(root, node, offset) {
	const range = document.createRange()
	range.selectNodeContents(root)
	try {
		range.setEnd(node, offset)
	} catch {
		return 0
	}
	return pointLength(range.toString())
}

function selectionInEditor(editor) {
	const selection = window.getSelection()
	if (!selection || selection.rangeCount === 0) return { start: 0, end: 0 }
	const range = selection.getRangeAt(0)
	if (!editor.contains(range.startContainer) || !editor.contains(range.endContainer)) {
		return { start: 0, end: 0 }
	}
	return {
		start: textOffset(editor, range.startContainer, range.startOffset),
		end: textOffset(editor, range.endContainer, range.endOffset),
	}
}

function setSelection(editor, start, end = start) {
	const range = document.createRange()
	const selection = window.getSelection()
	const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
	let cursor = 0
	let startPoint
	let endPoint
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		const length = pointLength(node.data)
		if (!startPoint && start <= cursor + length) {
			startPoint = { node, offset: [...node.data].slice(0, start - cursor).join("").length }
		}
		if (!endPoint && end <= cursor + length) {
			endPoint = { node, offset: [...node.data].slice(0, end - cursor).join("").length }
		}
		cursor += length
	}
	if (!startPoint || !endPoint) {
		startPoint = endPoint = { node: editor, offset: editor.childNodes.length }
	}
	range.setStart(startPoint.node, startPoint.offset)
	range.setEnd(endPoint.node, endPoint.offset)
	selection.removeAllRanges()
	selection.addRange(range)
}

class InMemoryNetwork {
	constructor(onChange) {
		this.onChange = onChange
		this.paused = false
		this.queue = []
		this.randomState = 0x51a7e
		this.peers = []
		this.timer = window.setInterval(() => this.#tick(), 35)
	}

	reset(peers) {
		this.peers = peers
		this.queue = []
		this.paused = false
		this.randomState = 0x51a7e
	}

	#random() {
		this.randomState = (this.randomState * 1664525 + 1013904223) >>> 0
		return this.randomState / 2 ** 32
	}

	broadcast(from, transaction) {
		const now = performance.now()
		for (const peer of this.peers) {
			if (peer === from) continue
			const delay = 260 + this.#random() * 740
			this.queue.push({ from, to: peer, transaction, dueAt: now + delay, remaining: delay })
		}
		this.onChange()
	}

	setPaused(paused) {
		if (this.paused === paused) return
		const now = performance.now()
		if (paused) {
			for (const packet of this.queue) packet.remaining = Math.max(0, packet.dueAt - now)
		} else {
			for (const packet of this.queue) packet.dueAt = now + packet.remaining
		}
		this.paused = paused
		this.onChange()
	}

	#tick() {
		if (this.paused) return
		const now = performance.now()
		const ready = this.queue.filter(packet => packet.dueAt <= now)
		if (ready.length === 0) return
		this.queue = this.queue.filter(packet => packet.dueAt > now)
		for (const packet of ready) packet.to.receive(packet.transaction)
		this.onChange()
	}
}

const peerGrid = document.querySelector("#peer-grid")
const peerTemplate = document.querySelector("#peer-template")
const networkToggle = document.querySelector("#network-toggle")
const networkLabel = networkToggle.querySelector(".network-label")
const networkStatus = document.querySelector("#network-status")
const resetButton = document.querySelector("#reset")
const cards = new Map()
const rememberedSelections = new Map()
const network = new InMemoryNetwork(render)
let replicas = []
let pendingFocus

function reset(text = "Build things") {
	replicas = PEERS.map(peer => new Replica(peer.id, peer.name, createInitialTransactions(text)))
	network.reset(replicas)
	rememberedSelections.clear()
	pendingFocus = undefined
	if (cards.size === 0) createPeerCards()
	render()
}

function initializePeerText() {
	reset("Build things")
	network.setPaused(true)
	publish(replicas[0], replicas[0].insertText("block-A", 6, "cool "))
	publish(replicas[1], replicas[1].insertText("block-A", 12, " quickly"))
}

function createPeerCards() {
	PEERS.forEach((peer, index) => {
		const fragment = peerTemplate.content.cloneNode(true)
		const card = fragment.querySelector(".peer")
		card.style.setProperty("--peer-color", peer.color)
		card.querySelector(".peer-name").textContent = `${peer.name} (${peer.id})`
		const boldButton = card.querySelector(".bold-button")
		boldButton.addEventListener("mousedown", event => event.preventDefault())
		boldButton.addEventListener("click", () => {
			const remembered = rememberedSelections.get(peer.id)
			if (!remembered) return
			publish(
				replicas[index],
				replicas[index].toggleBold(remembered.blockId, remembered.start, remembered.end),
				{ peerId: peer.id, ...remembered },
			)
		})
		peerGrid.append(fragment)
		cards.set(peer.id, card)
	})
}

function currentFocus() {
	const editor = document.activeElement?.closest?.(".block-editor")
	if (!editor) return undefined
	return {
		peerId: editor.closest(".peer").dataset.peerId,
		blockId: editor.dataset.blockId,
		...selectionInEditor(editor),
	}
}

function publish(replica, transaction, focus) {
	if (!transaction) return
	if (focus) pendingFocus = focus
	network.broadcast(replica, transaction)
}

function handleBeforeInput(event, peer, replica, blockId) {
	const editor = event.currentTarget
	const selection = selectionInEditor(editor)
	const deleteSelection = () => {
		if (selection.start === selection.end) return false
		publish(replica, replica.deleteText(blockId, selection.start, selection.end), {
			peerId: peer.id,
			blockId,
			start: selection.start,
			end: selection.start,
		})
		return true
	}

	if (["insertParagraph", "insertLineBreak"].includes(event.inputType)) {
		event.preventDefault()
		deleteSelection()
		const result = replica.splitBlock(blockId, selection.start)
		publish(replica, result.transaction, {
			peerId: peer.id,
			blockId: result.newBlockId,
			start: 0,
			end: 0,
		})
		return
	}

	if (["insertText", "insertCompositionText", "insertReplacementText"].includes(event.inputType)) {
		event.preventDefault()
		deleteSelection()
		if (event.data) {
			const next = selection.start + pointLength(event.data)
			publish(replica, replica.insertText(blockId, selection.start, event.data), {
				peerId: peer.id,
				blockId,
				start: next,
				end: next,
			})
		}
		return
	}

	if (event.inputType === "deleteContentBackward") {
		event.preventDefault()
		if (deleteSelection()) return
		if (selection.start > 0) {
			publish(replica, replica.deleteText(blockId, selection.start - 1, selection.start), {
				peerId: peer.id,
				blockId,
				start: selection.start - 1,
				end: selection.start - 1,
			})
		} else {
			const result = replica.mergeBlock(blockId)
			if (result) {
				publish(replica, result.transaction, {
					peerId: peer.id,
					blockId: result.targetBlockId,
					start: result.targetIndex,
					end: result.targetIndex,
				})
			}
		}
		return
	}

	if (event.inputType === "deleteContentForward") {
		event.preventDefault()
		if (deleteSelection()) return
		publish(replica, replica.deleteText(blockId, selection.start, selection.start + 1), {
			peerId: peer.id,
			blockId,
			start: selection.start,
			end: selection.start,
		})
	}
}

function handleKeyDown(event, peer, replica, blockId) {
	const editor = event.currentTarget
	const selection = selectionInEditor(editor)
	if (event.key === "Enter") {
		event.preventDefault()
		if (selection.start !== selection.end) {
			publish(replica, replica.deleteText(blockId, selection.start, selection.end), {
				peerId: peer.id,
				blockId,
				start: selection.start,
				end: selection.start,
			})
		}
		const result = replica.splitBlock(blockId, selection.start)
		publish(replica, result.transaction, {
			peerId: peer.id,
			blockId: result.newBlockId,
			start: 0,
			end: 0,
		})
		return
	}
	if (event.key === "Backspace" && selection.start === 0 && selection.end === 0) {
		event.preventDefault()
		const result = replica.mergeBlock(blockId)
		if (result) {
			publish(replica, result.transaction, {
				peerId: peer.id,
				blockId: result.targetBlockId,
				start: result.targetIndex,
				end: result.targetIndex,
			})
		}
		return
	}
	if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
		event.preventDefault()
		publish(replica, replica.toggleBold(blockId, selection.start, selection.end), {
			peerId: peer.id,
			blockId,
			...selection,
		})
	}
}

function renderEditor(editor, tokens) {
	editor.replaceChildren()
	if (tokens.length === 0) editor.append(document.createTextNode(""))
	for (const token of tokens) {
		const node = token.bold ? document.createElement("strong") : document.createElement("span")
		node.textContent = token.text
		editor.append(node)
	}
}

function renderBlocks(container, peer, replica, state, visualization) {
	container.replaceChildren()
	const blocks = state.aliveBlocks()
	for (const block of blocks) {
		const row = document.createElement("div")
		row.className = "block-row"
		const handle = document.createElement("span")
		handle.className = "block-handle"
		handle.textContent = `Block ${visualization.blockIds.get(block.id)}`
		const editor = document.createElement("div")
		editor.className = "block-editor"
		editor.contentEditable = "true"
		editor.spellcheck = false
		editor.dataset.blockId = block.id
		editor.setAttribute("role", "textbox")
		editor.setAttribute("aria-label", `${peer.name} text block`)
		renderEditor(editor, state.blockTokens(block.id))
		editor.addEventListener("beforeinput", event => handleBeforeInput(event, peer, replica, block.id))
		editor.addEventListener("keydown", event => handleKeyDown(event, peer, replica, block.id))
		editor.addEventListener("paste", event => {
			event.preventDefault()
			const selection = selectionInEditor(editor)
			const text = event.clipboardData.getData("text/plain").replaceAll(/\r?\n/g, " ")
			if (selection.start !== selection.end) {
				publish(replica, replica.deleteText(block.id, selection.start, selection.end), {
					peerId: peer.id,
					blockId: block.id,
					start: selection.start,
					end: selection.start,
				})
			}
			const next = selection.start + pointLength(text)
			publish(replica, replica.insertText(block.id, selection.start, text), {
				peerId: peer.id,
				blockId: block.id,
				start: next,
				end: next,
			})
		})
		editor.addEventListener("mouseup", () => rememberSelection(peer.id, editor))
		editor.addEventListener("keyup", () => rememberSelection(peer.id, editor))
		editor.addEventListener("blur", event => {
			const toolbar = cards.get(peer.id).querySelector(".format-toolbar")
			if (!toolbar.contains(event.relatedTarget)) toolbar.hidden = true
		})
		row.append(handle, editor)
		container.append(row)
	}
	const addBlockButton = document.createElement("button")
	addBlockButton.className = "add-block-button"
	addBlockButton.type = "button"
	addBlockButton.textContent = "+ block"
	addBlockButton.setAttribute("aria-label", `Create a blank block for ${peer.name}`)
	addBlockButton.addEventListener("click", () => {
		const result = replica.createBlock(blocks.at(-1)?.id)
		publish(replica, result.transaction, {
			peerId: peer.id,
			blockId: result.newBlockId,
			start: 0,
			end: 0,
		})
	})
	container.append(addBlockButton)
}

function appendRichText(container, tokens) {
	if (tokens.length === 0) {
		const empty = document.createElement("span")
		empty.className = "empty-text"
		empty.textContent = "∅"
		container.append(empty)
		return
	}
	for (const token of tokens) {
		const node = token.bold ? document.createElement("strong") : document.createElement("span")
		node.textContent = token.text
		container.append(node)
	}
}

function renderStructure(container, visualization) {
	container.replaceChildren()
	const trees = document.createElement("div")
	trees.className = "slice-trees"
	for (const block of visualization.blockTrees) {
		const tree = document.createElement("div")
		tree.className = "slice-tree"
		const header = document.createElement("div")
		header.className = "block-tree-header"
		const blockKind = document.createElement("span")
		blockKind.className = "structure-kind"
		blockKind.textContent = "Block"
		const blockId = document.createElement("span")
		blockId.className = "model-id block-id"
		blockId.textContent = block.id
		header.append(blockKind, blockId)
		tree.append(header)
		for (const slice of block.slices) {
			const node = document.createElement("div")
			node.className = "slice-node"
			node.style.setProperty("--slice-depth", slice.depth)
			const edge = document.createElement("span")
			edge.className = "slice-edge"
			edge.textContent = "└"
			const sliceKind = document.createElement("span")
			sliceKind.className = "structure-kind"
			sliceKind.textContent = "Slice"
			const instanceSeparator = document.createElement("span")
			instanceSeparator.className = "metadata-separator"
			instanceSeparator.textContent = "·"
			const instanceId = document.createElement("span")
			instanceId.className = "slice-instance-id"
			instanceId.textContent = slice.instanceId
			const searchSeparator = document.createElement("span")
			searchSeparator.className = "metadata-separator"
			searchSeparator.textContent = "·"
			const searchKind = document.createElement("span")
			searchKind.className = "structure-kind search-kind"
			searchKind.textContent = "Search label:"
			const label = document.createElement("span")
			label.className = "search-label"
			label.textContent = slice.searchLabel
			const textSeparator = document.createElement("span")
			textSeparator.className = "metadata-separator"
			textSeparator.textContent = "·"
			const text = document.createElement("span")
			text.className = "slice-text"
			appendRichText(text, slice.tokens)
			node.append(
				edge,
				sliceKind,
				instanceSeparator,
				instanceId,
				searchSeparator,
				searchKind,
				label,
				textSeparator,
				text,
			)
			tree.append(node)
		}
		trees.append(tree)
	}
	container.append(trees)
}

function positionFormattingToolbar(peerId, editor, selection) {
	const toolbar = cards.get(peerId).querySelector(".format-toolbar")
	if (selection.start === selection.end) {
		toolbar.hidden = true
		return
	}
	const browserSelection = window.getSelection()
	if (!browserSelection || browserSelection.rangeCount === 0) {
		toolbar.hidden = true
		return
	}
	const range = browserSelection.getRangeAt(0)
	if (!editor.contains(range.startContainer) || !editor.contains(range.endContainer)) {
		toolbar.hidden = true
		return
	}
	const selectionRect = range.getBoundingClientRect()
	const cardRect = cards.get(peerId).getBoundingClientRect()
	toolbar.hidden = false
	const halfWidth = toolbar.offsetWidth / 2
	const preferredLeft = selectionRect.left - cardRect.left + selectionRect.width / 2
	toolbar.style.left = `${Math.max(halfWidth + 8, Math.min(cardRect.width - halfWidth - 8, preferredLeft))}px`
	toolbar.style.top = `${selectionRect.top - cardRect.top - 7}px`
}

function rememberSelection(peerId, editor) {
	const selection = selectionInEditor(editor)
	rememberedSelections.set(peerId, { blockId: editor.dataset.blockId, ...selection })
	const replica = replicas.find(candidate => candidate.sessionId === peerId)
	if (!replica) return
	const selected = replica.document().blockCharacters(editor.dataset.blockId).slice(selection.start, selection.end)
	cards.get(peerId).querySelector(".bold-button").setAttribute(
		"aria-pressed",
		String(selected.length > 0 && selected.every(character => character.bold)),
	)
	positionFormattingToolbar(peerId, editor, selection)
}

function svgElement(name, attributes = {}) {
	const element = document.createElementNS(SVG_NS, name)
	for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value))
	return element
}

function itemX(index) {
	return FIRST_ITEM_X + index * ITEM_SPACING
}

function compactDisplayId(id) {
	if (typeof id === "string") return id
	return `${id.sessionId}@${id.counter}`
}

function boundaryX(index, itemCount) {
	if (itemCount === 0) return FIRST_ITEM_X
	if (index <= 0) return itemX(0) - ITEM_HALF_WIDTH
	if (index >= itemCount) return itemX(itemCount - 1) + ITEM_HALF_WIDTH
	return (itemX(index - 1) + itemX(index)) / 2
}

function anchorIndex(anchor, traversal) {
	if (anchor.id === START) return 0
	if (anchor.id === END) return traversal.items.length
	const key = idKey(anchor.id)
	return (anchor.anchor ?? anchor.affinity) === "before"
		? traversal.entryById.get(key)
		: traversal.exitById.get(key)
}

function instanceSliceTracks(state, instance, visualization) {
	const tracks = []
	for (const block of state.aliveBlocks()) {
		for (const node of iterateTextSliceTree(block.title)) {
			if (node.textSlice.textInstanceId !== instance.id) continue
			const { start, end } = sliceItemBounds(node.textSlice, instance.rga)
			tracks.push({
				start,
				end,
				label: `${visualization.instanceIds.get(instance.id)} · ${printableSearchLabel(node.textSlice.searchLabel)} · ${visualization.blockIds.get(block.id)}`,
			})
		}
	}
	return tracks
}

function appendRangeTrack(svg, { start, end, label, className }, row, itemCount) {
	const y = 111 + row * 17
	const startX = boundaryX(start, itemCount)
	const endX = Math.max(startX + 8, boundaryX(end, itemCount))
	const line = svgElement("path", {
		d: `M ${startX} ${y} L ${startX} ${y + 4} L ${endX} ${y + 4} L ${endX} ${y}`,
		class: className,
	})
	const text = svgElement("text", { x: startX + 2, y: y - 2, class: "range-label" })
	text.textContent = label
	svg.append(line, text)
}

function renderInstancePointers(instance, state, peer, visualization) {
	const wrapper = document.createElement("div")
	wrapper.className = "instance-pointers"
	const instanceId = visualization.instanceIds.get(instance.id)
	const instanceLabel = document.createElement("span")
	instanceLabel.className = "model-id pointer-instance-id"
	instanceLabel.textContent = `Text instance ${instanceId}`
	wrapper.append(instanceLabel)
	const traversal = instance.rga.traversal()
	const items = traversal.items
	const richItems = new Map(instance.richCharacters().map(character => [idKey(character.id), character]))
	const sliceTracks = instanceSliceTracks(state, instance, visualization)
	const boldTracks = instance.annotationOperations.flatMap(operation => {
		const start = anchorIndex(operation.start, traversal)
		const end = anchorIndex(operation.end, traversal)
		return start === undefined || end === undefined
			? []
			: [{
				start,
				end,
				label: `${operation.value ? "bold" : "unbold"} · ${displayId(operation.id)}`,
				className: operation.value ? "bold-range" : "bold-range removed-bold-range",
			}]
	})
	const trackCount = sliceTracks.length + boldTracks.length
	const width = Math.max(240, 52 + items.length * ITEM_SPACING)
	const height = 121 + Math.max(0, trackCount - 1) * 17
	const svg = svgElement("svg", { viewBox: `0 0 ${width} ${height}`, width, height, role: "img" })
	const title = svgElement("title")
	title.textContent = `RGA pointers for ${instance.id}`
	svg.append(title)
	const defs = svgElement("defs")
	const markerId = `arrow-${peer.id}-${instance.id.replaceAll(/[^a-zA-Z0-9]/g, "-")}`
	for (const className of ["sentinel-pointer", "pointer-E", "pointer-C"]) {
		const marker = svgElement("marker", {
			id: `${markerId}-${className}`,
			viewBox: "0 0 10 10",
			refX: 8,
			refY: 5,
			markerWidth: 4,
			markerHeight: 4,
			orient: "auto-start-reverse",
		})
		marker.append(svgElement("path", { d: "M 0 0 L 10 5 L 0 10 z", class: `pointer-arrow-head ${className}` }))
		defs.append(marker)
	}
	svg.append(defs)

	const positions = new Map([["start", START_X]])
	items.forEach((item, index) => positions.set(idKey(item.id), itemX(index)))
	const endX = itemX(items.length)
	const endPointer = svgElement("path", {
		d: `M ${endX} 50 C ${endX} 8, ${START_X} 8, ${START_X} 50`,
		class: "pointer sentinel-pointer",
		"marker-end": `url(#${markerId}-sentinel-pointer)`,
	})
	svg.append(endPointer)
	for (const item of items) {
		const from = positions.get(idKey(item.id))
		const to = positions.get(idKey(item.originId))
		const height = Math.min(32, 10 + Math.abs(to - from) * 0.08)
		const path = svgElement("path", {
			d: `M ${from} 50 C ${from} ${50 - height}, ${to} ${50 - height}, ${to} 50`,
			class: `pointer pointer-${item.id.sessionId}`,
			"marker-end": `url(#${markerId}-pointer-${item.id.sessionId})`,
		})
		svg.append(path)
	}

	const startRect = svgElement("rect", {
		x: START_X - ITEM_HALF_WIDTH,
		y: 50,
		width: ITEM_HALF_WIDTH * 2,
		height: 24,
		rx: 2,
		class: "sentinel-item",
	})
	const endRect = svgElement("rect", {
		x: endX - ITEM_HALF_WIDTH,
		y: 50,
		width: ITEM_HALF_WIDTH * 2,
		height: 24,
		rx: 2,
		class: "sentinel-item",
	})
	const startLabel = svgElement("text", { x: START_X, y: 87, class: "sentinel" })
	startLabel.textContent = "start"
	const endLabel = svgElement("text", { x: endX, y: 87, class: "sentinel" })
	endLabel.textContent = "end"
	svg.append(startRect, endRect, startLabel, endLabel)
	items.forEach((item, index) => {
		const x = itemX(index)
		const isBold = item.kind === "text" && richItems.get(idKey(item.id))?.bold
		const rect = svgElement("rect", {
			x: x - 8,
			y: 50,
			width: 16,
			height: 24,
			rx: 2,
			class: `${item.kind === "split" ? "split-item" : "text-item"}${item.deleted ? " deleted-item" : ""}${isBold ? " bold-item" : ""}`,
		})
		const value = svgElement("text", { x, y: 67, class: `item-character${isBold ? " bold-character" : ""}` })
		value.textContent = item.kind === "split" ? "↵" : item.content === " " ? "" : item.content
		const label = svgElement("text", { x, y: 87, class: "item-label" })
		label.textContent = compactDisplayId(item.id)
		svg.append(rect, value, label)
	})
	sliceTracks.forEach((track, index) => {
		appendRangeTrack(svg, { ...track, className: "slice-range" }, index, items.length)
	})
	boldTracks.forEach((track, index) => {
		appendRangeTrack(svg, track, sliceTracks.length + index, items.length)
	})
	wrapper.append(svg)
	return wrapper
}

function renderPointers(container, state, peer, visualization) {
	container.replaceChildren()
	for (const instance of state.instances.values()) {
		if (!instance.rga.orderedItems().some(item => item.kind === "text")) continue
		container.append(renderInstancePointers(instance, state, peer, visualization))
	}
}

function renderOperations(container, transactions, visualization) {
	container.replaceChildren()
	for (const transaction of transactions) {
		const operation = document.createElement("div")
		operation.className = "operation"
		operation.textContent = `${displayId(transaction.id)} · ${transactionSummary(transaction, {
			blockId: id => visualization.blockIds.get(id) ?? id,
			textInstanceId: id => visualization.instanceIds.get(id) ?? id,
		})}`
		container.append(operation)
	}
	container.scrollTop = container.scrollHeight
}

function render() {
	if (cards.size === 0) return
	const preserved = pendingFocus ?? currentFocus()
	pendingFocus = undefined
	networkToggle.dataset.state = network.paused ? "paused" : "playing"
	networkLabel.textContent = network.paused ? "offline" : "syncing"
	const networkAction = network.paused ? "Resume syncing" : "Go offline"
	networkToggle.setAttribute("aria-label", networkAction)
	networkToggle.setAttribute("aria-pressed", String(!network.paused))
	networkToggle.title = networkAction
	networkStatus.textContent = network.paused
		? `${network.queue.length} queued`
		: network.queue.length > 0
			? `${network.queue.length} in flight`
			: "synced"

	replicas.forEach((replica, index) => {
		const peer = PEERS[index]
		const card = cards.get(peer.id)
		card.dataset.peerId = peer.id
		const state = replica.document()
		const visualization = createVisualizationModel(state)
		card.querySelector(".clock-value").textContent = `${replica.clock.counter}`
		renderBlocks(card.querySelector(".blocks"), peer, replica, state, visualization)
		renderStructure(card.querySelector(".structure"), visualization)
		renderPointers(card.querySelector(".pointers"), state, peer, visualization)
		renderOperations(card.querySelector(".operation-list"), state.transactions, visualization)
	})

	if (preserved) {
		const card = cards.get(preserved.peerId)
		const editor = card?.querySelector(`[data-block-id="${CSS.escape(preserved.blockId)}"]`)
		if (editor) {
			editor.focus({ preventScroll: true })
			const length = pointLength(editor.textContent)
			setSelection(editor, Math.min(preserved.start, length), Math.min(preserved.end, length))
			rememberSelection(preserved.peerId, editor)
		}
	}
}

networkToggle.addEventListener("click", () => network.setPaused(!network.paused))
document.querySelector("#initialize-text").addEventListener("click", initializePeerText)
resetButton.addEventListener("click", () => reset())

reset()

if (IS_EMBEDDED && window.parent !== window) {
	const content = document.querySelector("main")
	let resizeFrame
	const reportHeight = () => {
		window.cancelAnimationFrame(resizeFrame)
		resizeFrame = window.requestAnimationFrame(() => {
			window.parent.postMessage(
				{ source: "notion-crdt-demo", type: "resize", height: Math.ceil(content.getBoundingClientRect().height) },
				"*",
			)
		})
	}
	new ResizeObserver(reportHeight).observe(content)
	window.addEventListener("load", reportHeight)
}
