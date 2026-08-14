"use client";

import React from "react";

import Link from "next/link";

interface NavLinkProps {
  href?: string;
  name?: string;
  isLive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href = "/", name = "Link", isLive = false }) => {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.!?@#$%^&*()_+-=<>{}[]|/\\";
  let interval: NodeJS.Timeout | null = null;

  const handleMouseOver = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    let iteration = 0;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      if (!event.target) return;
      const headingElement = event.target as HTMLHeadingElement;
      headingElement.innerText = (headingElement.dataset.value || "")
        .split("")
        .map((letter: string, index: number) => {
          if (index < iteration) {
            return (headingElement.dataset.value || "")[index];
          }

          return letters[Math.floor(Math.random() * 52)];
        })
        .join("");

      if (iteration >= (headingElement.dataset.value || "").length) {
        if (interval) clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <Link href={href} className="inline-flex items-center gap-1.5 group">
      <p
        data-value={name}
        onMouseOver={handleMouseOver}
        className="font-medium text-sm uppercase font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        {name}
      </p>
      {isLive && (
        <span className="relative flex h-1.5 w-1.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
      )}
    </Link>
  );
};
export default NavLink;
