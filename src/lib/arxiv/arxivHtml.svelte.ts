import * as cheerio from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import { Tag } from 'lucide-svelte'
import { parse } from 'svelte/compiler'

export interface PaperData {
	type: 'paper'
	title: string
	authors: string[]
	abstract: string
	keywords: string[]
	content: Section
	bibliography: BibItem[]
}

export interface BibItem {
	type: 'bib_item'
	id: string
	tagName: string
	classNames: string[]

	bibNum?: number
	bibString?: string
}

export interface CitationElem {
	type: 'citation'
	citeStr: string
	citeNum: number
	citeLink?: string
	citeBibId?: string
}

export interface TextElem {
	type: 'text'
	text: string
}

export interface MathElem {
	type: 'math'
	latex?: string
	html: string
}

export interface SectionLinkElem {
	type: 'sectionLink'
	title?: string
	href: string
	text: string
	sectionNum?: number
}

export interface UnknownElem {
	type: 'unknown'
	html: string
}
export type ContentElem =
	| SectionLinkElem
	| TextElem
	| MathElem
	| CitationElem
	| UnknownElem

export interface Title {
	type: 'title'
	id: string
	tagName: string
	classNames: string[]

	section?: string
	text: string
}

// Sub-Section Types
export interface Paragraph {
	type: 'paragraph'
	id: string
	tagName: string
	classNames: string[]

	title?: Title
	titleStr?: string
	text: string
	html: string
	contents: ContentElem[]
}
export interface Figure {
	type: 'figure'
	id: string
	tagName: string
	classNames: string[]

	title?: Title
	titleStr?: string
	caption?: string
	figName?: string
}

export interface Section {
	type: 'section'
	id: string
	tagName: string
	classNames: string[]

	title?: Title
	titleString: string
	content: SectionContent[]
}

export interface Equation {
	type: 'equation'
	id: string
	tagName: string
	classNames: string[]
	visible: boolean

	title?: Title
	titleStr?: string
	html: string
	latexStrings: string[]
}
export interface UnknownTag {
	type: 'unknown'
	id: string
	tagName: string
	classNames: string[]

	title?: Title
	titleStr?: string
	html?: string
}
type SectionContent = Paragraph | Section | Figure | Equation | UnknownTag

