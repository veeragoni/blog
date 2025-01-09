import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/breadcrumb";
import { AuthorBadge } from "@/components/author-badge";
import Link from "next/link";
import { getAllAuthors, getPostsByAuthor } from "@/lib/posts.server";

export const dynamicParams = true;

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({
    author,
  }));
}

export default async function AuthorPage({
  params,
}: {
  params: { author: string };
}) {
  const author = decodeURIComponent(params.author);
  const posts = await getPostsByAuthor(author);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <Breadcrumb
          items={[
            { label: "Authors", href: "/authors" },
            {
              label: `Posts by ${author}`,
              href: `/authors/${encodeURIComponent(author)}`,
            },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Posts by &ldquo;{author}&rdquo;
          </h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const authors = post.author.split(",").map((a) => a.trim());
            return (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {authors.map((author) => (
                        <AuthorBadge key={author} author={author} />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {post.description}
                    </p>
                    <time className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found with this author.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
