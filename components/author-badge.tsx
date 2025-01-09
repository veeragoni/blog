"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export function AuthorBadge({ author }: { author: string }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/authors/${author}`);
  };

  return (
    <Badge
      variant="secondary"
      className="hover:bg-secondary/80 cursor-pointer"
      onClick={handleClick}
    >
      {author}
    </Badge>
  );
}
