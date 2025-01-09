import { NextResponse } from 'next/server';
import { getLatestPosts } from '@/lib/posts.server';
import { Feed } from 'feed';
import { siteConfig } from '@/config/site';

export async function GET() {
  const posts = await getLatestPosts();
  
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
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

  posts.forEach((post: { slug: any; title: any; description: any; content: any; author: any; date: string | number | Date; tags: any[]; }) => {
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

  return NextResponse.json(JSON.parse(feed.json1()));
}
