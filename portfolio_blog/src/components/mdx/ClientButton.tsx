"use client";

import React from "react";

export function ClientButton() {
  return (
    <button
      className="inline-flex items-center rounded-md border px-3 py-1 text-sm transition hover:bg-accent hover:text-accent-foreground"
      onClick={() => alert("Hello, MDX!")}
    >
      Click Me
    </button>
  );
}
