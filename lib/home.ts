import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const homeDirectory = path.join(process.cwd(), 'content/home');

export function getHomeContent() {
  const fullPath = path.join(homeDirectory, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    description: data.description,
    featuredTitle: data.featuredTitle,
    latestTitle: data.latestTitle,
    content,
  };
}