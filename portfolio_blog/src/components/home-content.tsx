"use client"

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { loadPosts, loadProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface HomeProps {
  projects: Awaited<ReturnType<typeof loadProjects>>;
  posts: Awaited<ReturnType<typeof loadPosts>>;
}

export function HomeContent({ projects, posts }: HomeProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  const skillsFromProjects = Array.from(
    new Set(
      featuredProjects
        .flatMap((p) => p.stack || [])
        .slice(0, 3)
    )
  );

  const filteredProjects = selectedSkill
    ? featuredProjects.filter((p) => p.stack?.includes(selectedSkill))
    : featuredProjects;

  const filteredPosts = selectedSkill
    ? recentPosts.filter((post) => post.tags?.includes(selectedSkill))
    : recentPosts;

  return (
    <div className="flex flex-col gap-16">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground animate-fade-in animate-delay-100">
          Portfolio · Writing · Projects
        </p>
        <div className="space-y-4 animate-fade-in-up animate-delay-150">
          <Avatar className="mb-4 h-40 w-40">
            <AvatarImage src="/avatar.jpg" alt="Profile picture" />
            <AvatarFallback className="bg-copper-gradient text-primary-foreground text-4xl">RH</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Building thoughtful products and writing about how they’re made.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A warm, editorial space to showcase work, share process, and keep a record of what I’m learning.
          </p>
          <div className="flex flex-wrap gap-3">
            {skillsFromProjects.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  selectedSkill === skill
                    ? 'bg-copper-gradient text-primary-foreground'
                    : 'bg-transparent border border-border text-foreground hover:border-copper hover:text-copper'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em]">
            <Button asChild variant="default" className="group">
              <a href="/projects">
                View Projects
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" className="group">
              <a href="/blog">
                Read the Blog
                <FileText className="transition-transform duration-300 group-hover:scale-110" size={16} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4 animate-fade-in-up animate-delay-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
          <a className="text-sm font-medium text-primary hover-underline-expand" href="/projects">
            View all
          </a>
        </div>
        {filteredProjects.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/70 p-6 text-muted-foreground shadow-soft transition-all duration-300 hover:border-copper hover:shadow-hover">
            {selectedSkill
              ? `No featured projects use ${selectedSkill}. Try another skill or clear the filter.`
              : 'Featured projects will appear here once content is added.'}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <div
                key={project.slug}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${200 + i * 75}ms`,
                } as React.CSSProperties}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover-underline-expand"
                      >
                        {project.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{project.summary}</CardDescription>
                  </CardHeader>
                  {project.stack?.length ? (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  ) : null}
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4 animate-fade-in-up animate-delay-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Writing</h2>
          <a className="text-sm font-medium text-primary hover-underline-expand" href="/blog">
            View all
          </a>
        </div>
        {filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/70 p-6 text-muted-foreground shadow-soft transition hover:border-copper hover:shadow-hover">
            {selectedSkill
              ? `No posts tagged with ${selectedSkill}. Try another skill or clear the filter.`
              : 'Blog posts will render here once MDX content is wired up.'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post, i) => (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${300 + i * 75}ms`,
                } as React.CSSProperties}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover-underline-expand"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{post.summary}</CardDescription>
                      </div>
                      <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-mono whitespace-nowrap">
                        {formatDate(post.date, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
