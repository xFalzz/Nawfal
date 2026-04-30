import Link from "next/link";

import {
  FileText,
  Link2,
  Heart,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const SubLinks = () => {
  return (
    <div className="anim mt-4 grid h-fit w-full grid-cols-2 items-center justify-between border-y md:mt-8 md:flex lg:mt-12">
      <Link
        href={"https://github.com/xFalzz"}
        target="_blank"
        className="md:pad-l anim group col-span-1 flex h-fit w-full items-center justify-center gap-x-2 py-4 font-medium transition-all duration-200 ease-in-out hover:w-full hover:bg-muted md:w-1/2"
      >
        <Sparkles
          size={14}
          className="anim delay-100 text-muted-foreground fill-transparent group-hover:text-yellow-400 group-hover:fill-yellow-400"
        />
        <p className="text-center text-xs font-medium text-muted-foreground anim group-hover:text-foreground">
          Starter
        </p>
      </Link>
      <Link
        href={
          "https://drive.google.com/drive"
        }
        target="_blank"
        className="anim group col-span-1 flex h-fit w-full items-center justify-center gap-x-2 border-l py-4 font-medium transition-all duration-200 ease-in-out hover:w-full hover:bg-muted md:w-1/2"
      >
        <FileText
          size={14}
          className="anim delay-100 text-muted-foreground fill-transparent group-hover:text-rose-500"
        />
        <p className="text-center text-xs font-medium text-muted-foreground anim group-hover:text-foreground">
          Resume
        </p>
      </Link>
      <Link
        href={"/chat"}
        className="anim group col-span-1 flex h-fit w-full items-center justify-center gap-x-2 border-t py-4 font-medium transition-all duration-200 ease-in-out hover:w-full hover:bg-muted md:w-1/2 md:border-l md:border-t-0"
      >
        <MessageSquare
          size={14}
          className="anim delay-100 text-muted-foreground fill-transparent group-hover:text-foreground"
        />
        <p className="text-center text-xs font-medium text-muted-foreground anim group-hover:text-foreground">Chat</p>
      </Link>
      <Link
        href={"https://nawfal.site/"}
        className="md:pad-r anim group col-span-1 flex h-fit w-full items-center justify-center gap-x-2 border-l border-t py-4 font-medium transition-all duration-200 ease-in-out hover:w-full hover:bg-muted md:w-1/2 md:border-t-0"
      >
        <Link2
          size={14}
          className="anim delay-100 text-muted-foreground fill-transparent group-hover:text-sky-500"
        />
        <p className="text-center text-xs font-medium text-muted-foreground anim group-hover:text-foreground">Link</p>
      </Link>
    </div>
  );
};
export default SubLinks;
