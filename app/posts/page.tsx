import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { TagBadge } from "@/components/tag-badge";
import { TimelineView } from "@/components/timeline-view";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLatestPosts } from "@/lib/posts.server";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  ReactPortal,
} from "react";

function organizePostsByTimeline(posts: any[]) {
  const timeline: Record<string, Record<string, any[]>> = {};

  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString("default", { month: "long" });

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

export default async function PostsPage() {
  const posts = await getLatestPosts();
  const timeline = organizePostsByTimeline(posts);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Posts</h1>
          <p className="text-muted-foreground mt-2">
            {posts.length} posts in total
          </p>
        </div>

        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="space-y-6">
              {posts.map(
                (post: {
                  slug: Key | null | undefined;
                  image: string | StaticImport;
                  title:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  tags: any[];
                  description:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  date: string | number | Date;
                }) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
                      <div className="flex">
                        <div className="relative w-48 h-48 flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={
                              typeof post.title === "string"
                                ? post.title
                                : "Post image"
                            }
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
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <TimelineView timeline={timeline} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
