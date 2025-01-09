"use client";

import { RssIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

export function FeedButton({ tag }: { tag?: string }) {
  const router = useRouter();
  const feedLinks = tag
    ? [{ label: "RSS Feed", href: `/tags/${tag}/feed.xml` }]
    : [
        { label: "RSS Feed", href: "/feed.xml" },
        { label: "JSON Feed", href: "/feed.json" },
        { label: "Atom Feed", href: "/atom.xml" },
      ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <RssIcon className="h-4 w-4" />
          <span className="sr-only">Subscribe to feed</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {feedLinks.map(({ label, href }) => (
          <DropdownMenuItem key={href} onClick={() => router.push(href)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
