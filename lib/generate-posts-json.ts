import fs from 'fs';
import path from 'path';
import { getLatestPosts } from './posts.server';

async function generatePostsJson() {
  try {
    const posts = await getLatestPosts();
    
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write posts to a JSON file
    const outputPath = path.join(publicDir, 'posts.json');
    await fs.promises.writeFile(
      outputPath,
      JSON.stringify(posts, null, 2),
      'utf-8'
    );
    
    console.log(`Successfully generated posts.json with ${posts.length} posts`);
  } catch (error) {
    console.error('Error generating posts.json:', error);
    process.exit(1);
  }
}

generatePostsJson();