import { EmptyState } from "@/components/common/EmptyState";
import { mockPosts } from "@/data/mock-data";
import Link from "next/link";

export default function BlogPage() {
  if (mockPosts.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState title="Chưa có bài viết" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <ul className="mt-8 space-y-4">
        {mockPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-lg font-medium hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-zinc-500">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
