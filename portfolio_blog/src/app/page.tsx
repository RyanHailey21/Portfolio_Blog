import { loadPosts, loadProjects } from "@/lib/content";
import { HomeContent } from "@/components/home-content";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    loadProjects(),
    loadPosts(),
  ]);

  return <HomeContent projects={projects} posts={posts} />;
}
