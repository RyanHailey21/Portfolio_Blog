import React from "react";
import Link from "next/link";

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-8 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4 border-b border-border/50 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="leading-7 mb-4 text-foreground/90">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="font-medium text-copper-600 dark:text-copper-400 underline underline-offset-2 hover:text-copper-700 dark:hover:text-copper-300 transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/90">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/90">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const isInlineCode = !className?.includes("language-");
    
    if (isInlineCode) {
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
          {children}
        </code>
      );
    }

    return (
      <code className={className}>
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border border-border/50 bg-muted/50 p-4">
      <code className="text-sm font-mono leading-7 text-foreground">{children}</code>
    </pre>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mt-6 mb-4 border-l-4 border-copper-600/30 bg-muted/30 pl-4 py-2 italic text-foreground/80">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border/50" />,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img
      src={src}
      alt={alt}
      className="mt-6 mb-4 rounded-lg border border-border/50 shadow-soft max-w-full h-auto"
    />
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border/50">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border-b border-border/50 bg-muted/50 px-4 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border-b border-border/30 px-4 py-2 text-foreground/90">{children}</td>
  ),
};
