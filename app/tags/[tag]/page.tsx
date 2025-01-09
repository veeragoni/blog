import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/breadcrumb";
import { TagBadge } from "@/components/tag-badge";
import { FeedButton } from "@/components/feed-button";
import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/posts.server";
import { format } from "date-fns";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Breadcrumb
          items={[
            { label: "Tags", href: "/tags" },
            { label: `Tagged: ${tag}`, href: `/tags/${params.tag}` },
          ]}
        />

        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Posts tagged &ldquo;{tag}&rdquo;
            </h1>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
            </p>
          </div>
          <FeedButton tag={tag} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((t) => (
                      <TagBadge key={t} tag={t} />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {post.description}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </time>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found with this tag.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