export function sanitizeText(text: string) {
	return text
		.replace(/\u00a0/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

export function getAuthors(ch: CheerioAPI) {
	let authorSelect = ch('.ltx_personname')
	authorSelect.find('math').remove()
	const authorArray = sanitizeText(authorSelect.text()).split(', ') // Split the authors into an array
	return authorArray
}

export function getAbstract(ch: CheerioAPI) {
	return sanitizeText(ch('.ltx_abstract .ltx_p').text())
}

export function getKeywords(ch: CheerioAPI) {
	const keywordsText: string = sanitizeText(
		ch('.ltx_keywords')
			.text()
			.replace(/Index Terms:\s*/, '')
	)
	const keywords = keywordsText.split(',').map((keyword) => keyword.trim())
	return keywords
}

export function parsePaperData(html: string): PaperData {
	const ch = cheerio.load(html)
	parseBibliography(ch)

	const bibliography = parseBibliography(ch)
	const content = parseMainSection(ch)
	return {
		type: 'paper',
		title: sanitizeText(ch('article').children('h1').first().text()),
		authors: getAuthors(ch),
		abstract: getAbstract(ch),
		keywords: getKeywords(ch),
		content,
		bibliography,
	}
}

export function parseBibliography(ch: CheerioAPI): BibItem[] {
	const bib = ch('.ltx_bibitem')
		.map((_, el) => {
			const chel = ch(el)
			const id = chel.attr('id') || 'unknown'
			const tagName = chel.prop('tagName')?.toLowerCase() || 'unknown'
			const classNames = chel.attr('class')?.split(/\s+/) || []

			const bibNum = parseInt(
				chel
					.find('.ltx_tag_bibitem')
					.text()
					.replace(/[\[\]]/g, '')
			)
			const bibString = sanitizeText(chel.find('.ltx_bibblock').text())
			const bibitem: BibItem = {
				type: 'bib_item',
				id,
				tagName,
				classNames,
				bibNum,
				bibString,
			}
			return bibitem
		})
		.get()
	return bib
}

export function parseLink(ch: CheerioAPI, link: Element): SectionLinkElem {
	// @ts-ignore
	const chLink = ch(link)
	const href = chLink.attr('href') || ''
	const text = sanitizeText(chLink.text())
	const title = chLink.attr('title') || ''
	const sectionNum = parseInt(text) || undefined
	return {
		type: 'sectionLink',
		href,
		text,
		title,
		sectionNum,
	}
}

export function parseParagraph(ch: CheerioAPI, p: Element): Paragraph {
	// @ts-ignore
	const chP = ch(p)
	const text = sanitizeText(chP.text())
	const html = chP.html() || ''
	const contentNodes = chP.contents().get()

	let contents: ContentElem[] = []
	contentNodes.map((el) => {
		const chel = ch(el)
		const tagName = chel.prop('tagName')?.toLowerCase() || 'text'

		switch (tagName) {
			case 'text':
			case 'span':
				contents.push({
					type: 'text',
					classNames: chel.attr('class')?.split(/\s+/) || [],
					text: sanitizeText(chel.text()),
				} as TextElem)
				break
			case 'math':
				contents.push({
					type: 'math',
					latex: chel.attr('alttext')?.replace(/%/g, ' ') || '',
					html: ch.html(chel),
				} as MathElem)
				break
			case 'cite':
				// @ts-ignore
				parseCitation(ch, el).map((c) => {
					contents.push(c)
				})
				break
			case 'a':
				// @ts-ignore
				contents.push(parseLink(ch, el))
				break
			case 'em':
				contents.push({
					type: 'text',
					classNames: chel.attr('class')?.split(/\s+/) || [],
					text: sanitizeText(chel.text()),
				} as TextElem)
				break
			default:
				contents.push({
					type: 'unknown',
					html: ch.html(chel),
				} as UnknownElem)
		}
	})

	return {
		type: 'paragraph',
		id: chP.attr('id') || 'unknown',
		tagName: chP.prop('tagName')?.toLowerCase() || 'unknown',
		classNames: chP.attr('class')?.split(/\s+/) || [],
		text,
		html,
		contents,
	}
}

export function parseCitation(
	ch: CheerioAPI,
	citation: Element
): CitationElem[] {
	// @ts-ignore
	const chCite = ch(citation)
		.children('a.ltx_ref')
		.map((_, el) => {
			const chel = ch(el)
			const citeStr = chel.text()
			const citeNum = parseInt(citeStr.replace(/[\[\]]/g, ''))
			const citeLink = chel.attr('href')
			const citeBibId = citeLink?.split('#')[1] || undefined
			const citeData: CitationElem = {
				type: 'citation',
				citeStr,
				citeNum,
				citeLink,
				citeBibId,
			}
			return [citeData]
		})
		.get()
	return chCite
}

export function parseTitle(ch: CheerioAPI, title: Element): Title | undefined {
	// @ts-ignore
	const chTag = ch(title)
	const titleTagName = chTag.prop('tagName')?.toLowerCase() || 'unknown'
	const chSpans = chTag.children('span')

	// Get the title info from the spans
	let id = chTag.attr('id') || 'unknown'
	let titleText = ''
	let titleSection = ''
	let classNames = chTag.attr('class')?.split(/\s+/) || []
	for (const span of chSpans) {
		const chSpan = ch(span)
		if (chSpan.hasClass('ltx_tag')) {
			titleSection = sanitizeText(chSpan.text())
		} else {
			id = chSpan.attr('id') || 'unknown'
			titleText = sanitizeText(chSpan.text())
			classNames = [
				...classNames,
				...(chSpan.attr('class')?.split(/\s+/) || []),
			]
		}
	}
	if (titleText === '') {
		// First check if the title itself has text
		titleText = sanitizeText(chTag.text())
		if (!titleText) {
			return undefined
		}
	}
	if (titleText.includes(titleSection)) {
		titleSection = ''
	}
	return {
		type: 'title',
		id,
		section: titleSection,
		text: titleText,
		tagName: titleTagName,
		classNames,
	}
}

export function parseContainer(
	ch: CheerioAPI,
	container: Element
): SectionContent {
	// @ts-ignore
	const chel = ch(container)
	const id = chel.attr('id') || 'unknown'
	const classNames = chel.attr('class')?.split(/\s+/) || []
	const tagName = chel.prop('tagName')?.toLowerCase() || 'unknown'

	// Attempt to get title
	const titleTags = chel.children('*.ltx_title')
	if (titleTags.length > 1) {
		console.error('Multiple titles in a single section')
	}
	// @ts-ignore
	const title =
		titleTags.length === 0 ? undefined : parseTitle(ch, titleTags.get()[0])

	// Parse Subsections if they exist
	const elements = chel.children('div, section, p, table, figure').get()
	// @ts-ignore
	const content = parseElements(ch, elements)
	if (content.length === 0) {
		throw new Error('No content found in section')
	} else if (content.length === 1) {
		let contentElem = content[0]
		if (title !== undefined) {
			if (contentElem.type === 'paragraph') {
				contentElem.title = title
				contentElem.titleStr = title.text
			} else {
				console.error('Title found but content is not a paragraph')
			}
		}
		return contentElem
	}

	return {
		type: 'section',
		id,
		tagName,
		title,
		titleString: title?.text || '',
		classNames,
		content,
	}
}

export function parseFigure(ch: CheerioAPI, figure: Element): Figure {
	// @ts-ignore
	const chel = ch(figure)
	const id = chel.attr('id') || 'unknown'
	const tagName = chel.prop('tagName')?.toLowerCase() || 'unknown'
	const classNames = chel.attr('class')?.split(/\s+/) || []
	const figCap = chel.find('figcaption')
	const captionText = sanitizeText(ch(figCap).text())
	const figName = figCap.children('span.ltx_tag').first().text()

	return {
		type: 'figure',
		id,
		tagName,
		classNames,
		caption: captionText,
		figName,
	}
}

export function parseEquation(ch: CheerioAPI, equation: Element): Equation {
	// @ts-ignore
	const chel = ch(equation)
	const id = chel.attr('id') || 'unknown'
	const tagName = chel.prop('tagName')?.toLowerCase() || 'unknown'
	const classNames = chel.attr('class')?.split(/\s+/) || []
	const html = chel.html() || ''
	const latexStrings = chel
		.find('math')
		.map((_, el) => {
			return ch(el).attr('alttext')?.replace(/%/g, ' ') || ''
		})
		.get()
	return {
		type: 'equation',
		id,
		tagName,
		classNames,
		visible: true,
		html,
		latexStrings,
	}
}

export function parseTable(ch: CheerioAPI, table: Element): SectionContent {
	// @ts-ignore
	const chel = ch(table)
	if (chel.hasClass('ltx_equation') || chel.hasClass('ltx_equationgroup')) {
		return parseEquation(ch, table)
	} else {
		return parseUnknownTag(ch, table)
	}
}

export function parseUnknownTag(ch: CheerioAPI, element: Element): UnknownTag {
	// @ts-ignore
	const chel = ch(element)
	const id = chel.attr('id') || 'unknown'
	const tagName = chel.prop('tagName')?.toLowerCase() || 'unknown'
	const classNames = chel.attr('class')?.split(/\s+/) || []
	return {
		type: 'unknown',
		id,
		tagName,
		classNames,
		html: chel.html() || '',
	}
}

export function parseElements(
	ch: CheerioAPI,
	elements: Element[]
): SectionContent[] {
	let elementData: SectionContent[] = []
	for (const elem of elements) {
		const tagName = elem.tagName.toLowerCase()
		switch (tagName) {
			case 'div':
			case 'section':
				elementData.push(parseContainer(ch, elem))
				break
			case 'figure':
				elementData.push(parseFigure(ch, elem))
				break
			case 'table':
				elementData.push(parseTable(ch, elem))
				break
			case 'p':
				elementData.push(parseParagraph(ch, elem))
				break
			default:
				elementData.push(parseUnknownTag(ch, elem))
		}
	}
	return elementData
}

export function parseMainSection(ch: CheerioAPI): Section {
	let article = ch('article')

	// @ts-ignore
	let sectionTags: Element[] = article.children('section.ltx_section').get()

	// @ts-ignore
	let paperSections: SectionContent[] = parseElements(ch, sectionTags)
	return {
		type: 'section',
		id: article.attr('id') || 'unknown',
		tagName: article.prop('tagName')?.toLowerCase() || 'unknown',
		classNames: article.attr('class')?.split(/\s+/) || [],
		titleString: '',
		content: paperSections,
	}
}
