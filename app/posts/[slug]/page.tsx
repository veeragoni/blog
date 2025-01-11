import { getPostsBySlug, getAllPostSlugs } from '@/lib/posts.server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SiteHeader } from "@/components/site-header";
import { Breadcrumb } from "@/components/breadcrumb";
import { TagBadge } from "@/components/tag-badge";
import { AuthorLink } from "@/components/author-link";
import { Users, User } from "lucide-react";
import Image from "next/image";
import { format } from 'date-fns';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostsBySlug(params.slug);
  const content = post.content.replace(/^#\s+.*$/m, '');
  const authors = post.author.split(', ');
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb items={[{ label: "Posts", href: "/posts" }, { label: post.title, href: `/posts/${params.slug}` }]} />
        </div>
        
        <div className="relative w-full h-[100px] mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container max-w-4xl mx-auto px-6">
          <article>
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  {authors.length > 1 ? <Users className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span>Author{authors.length > 1 ? 's' : ''}: </span>
                  {authors.map((author, index) => (
                    <span key={author}>
                      <AuthorLink name={author} />
                      {index < authors.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <span>•</span>
                <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                <span>•</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </header>

            <div className="prose dark:prose-invert prose-lg mx-auto prose-headings:font-bold prose-headings:text-left prose-p:text-justify prose-p:leading-relaxed prose-li:text-justify">
              <MDXRemote source={content} />
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}