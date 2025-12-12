import Link from "next/link";
import { PageContainer } from "@/components/page-container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/uses", label: "Uses" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="bg-copper-gradient bg-clip-text text-sm font-semibold uppercase tracking-[0.18em] text-transparent hover-scale-sm"
          >
            Portfolio & Blog
          </Link>
          <nav className="flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover-text-copper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
