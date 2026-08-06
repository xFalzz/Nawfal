import { SiVercel } from "react-icons/si";
import { FiLock } from "react-icons/fi";

// Assets
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const TemplateStack = ({ stack }: { stack: string[] }) => {
  return (
    <div className="anim absolute -top-full left-0 z-10 flex w-full items-center justify-around border-b bg-popover px-2 group-hover:top-0 sm:px-3">
      {stack.map((item, index) => (
        <div className="flex w-full items-center justify-around" key={index}>
          <code className="py-2.5 text-[10px] leading-none text-foreground sm:py-3 sm:text-xs">
            {item}
          </code>
          {index !== stack.length - 1 && (
            <div className="h-auto w-[1px] self-stretch bg-border" />
          )}
        </div>
      ))}
    </div>
  );
};

const TemplateCard = ({
  name,
  url,
  image,
  type,
  stack,
  price,
  category,
}: {
  name: string;
  url: string;
  image: StaticImageData | string;
  type: string;
  stack: string[];
  price: string;
  category: string;
}) => {
  const isStaticImage = typeof image === "object" && image !== null && "src" in image;

  return (
    <Link
      href={url || "#"}
      target={url && url !== "#" ? "_blank" : "_self"}
      className="anim group relative flex h-fit w-full cursor-pointer flex-col overflow-hidden rounded border bg-popover pt-2.5"
    >
      <div className="absolute right-0 top-0 h-fit rounded-bl-lg rounded-tr bg-accent px-2 py-0.5 z-10">
        <code className="text-[10px] font-medium leading-none text-accent-foreground sm:text-xs">
          {category}
        </code>
      </div>
      <div className="flex w-full items-center gap-x-2 overflow-hidden border-b px-3 pb-3">
        <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full border p-1.5 shrink-0">
          <SiVercel className="h-full w-full text-foreground" />
        </div>
        <div className="flex w-full cursor-pointer flex-col gap-y-1 min-w-0">
          <div className="flex w-full items-center justify-between gap-x-2">
            <h1 className="text-sm font-medium leading-none text-foreground truncate">
              {name}
            </h1>
          </div>
          <p className="text-xs leading-none text-muted-foreground truncate">
            {url && url !== "#" ? url.replace("https://", "") : "GitHub Repository"}
          </p>
        </div>
      </div>
      <div className="relative flex aspect-[4/3] h-auto w-full items-center justify-center overflow-hidden rounded-b bg-muted/30">
        <TemplateStack stack={stack} />
        {isStaticImage ? (
          <Image
            src={image as StaticImageData}
            alt={name}
            placeholder="blur"
            className="h-auto w-full object-cover group-hover:blur-sm anim p-6"
          />
        ) : (
          <Image
            src={image as string}
            alt={name}
            width={400}
            height={300}
            className="h-auto w-full object-cover group-hover:blur-sm anim p-6"
            unoptimized
          />
        )}
        <div className="anim absolute -bottom-full left-0 z-10 flex w-full items-center justify-around border-t bg-popover px-3 group-hover:bottom-0">
          {/* Star */}
          <div className="flex items-center gap-x-1 py-3">
            <code className="text-xs leading-none text-accent-foreground">
              {type}
            </code>
          </div>
          <div className="h-auto w-[1px] self-stretch bg-border" />
          <div className="flex items-center gap-x-1 py-3">
            <code className="text-xs leading-none text-accent-foreground underline underline-offset-2">
              {price === "Locked" ? <FiLock size={12} /> : price}
            </code>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default TemplateCard;
