---
title: "I vibe coded this blog"
date: "2025-02-03"
description: "How I built this blog using Vibe Coding"
author: "Suresh Veeragoni"
tags: ["AI", "Development", "Productivity"]
image: "https://picsum.photos/seed/ai-dev/800/600"
pinned: true
---

Like most people, I have been thinking to write about my experiences/learnings/opinions online. Learn in public. Always procastinated and finally here I am!
I want to create a content machine where I write once and publish everywhere (like Medium, LinkedIn, Substack etc).
The process should be simple but automated where possible. I mean, simply write a markdown file and it should show up on the website. I want to focus on the content/language rather than complex formatting structure. I wanted to get into proper note taking habbit and been advocating about using Obsidian like tools (Notion, Logseq etc). I said advocating because I start using it in the beginning, but due to lack of decipline I tend to not use these. Maybe best way is to make the process natural as part of daily workflow. Let's see how long this writing will sustain. So, finally getting back to this writing

Then I bumped into lot of AI coding tools. couple of months ago into https://bolt.new/. Its a phenomenal software. I knoow there are other alteratives which camem little later like lovable.dev. I wanted to check, if I can build a blog engine just by prompting open source version of bolt, [bolt diy](https://github.com/stackblitz-labs/bolt.diy). I understand there are bunch of content writing frameworks like Hugo, Jekyll, Gatsby, Eleventy, MkDocs5. But the learning curve could be much. Also, I wanted prompt my way around to code the blog site. Later I learned that its called ["Vibe Coding"](https://x.com/karpathy/status/1886192184808149383) from Andrej Karpathy's post

So, the way this blog works is I write content in the [GitHub Repo](https://github.com/veeragoni/blog/tree/main/content/posts) and the markdown files will automatically get converted to html pages during build time and get deployed to GitHub pages using GitHub Actions. I think I spent couple of hours `Vibe Coding` and I got the initial prototype. One of the disadvantage of vibe coding is unless you have proper checkpoints as you build, you could lose as the AI model behind could change working code/feature. So, I took the project into my local VS Code, and started fixing the code still doing vibe code using [Cline](https://github.com/cline/cline)/[Continue](https://github.com/continuedev/continue) plugins and configured my own LLM (Claude Sonnet in this case) using Amazon Bedrock. This way, I fix only the files I am interested, provide limited context as needed and commit the repo so that I dont lose important changes and revert to those commits in case the AI model modifies the whole thing. Overall, I tinkered around asking for adding bunch of features and finally it got the shape I wanted. These are feature I implemented as part of the blog features

- RSS/Atom Feeds
- Client side search. The search index get built during build time in GitHub Actions
- Oh btw, the GitHub Actions pipeline automatically builds upon new commits, generates html page and publishes to GitHub pages.
- Ability to co-write with multiple authors. Meaning, there is cope for filtering content by author(s) and see all blog posts by author(s)
- See blog posts by Tags
- Dark mode
- Progress bar for reader as they scroll through
- Google Analytics to track usage via Cookies
- Pinned posts using markdown Front Matter

In future, I am planning to add support form mermaid charts and other visualizations so that I can see the content directly in generated html pages. 

What did I learn? Vibe Coding works. patience matter. If you are already good at certain thing, it could waste your time. But if you know how to use the tool effectively, it could save time. play each one's strength where it matters. let the AI do mundane, repetative work, or even sometimes do the research on behalf of you and reason with AI to bring best outcomes. If you are someone completely new to the tech that the AI is building, its probably little more tough or you mighe need to more work to prompt/undersatnd more aobut what it is doing. Overall I used a mix of AI tools, not just one to build this blog using Vibe Coding. 

Finally, I purchased a domain, and updated GitHub pages with the CNAME to use domain I purchased. thats how this blog is boring. Finally, Andrej's [x post](https://x.com/karpathy/status/1886192184808149383) from today motivated me write this story.

