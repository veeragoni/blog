import { Pin } from 'lucide-react';
import Link from 'next/link';
import { Card } from './ui/card';
import Image from 'next/image';
import { TagBadge } from './tag-badge';
import { format } from 'date-fns';

interface PinnedPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
}

interface PinnedPostsProps {
  title: string;
  posts: PinnedPost[];
}

export function PinnedPosts({ title, posts }: PinnedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Pin className="mr-2 h-5 w-5" />
        {title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}