import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { loadPost, loadPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/lib/mdx-components";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await loadPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) {
    notFound();
  }

  // Load and compile MDX body
  const contentDir = path.join(process.cwd(), "content", "posts");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  let mdxSource = "";

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { content } = matter(fileContent);
    mdxSource = content;
  } catch (error) {
    console.error(`Failed to load MDX for slug: ${slug}`, error);
  }

  let compiledMdx;
  try {
    compiledMdx = await compileMDX({
      source: mdxSource,
      options: { parseFrontmatter: true },
      components: mdxComponents,
    });
  } catch (error) {
    console.error(`Failed to compile MDX for slug: ${slug}`, error);
    compiledMdx = null;
  }

  return (
    <article className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
          {formatDate(post.date, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="text-muted-foreground">{post.summary}</p>
      </div>
      <div className="max-w-none space-y-4">
        {compiledMdx ? compiledMdx.content : null}
      </div>
    </article>
  );
}
