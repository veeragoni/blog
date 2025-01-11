"use client";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getLatestPosts } from "@/lib/posts";
import { TagBadge } from "@/components/tag-badge";
import { PinnedPosts } from "@/components/pinned-posts";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const allPosts = await getLatestPosts();
        setPosts(allPosts);
        setPinnedPosts(allPosts.filter((post) => post.pinned));
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-card py-15">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 py-2">
              Exploring Technology, Business, and Beyond
            </h1>
            <p className="text-xl text-muted-foreground mb-8 whitespace-nowrap overflow-hidden text-ellipsis text-justify max-w-full">
              Insights on AI, innovation, and the future of work. Join me on a
              journey through the intersection of technology and business.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="container py-8">
          <PinnedPosts title="Featured Posts" posts={pinnedPosts} />

          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts
              .filter((post) => !post.pinned)
              .map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                    <div className="flex flex-col sm:flex-row h-full">
                      <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={800}
                          height={600}
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
                        <p className="text-muted-foreground mb-4">
                          {post.description}
                        </p>
                        <time className="text-sm text-muted-foreground">
                          {format(new Date(post.date), "MMMM d, yyyy")}
                        </time>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
