import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { loadProject, loadProjects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/lib/mdx-components";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await loadProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) {
    notFound();
  }

  // Load and compile MDX body
  const contentDir = path.join(process.cwd(), "content", "projects");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  let mdxSource = "";

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { content } = matter(fileContent);
    mdxSource = content;
  } catch (error) {
    console.error(`Failed to load MDX for project slug: ${slug}`, error);
  }

  let compiledMdx;
  try {
    compiledMdx = await compileMDX({
      source: mdxSource,
      options: { parseFrontmatter: true },
      components: mdxComponents,
    });
  } catch (error) {
    console.error(`Failed to compile MDX for project slug: ${slug}`, error);
    compiledMdx = null;
  }

  return (
    <article className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground">{project.summary}</p>
      </div>

      {project.stack?.length ? (
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Links
          </h2>
          <ul className="space-y-2 text-sm">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="max-w-none space-y-4">
        {compiledMdx ? compiledMdx.content : null}
      </div>
    </article>
  );
}
