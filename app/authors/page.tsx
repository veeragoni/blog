import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/breadcrumb";
import { AuthorBadge } from "@/components/author-badge";
import { getAllAuthors, getPostsByAuthor } from "@/lib/posts.server";
import Link from "next/link";

export default async function AuthorsPage() {
  const authors = getAllAuthors();
  const authorCounts = await Promise.all(
    (
      await authors
    ).map(async (author) => ({
      author,
      count: (await getPostsByAuthor(author)).length,
    }))
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Breadcrumb items={[{ label: "Authors", href: "/authors" }]} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Authors</h1>
          <p className="text-muted-foreground">Browse posts by author</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorCounts.map(({ author, count }) => (
            <Link key={author} href={`/authors/${author}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {author.split(", ").map((singleAuthor) => (
                      <AuthorBadge
                        key={singleAuthor}
                        author={singleAuthor.trim()}
                      />
                    ))}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      {count} {count === 1 ? "post" : "posts"}
                      {author.includes(", ") ? " together" : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
