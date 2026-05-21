import { getPostBySlug } from "@/services/post.service";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">{post.publishedAt}</p>
        <div className="mt-6 prose text-zinc-700">{post.content}</div>
      </article>
    </main>
  );
}
