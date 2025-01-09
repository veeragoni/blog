"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
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

export function Search() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [results, setResults] = React.useState<Post[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    // Load posts on mount
    getLatestPosts().then(setPosts);
  }, []);

  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const searchQuery = debouncedQuery.toLowerCase();
    const searchResults = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery);
      const descriptionMatch = post.description.toLowerCase().includes(searchQuery);
      const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchQuery));
      return titleMatch || descriptionMatch || tagsMatch;
    });

    setResults(searchResults);
  }, [debouncedQuery, posts]);

  const handleSelect = (post: Post) => {
    setOpen(false);
    router.push(`/posts/${post.slug}`);
  };

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
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Search Posts</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput
              placeholder="Search posts..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>
                {posts.length === 0 ? (
                  "Loading..."
                ) : (
                  "No results found."
                )}
              </CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Posts">
                  {results.map((post) => (
                    <CommandItem
                      key={post.slug}
                      value={post.slug}
                      onSelect={() => handleSelect(post)}
                    >
                      <div className="flex flex-col">
                        <span>{post.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {post.description}
                        </span>
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