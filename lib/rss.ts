import { Feed } from 'feed';
import { getLatestPosts, getPostsByTag } from './posts.server';
import { siteConfig } from '@/config/site';

export async function generateMainFeed() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/feed.xml`,
      json: `${siteConfig.url}/feed.json`,
      atom: `${siteConfig.url}/atom.xml`,
    },
    author: {
      name: siteConfig.author,
      email: siteConfig.email,
      link: siteConfig.url,
    },
  });

  const posts = await getLatestPosts();

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

  return {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
}