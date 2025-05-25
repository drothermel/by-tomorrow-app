import type {
	AnnText,
	BlockType,
	FlowType,
	ImageLayoutType,
	Path,
	MarkdownSetting,
} from '$lib/svedit/types'
import { marked } from 'marked'
import type SveditSession from '$lib/svedit/SveditSession.svelte'

/**
 * Represents a single editable block within the editor. Blocks form a tree
 * structure with a root node having no parent. Each block keeps track of its
 * children, display attributes and the editing session it belongs to.
 */
export default class BlockData {
	// Definition
	type: BlockType = $state('unknown')
	uuid: string

	// Rendering
	editable: boolean = $state(true)
	flow: FlowType = $state('inline')
	extra_css_class: string = $state('') // easy to update
	editable_css_class: string = $derived(
		this.editable ? 'bg-white opacity-100' : 'bg-gray-50 opacity-90'
	)
	css_class: string = $derived(
		`${this.editable_css_class} ${this.extra_css_class}`
	)

	markdown: string = $state('')
	markdown_setting: MarkdownSetting = $state('both')

	// Content
	title?: AnnText = $state()
	text?: AnnText = $state()
	image?: string = $state()
	image_layout: ImageLayoutType = $state('right')
	children: BlockData[] = $state([])

	// Default block data starts as root node with
	// null parent
	parent: BlockData | null = $state(null)
	session: SveditSession | null = $state(null)

	/**
	 * Create a new block instance. If markdown content is provided the block
	 * defaults to preview mode.
	 */
	constructor({
		type,
		markdown,
		parent,
		editable,
		title,
		text,
		image,
		layout,
		children,
		extra_css_class,
	}: {
		type: BlockType
		markdown?: string
		parent?: BlockData | null
		editable?: boolean
		title?: AnnText
		text?: AnnText
		image?: string
		layout?: ImageLayoutType
		children?: any[]
		extra_css_class?: string
	}) {
		this.type = type
		this.uuid = crypto.randomUUID()
		if (markdown !== undefined) {
			this.markdown = markdown
			this.markdown_setting = 'preview'
		}
		if (parent !== undefined) {
			this.parent = parent
		}
		if (editable !== undefined) {
			this.editable = editable
		}
		if (title !== undefined) {
			this.title = title
		}
		if (text !== undefined) {
			this.text = text
		}
		if (children !== undefined) {
			this.children = children
		}
		if (image !== undefined) {
			this.image = image
		}
		if (layout !== undefined) {
			this.image_layout = layout
		}
		if (extra_css_class !== undefined) {
			this.extra_css_class = extra_css_class
		}
	}

	/**
	 * Human readable name used primarily for debugging. Combines the block
	 * type with its UUID.
	 */
	get name(): string {
		return `${this.type}-${this.uuid}`
	}

	/**
	 * Returns a string describing the block and its parent. Useful when
	 * printing to logs.
	 */
	get repStr(): string {
		return `${this.editable ? 'editable' : 'fixed'} ${this.type} ${this.name} Parent: ${this.parent?.name}`
	}

	/** Render the markdown field into HTML. */
	get renderedMarkdown(): string {
		return marked.parse(this.markdown) as string
	}

	/**
	 * Change the block's type and record the update in the session history.
	 * Switching to markdown automatically enables the editor preview.
	 */
	setType(newType: BlockType): void {
		this.session?.takeStateSnapshot()
		this.type = newType
		if (this.type == 'markdown') {
			this.markdown_setting = 'both'
		}
		this.session?.finalizePendingHistory()
	}

	/**
	 * Compute the block's path from the root by walking up its parents. The
	 * root block returns an empty path.
	 */
	get path(): Path {
		// The root node has no path, its the parent
		if (this.parent === null) {
			return []
		}

		// Build the path
		let path: Path = []
		let currentBlock: BlockData | null = this
		while (currentBlock !== null) {
			let parent: BlockData | null = currentBlock.parent
			if (parent === null) {
				break
			}
			let index = parent.children.indexOf(currentBlock)
			path.push(index)
			currentBlock = parent
		}
		return path.reverse()
	}

	/**
	 * Recursively assign the given session to this block and all children.
	 */
	setSessionOnChildren(mySession: SveditSession): void {
		this.session = mySession
		for (const child of this.children) {
			child.setSessionOnChildren(mySession)
		}
	}

	/**
	 * Set the parent reference on this block and propagate it to all
	 * descendant blocks.
	 */
	setParentOnChildren(myParent: BlockData | null): void {
		this.parent = myParent
		for (const child of this.children) {
			child.setParentOnChildren(this)
		}
	}

	/** Append a new empty child block at the end of the children array. */
	addChildBlock(): void {
		this.addChildBlockAtIndex(this.children.length)
	}

	/**
	 * Remove a child by UUID and record the modification in the session
	 * history.
	 */
	removeChildBlock(uuid: string): void {
		this.session?.takeStateSnapshot()
		this.children = this.children.filter((child) => child.uuid !== uuid)
		this.session?.finalizePendingHistory()
	}

	/**
	 * Insert a new empty block at the specified index. A RangeError is thrown
	 * if the index is outside the children array bounds.
	 */
	addChildBlockAtIndex(index: number): void {
		if (index < 0 || index > this.children.length) {
			throw new RangeError(
				`Index out of range: ${index} vs ${this.children.length}`
			)
		}

		// NOTE: this has to be an assignment to trigger re-rendering
		this.session?.takeStateSnapshot()
		this.children = [
			...this.children.slice(0, index),
			new BlockData({ type: 'unknown', parent: this }),
			...this.children.slice(index),
		]
		this.session?.finalizePendingHistory()
	}

	/** Remove this block from its parent. */
	removeSelfFromParent(): void {
		if (this.parent === null) {
			throw TypeError('Expected parent to be non-null')
		}
		if (!this.parent.children.includes(this)) {
			throw TypeError('Expected parent to have child')
		}

		// Remove self from parent's children array
		this.parent.removeChildBlock(this.uuid)
	}

	/** Insert a new block before this one in the parent's children array. */
	addBlockAbove(): void {
		// Cannot add block above root node
		if (this.parent === null) {
			throw TypeError('Expected parent to be non-null')
		}
		if (!this.parent.children.includes(this)) {
			throw TypeError('Expected parent to have child')
		}

		// Insert new block at current index
		return this.parent.addChildBlockAtIndex(this.parent.children.indexOf(this))
	}

	/** Insert a new block after this one in the parent's children array. */
	addBlockBelow(): void {
		// Cannot add block below root node
		if (this.parent === null) {
			throw TypeError('Expected parent to be non-null')
		}
		if (!this.parent.children.includes(this)) {
			throw TypeError('Expected parent to have child')
		}
		return this.parent.addChildBlockAtIndex(
			this.parent.children.indexOf(this) + 1
		)
	}
}
