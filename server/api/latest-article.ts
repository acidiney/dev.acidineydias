import { defineEventHandler } from 'h3'
import { parseStringPromise } from "xml2js";

interface RSSItem {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    image?: string;
    tags?: string[];
}

interface ParsedRSSItem {
    title: [string, ...string[]];
    link: [string, ...string[]];
    pubDate: [string, ...string[]];
    description: [string, ...string[]];
    enclosure?: Array<{ $: { url: string } }>;
    category?: Array<string | { _: string }>;
}

function getEnclosureUrl(item: ParsedRSSItem): string | undefined {
    const enclosure = item.enclosure?.[0];
    return enclosure?.$.url;
}

export function extractImage(item: ParsedRSSItem): string | undefined {
    return getEnclosureUrl(item);
}

export function extractTags(item: ParsedRSSItem): string[] | undefined {
    if (!item.category) return undefined;
    return item.category.map((c) => (typeof c === 'string' ? c : c._));
}

export async function getLatestArticle(xmlData: string): Promise<RSSItem | null> {

    const parsed = await parseStringPromise(xmlData);

    const items: ParsedRSSItem[] = parsed.rss.channel[0].item;

    if (!items || items.length === 0) return null;

    // Map items to RSSItem
    const articles: RSSItem[] = items.map((item) => {
        return ({
            title: item.title[0],
            link: item.link[0].replace('github.com/acidineydias/', ''),
            pubDate: item.pubDate[0],
            description: item.description[0],
            image: extractImage(item),
            tags: extractTags(item),
        })
    });

    // Sort by pubDate descending
    articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return articles[0] ?? null;
}

export default defineEventHandler(async () => {
  const xml = await $fetch<string>('https://blog.acidineydias.dev/rss.xml', { responseType: 'text' })
    return getLatestArticle(xml)
})