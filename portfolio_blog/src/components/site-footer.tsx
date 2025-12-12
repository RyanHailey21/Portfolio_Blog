import { PageContainer } from "@/components/page-container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-background/90 py-10">
      <PageContainer>
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-copper">© {new Date().getFullYear()} Portfolio & Blog</span>
          <span>Built with Next.js · Tailwind CSS · shadcn/ui</span>
        </div>
      </PageContainer>
    </footer>
  );
}
