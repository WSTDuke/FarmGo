import { mockPosts } from "@/data/mock-data";
import type { Post } from "@/types/post";

export function getAllPosts(): Post[] {
  return mockPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find((post) => post.slug === slug);
}
