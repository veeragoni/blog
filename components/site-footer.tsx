import { Github, Twitter, Linkedin, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "./ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 items-center gap-4 px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by {siteConfig.author}. The source code is available on{" "}
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </a>
          <Link href={siteConfig.social.resume}>
            <Button variant="ghost" size="icon">
              <FileText className="h-4 w-4" />
              <span className="sr-only">Resume</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
