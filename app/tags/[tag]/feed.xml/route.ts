import { NextResponse } from 'next/server';
import { getPostsByTag, getAllTags } from '@/lib/posts.server';
import { Feed } from 'feed';
import { siteConfig } from '@/config/site';

export async function generateStaticParams() {
  const tags = getAllTags();
  return (await tags).map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: { tag: string } }
) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  const feed = new Feed({
    title: `${siteConfig.name} - ${tag}`,
    description: `Posts tagged with ${tag}`,
    id: `${siteConfig.url}/tags/${tag}`,
    link: `${siteConfig.url}/tags/${tag}`,
    language: "en",
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    author: {
      name: siteConfig.author,
      email: siteConfig.email,
      link: siteConfig.url,
    },
  });

  posts.forEach((post) => {
    const url = `${siteConfig.url}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.content,
      author: [{
        name: post.author,
        link: siteConfig.url,
      }],
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}