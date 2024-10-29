import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = (await getCollection('blog')).sort(
        (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
    );

    const rssString = await getRssString({
        title: 'My Portfolio',
        site: context.site,
        description: 'This is my portfolio RSS feed',
        trailingSlash: false,
        items: posts.map((post) => ({
            title: post.data.title,
            link: `/blog/${post.slug}/`,
            description: post.data.summary || '',
            pubDate: post.data.publishedAt,
        })),
        customData: `<language>en-us</language>`,
    });

    return new Response(rssString, {
        headers: {
            'Content-Type': 'application/xml',
        }
    });
}