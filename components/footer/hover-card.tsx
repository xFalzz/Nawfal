import Link from "next/link";
import { FC, ReactNode } from "react";

interface ComponentsProps {
  children: ReactNode;
}

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

interface HoverItemProps {
  children: ReactNode;
  header?: string;
}

interface HoverItemsProps {
  children: ReactNode;
}

interface HoverLinksProps {
  href: string;
  children: ReactNode;
  target?: string;
}

const HoverTitle: FC<ComponentsProps> = ({ children }) => {
  return (
    <p className="anim text-center text-sm font-semibold uppercase text-foreground opacity-100 group-hover:opacity-100 md:group-hover:opacity-0 transition-opacity">
      {children}
    </p>
  );
};

const HoverItem: FC<HoverItemProps> = ({ children, header }) => {
  return (
    <div className="anim relative flex h-auto w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 bg-transparent px-4 py-3 md:absolute md:h-full md:py-0 md:translate-y-[110%] md:bg-popover md:group-hover:translate-y-0 transition-all">
      {header && (
        <p className="hidden text-sm font-semibold text-foreground md:block">{header}</p>
      )}
      {children}
    </div>
  );
};

const HoverItems: FC<HoverItemsProps> = ({ children }) => {
  return <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">{children}</div>;
};

const HoverLinks: FC<HoverLinksProps> = ({ children, href, target }) => {
  return (
    <Link href={href} target={target}>
      <code className="anim text-xs font-medium text-muted-foreground hover:text-foreground">
        {children}
      </code>
    </Link>
  );
};

const HoverCard: FC<HoverCardProps> = ({ children, className }) => {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center overflow-hidden px-4 py-4 md:flex-row md:py-8 ${className}`}
    >
      {children}
    </div>
  );
};

export { HoverTitle, HoverItem, HoverCard, HoverItems, HoverLinks };
