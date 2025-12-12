import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type PostStatus = "published" | "draft";
export type ProjectStatus = "active" | "archived" | undefined;

export interface PostFrontmatter {
  title: string;
  date: string; // ISO string
  summary: string;
  tags: string[];
  status: PostStatus;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  role: string;
  stack: string[];
  links: ProjectLink[];
  featured: boolean;
  status?: ProjectStatus;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

function isPublished(status: PostStatus | undefined) {
  return status === "published" || status === undefined;
}

async function listFiles(dir: string) {
  try {
    const files = await fs.readdir(dir);
    return files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function parseFrontmatter<T>(slug: string, raw: string) {
  const { data } = matter(raw);
  return { slug, frontmatter: data as T };
}

function sortByDateDescending(items: PostMeta[]) {
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadPosts(): Promise<PostMeta[]> {
  const files = await listFiles(POSTS_DIR);
  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    const { frontmatter } = parseFrontmatter<PostFrontmatter>(slug, raw);

    if (!frontmatter.title || !frontmatter.date || !frontmatter.summary) continue;
    if (!isPublished(frontmatter.status)) continue;

    posts.push({ ...frontmatter, slug });
  }

  return sortByDateDescending(posts);
}

export async function loadPost(slug: string): Promise<PostMeta | null> {
  const filePathMd = path.join(POSTS_DIR, `${slug}.md`);
  const filePathMdx = path.join(POSTS_DIR, `${slug}.mdx`);

  const filePath = await fs
    .access(filePathMd)
    .then(() => filePathMd)
    .catch(async () => {
      await fs.access(filePathMdx);
      return filePathMdx;
    })
    .catch(() => null);

  if (!filePath) return null;

  const raw = await fs.readFile(filePath, "utf8");
  const { frontmatter } = parseFrontmatter<PostFrontmatter>(slug, raw);
  if (!isPublished(frontmatter.status)) return null;
  return { ...frontmatter, slug };
}

export async function loadProjects(): Promise<ProjectMeta[]> {
  const files = await listFiles(PROJECTS_DIR);
  const projects: ProjectMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
    const { frontmatter } = parseFrontmatter<ProjectFrontmatter>(slug, raw);

    if (!frontmatter.title || !frontmatter.summary || !frontmatter.role) continue;
    projects.push({ ...frontmatter, slug });
  }

  return projects.sort((a, b) => {
    if (a.featured === b.featured) return a.title.localeCompare(b.title);
    return a.featured ? -1 : 1;
  });
}

export async function loadProject(slug: string): Promise<ProjectMeta | null> {
  const filePathMd = path.join(PROJECTS_DIR, `${slug}.md`);
  const filePathMdx = path.join(PROJECTS_DIR, `${slug}.mdx`);

  const filePath = await fs
    .access(filePathMd)
    .then(() => filePathMd)
    .catch(async () => {
      await fs.access(filePathMdx);
      return filePathMdx;
    })
    .catch(() => null);

  if (!filePath) return null;

  const raw = await fs.readFile(filePath, "utf8");
  const { frontmatter } = parseFrontmatter<ProjectFrontmatter>(slug, raw);
  return { ...frontmatter, slug };
}
