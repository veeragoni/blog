import { Post } from "./types";

// Configuration for search
const SEARCH_CONFIG = {
  minQueryLength: 2,
  maxResults: 10,
  weights: {
    title: 2.0,
    description: 1.5,
    tags: 1.8,
    content: 1.0,
    author: 1.2
  }
};

// Normalize text for consistent searching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Main search function
export function searchPosts(posts: Post[], query: string): Post[] {
  const normalizedQuery = normalizeText(query);

  // Return empty array if the query is too short
  if (normalizedQuery.length < SEARCH_CONFIG.minQueryLength) {
    return [];
  }

  // Calculate scores for each post
  const results = posts.map(post => {
    let score = 0;
    const searchableFields: Record<string, string | string[]> = {
      title: post.title,
      description: post.description,
      content: post.content,
      author: post.author,
      tags: post.tags
    };

    // Iterate through each field and calculate the score
    for (const [field, content] of Object.entries(searchableFields)) {
      const weight = SEARCH_CONFIG.weights[field as keyof typeof SEARCH_CONFIG.weights];
      const searchText = Array.isArray(content) ? content.join(' ') : content;
      const normalizedContent = normalizeText(searchText);

      // Exact match (entire content matches the query)
      if (normalizedContent === normalizedQuery) {
        score += 10 * weight; // Highest score for exact match
        continue; // Skip other checks if exact match is found
      }

      // Word boundary match (matches whole words)
      const words = normalizedContent.split(/\s+/);
      for (const word of words) {
        if (word === normalizedQuery) {
          score += 5 * weight; // High score for whole-word match
        } else if (word.startsWith(normalizedQuery)) {
          score += 3 * weight; // Medium score for prefix match
        }
      }

      // Partial match (query is a substring of the content)
      if (normalizedContent.includes(normalizedQuery)) {
        score += 1 * weight; // Lower score for partial match
      }
    }

    return { post, score };
  });

  // Filter, sort, and limit the results
  return results
    .filter(result => result.score > 0) // Only include posts with a score > 0
    .sort((a, b) => b.score - a.score) // Sort by score in descending order
    .slice(0, SEARCH_CONFIG.maxResults) // Limit to maxResults
    .map(result => result.post); // Return only the post objects
}