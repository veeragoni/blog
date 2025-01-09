export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  image: string;
  content: string;
  pinned?: boolean;
}