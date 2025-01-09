"use client";

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { authors } from "@/config/authors";
import { Button } from "./ui/button";

export function AuthorLink({ name }: { name: string }) {
  const author = authors[name];
  if (!author) return <span>{name}</span>;

  return (
    <span className="inline-flex items-center gap-2">
      <Link
        href={`/authors/${encodeURIComponent(name)}`}
        className="hover:text-primary"
      >
        {name}
      </Link>
      {author.github && (
        <a href={author.github} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Github className="h-4 w-4" />
          </Button>
        </a>
      )}
      {author.linkedin && (
        <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Linkedin className="h-4 w-4" />
          </Button>
        </a>
      )}
    </span>
  );
}
