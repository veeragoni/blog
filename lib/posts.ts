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

export async function getLatestPosts(limit?: number) {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
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