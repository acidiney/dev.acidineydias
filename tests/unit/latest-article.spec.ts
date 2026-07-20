import { describe, expect, it } from 'vitest'
import { extractImage, extractTags, getLatestArticle } from '../../server/api/latest-article'

const buildRssXml = (items: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog</title>
    <link>https://blog.acidineydias.dev</link>
    ${items.join('')}
  </channel>
</rss>`

const buildItem = (overrides: {
  title?: string
  link?: string
  pubDate?: string
  description?: string
  imageUrl?: string
  categories?: string[]
} = {}) => {
  const {
    title = 'Default Title',
    link = 'https://blog.acidineydias.dev/post-1',
    pubDate = 'Mon, 01 Jan 2024 00:00:00 GMT',
    description = 'Default description',
    imageUrl,
    categories,
  } = overrides

  const enclosure = imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''
  const categoryTags = categories?.map(c => `<category>${c}</category>`).join('') || ''

  return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${enclosure}
      ${categoryTags}
    </item>
  `
}

describe('latest-article parser', () => {
  describe('getLatestArticle', () => {
    it('returns the most recent article', async () => {
      const xml = buildRssXml([
        buildItem({ title: 'Old Post', pubDate: 'Mon, 01 Jan 2023 00:00:00 GMT' }),
        buildItem({ title: 'New Post', pubDate: 'Mon, 01 Jan 2024 00:00:00 GMT' }),
      ])

      const article = await getLatestArticle(xml)

      expect(article).not.toBeNull()
      expect(article?.title).toBe('New Post')
    })

    it('returns null when no items exist', async () => {
      const xml = buildRssXml([])

      const article = await getLatestArticle(xml)

      expect(article).toBeNull()
    })

    it('extracts image from enclosure', async () => {
      const xml = buildRssXml([
        buildItem({ imageUrl: 'https://example.com/image.jpg' }),
      ])

      const article = await getLatestArticle(xml)

      expect(article?.image).toBe('https://example.com/image.jpg')
    })

    it('extracts tags from categories', async () => {
      const xml = buildRssXml([
        buildItem({ categories: ['vue', 'nuxt'] }),
      ])

      const article = await getLatestArticle(xml)

      expect(article?.tags).toEqual(['vue', 'nuxt'])
    })

    it('strips github username prefix from link', async () => {
      const xml = buildRssXml([
        buildItem({ link: 'github.com/acidineydias/my-post' }),
      ])

      const article = await getLatestArticle(xml)

      expect(article?.link).toBe('my-post')
    })
  })

  describe('extractImage', () => {
    it('returns undefined when no enclosure exists', () => {
      expect(extractImage({})).toBeUndefined()
    })
  })

  describe('extractTags', () => {
    it('returns undefined when no categories exist', () => {
      expect(extractTags({})).toBeUndefined()
    })

    it('handles string and object category entries', () => {
      expect(extractTags({ category: ['vue', { _: 'nuxt' }] })).toEqual(['vue', 'nuxt'])
    })
  })
})
