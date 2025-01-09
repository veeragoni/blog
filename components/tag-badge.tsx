"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export function TagBadge({ tag }: { tag: string }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/tags/${tag.toLowerCase()}`);
  };

  return (
    <Badge 
      variant="secondary" 
      className="hover:bg-secondary/80 cursor-pointer"
      onClick={handleClick}
    >
      {tag}
    </Badge>
  );
}