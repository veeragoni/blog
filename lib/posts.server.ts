import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from "./types";

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getPostFiles() {
  return fs.promises.readdir(postsDirectory);
}

export function getPostData(slug: string): Post {
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    author: data.author || '',
    tags: data.tags || [],
    image: data.image || 'https://picsum.photos/seed/default/800/600',
    content,
    pinned: data.pinned || false,
  };
}

export async function getLatestPosts(limit?: number) {
  const files = getPostFiles();
  const posts = (await files).map(file => getPostData(file));
  
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}

export async function getPinnedPosts() {
  const files = getPostFiles();
  const posts = (await files).map(file => getPostData(file));
  return posts.filter(post => post.pinned);
}

export async function getPostsBySlug(slug: string): Promise<Post> {
  return getPostData(slug);
}

export async function getAllPostSlugs() {
  const files = await getPostFiles();
  return files.map((file) => ({
    slug: file,
  }));
}

export async function getPostsByTag(tag: string) {
  const files = await getPostFiles();
  const posts = files.map(file => getPostData(file));
  
  return posts.filter((post) => 
    post.tags?.some((t: string) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getPostsByAuthor(authorQuery: string) {
  const files = await getPostFiles();
  const posts = files.map(file => getPostData(file));
  
  // Make sure we're comparing clean strings
  const normalizedQuery = decodeURIComponent(authorQuery).trim();
  
  return posts.filter((post) => {
    const normalizedPostAuthor = post.author.trim();
    return normalizedPostAuthor === normalizedQuery;
  });
}
  // Sort and normalize the queried authors
  // const queryAuthors = authorQuery.split(', ')
  //   .map(a => a.trim())
  //   .sort()
  //   .join(', ');
  
  // return posts.filter((post) => {
  //   // Sort and normalize the post authors
  //   const postAuthors = post.author.split(', ')
  //     .map(a => a.trim())
  //     .sort()
  //     .join(', ');
    
  //   return postAuthors === queryAuthors;
  // });

export async function getAllTags(): Promise<string[]> {
  const files = await getPostFiles();
  const posts = files.map(file => getPostData(file));
  
  const tags = new Set<string>();
  posts.forEach((post: Post) => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

export async function getAllAuthors(): Promise<string[]> {
  const files = await getPostFiles();
  const posts = files.map(file => getPostData(file));
  
  const authors = new Set<string>();
  posts.forEach(post => {
    const authorNames = post.author.split(', ');
    authors.add(authorNames.join(', '));
  });
  return Array.from(authors);
}

export async function getPostsByTimeline() {
  const posts = await getLatestPosts();
  const timeline: Record<string, Record<string, any[]>> = {};

  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString('default', { month: 'long' });

    if (!timeline[year]) {
      timeline[year] = {};
    }
    if (!timeline[year][month]) {
      timeline[year][month] = [];
    }
    timeline[year][month].push(post);
  });

  return timeline;
}
