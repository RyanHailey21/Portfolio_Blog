import Link from "next/link";
import { loadProjects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <div className="space-y-6">
      <div className="space-y-2 animate-fade-in-up">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Case studies and builds, sourced from local MDX frontmatter.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/80 bg-card/70 p-6 text-muted-foreground shadow-soft animate-fade-in-up animate-delay-100">
          No projects yet. Add MDX files to content/projects to see them listed here.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${100 + i * 75}ms`,
              } as React.CSSProperties}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle>
                        <Link
                          href={`/projects/${project.slug}`}
                        className="hover-underline-expand"
                        >
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{project.summary}</CardDescription>
                    </div>
                    {project.featured ? (
                      <Badge className="border-copper/40 text-copper">Featured</Badge>
                    ) : null}
                  </div>
                </CardHeader>
                {project.stack?.length ? (
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                ) : null}
                <CardFooter>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/projects/${project.slug}`}>View Project</Link>
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
