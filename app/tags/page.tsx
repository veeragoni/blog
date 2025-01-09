import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/breadcrumb";
import { TagBadge } from "@/components/tag-badge";
import { getAllTags, getPostsByTag } from "@/lib/posts.server";
import Link from "next/link";

export default async function TagsPage() {
  const tags = getAllTags();
  const tagCounts = await Promise.all(
    (
      await tags
    ).map(async (tag) => ({
      tag,
      count: (await getPostsByTag(tag)).length,
    }))
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Breadcrumb items={[{ label: "Tags", href: "/tags" }]} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tags</h1>
          <p className="text-muted-foreground">Browse posts by topic</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
            >
              <Card className="p-6">
                <div className="mb-4">
                  <TagBadge tag={tag} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {count} {count === 1 ? "post" : "posts"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
