import Link from "next/link";
import { loadPosts } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <div className="space-y-6">
      <div className="space-y-2 animate-fade-in-up">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Long-form notes and essays sourced from local MDX files.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/80 bg-card/70 p-6 text-muted-foreground shadow-soft animate-fade-in-up animate-delay-100 space-y-3">
          <p>
            No posts found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${100 + i * 75}ms`,
              } as React.CSSProperties}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover-underline-expand"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-mono whitespace-nowrap">
                      {formatDate(post.date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <CardDescription>{post.summary}</CardDescription>
                </CardHeader>
                {post.tags?.length ? (
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                ) : null}
                <CardFooter>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/blog/${post.slug}`}>Read</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
