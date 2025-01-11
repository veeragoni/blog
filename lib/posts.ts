"use client";

import posts from "./posts.json";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  image: string;
  content: string;
  pinned?: boolean;
}

let postsCache: Post[] | null = null;

function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

export async function getLatestPosts(limit?: number): Promise<Post[]> {
  // Return cached posts if available
  if (postsCache) {
    const sortedPosts = [...postsCache].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return limit ? sortedPosts.slice(0, limit) : sortedPosts;
  }

  try {
    const response = await fetch(`${getBasePath()}/posts.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await response.json();
    postsCache = posts; // Cache the posts

    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return limit ? sortedPosts.slice(0, limit) : sortedPosts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPinnedPosts() {
  return posts.filter(post => post.pinned);
}

export async function getPostsByTag(tag: string) {
  return posts.filter((post) => 
    post.tags?.some((t: string) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getPostsByAuthor(author: string) {
  return posts.filter((post) => post.author.split(', ').includes(author));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

export function getAllAuthors(): string[] {
  const authors = new Set<string>();
  posts.forEach(post => {
    post.author.split(', ').forEach(author => authors.add(author));
  });
  return Array.from(authors);
}