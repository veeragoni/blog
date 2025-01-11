"use client";

import * as React from "react";
import {
  Search as SearchIcon,
  Tag,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { Post } from "@/lib/types";
import { getLatestPosts } from "@/lib/posts";
import { searchPosts } from "@/lib/search.client";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Highlight } from "./search-highlight";

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [results, setResults] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (!open) return;

    async function loadPosts() {
      setIsLoading(true);
      try {
        const allPosts = await getLatestPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, [open]);

  React.useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = searchPosts(posts, debouncedQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery, posts]);

  const handleSelect = React.useCallback(
    (post: Post) => {
      setOpen(false);
      router.push(`/posts/${post.slug}`);
    },
    [router]
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="w-9 px-0"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search posts</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Search Posts</DialogTitle>
          </DialogHeader>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search by title, author, tags, or content..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Searching..." : "No results found."}
              </CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading={`Found ${results.length} posts`}>
                  {results.map((post) => (
                    <CommandItem
                      key={post.slug}
                      value={post.slug}
                      onSelect={() => handleSelect(post)}
                      className="p-4"
                    >
                      <div className="flex flex-col gap-2 w-full">
                        <span className="font-medium">
                          <Highlight text={post.title} query={query} />
                        </span>
                        {post.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            <Highlight text={post.description} query={query} />
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <Highlight text={post.author} query={query} />
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {format(new Date(post.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            <div className="flex gap-1">
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  <Highlight text={tag} query={query} />
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {post.content && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span className="line-clamp-1">
                                <Highlight
                                  text={
                                    post.content
                                      .replace(/^#\s.*$/m, "")
                                      .trim()
                                      .slice(0, 100) + "..."
                                  }
                                  query={query}
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
