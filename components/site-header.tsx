import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Hash } from "lucide-react";
import { FeedButton } from "@/components/feed-button";
import { SearchDialog } from "@/components/search-dialog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">Blog</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/posts" className="hover:text-foreground">Posts</Link>
            <Link href="/tags" className="flex items-center space-x-2 hover:text-foreground">
              <Hash className="h-4 w-4" />
              <span>Tags</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <SearchDialog />
          <FeedButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}