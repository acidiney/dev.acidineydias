import {defineEventHandler} from 'h3'
import { parseStringPromise } from "xml2js";

interface RSSItem {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    image?: string;
    tags?: string[];
}

function extractImage(item: any): string | undefined {
    if (item.enclosure && item.enclosure[0].$.url) {
        return item.enclosure[0].$.url;
    }
    return undefined;
}

function extractTags(item: any): string[] | undefined {
    if (item.category) {
        return item.category.map((c: any) => c._ || c);
    }
    return undefined;
}

async function getLatestArticle(xmlData: string): Promise<RSSItem | null> {

    const parsed = await parseStringPromise(xmlData);

    const items = parsed.rss.channel[0].item;

    if (!items || items.length === 0) return null;

    // Map items to RSSItem
    const articles: RSSItem[] = items.map((item: any) => {
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

    return articles[0];
}

export default defineEventHandler(async () => {
  const xml = await $fetch<string>('https://blog.acidineydias.dev/rss.xml', { responseType: 'text' })
    return getLatestArticle(xml)
})