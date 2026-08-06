import Image from "next/image";

const TechStackItems = [
  { name: "Figma", desc: "UI/UX Design Tool", icon: "/logos/figma-logo.svg" },
  { name: "Photoshop", desc: "Graphic Design Tool", icon: "/logos/photoshop.svg" },
  { name: "JavaScript", desc: "Programming Language", icon: "/logos/javascript.svg" },
  { name: "TypeScript", desc: "Typed JavaScript", icon: "/logos/typescript.svg" },
  { name: "Next JS", desc: "JavaScript Framework", icon: "/logos/next-js.svg" },
  { name: "React", desc: "JavaScript Library", icon: "/logos/react.svg" },
  { name: "Tailwind", desc: "CSS Framework", icon: "/logos/tailwind.svg" },
  { name: "Bootstrap", desc: "Frontend Toolkit", icon: "/logos/bootstrap.svg" },
  { name: "PHP", desc: "Programming Language", icon: "/logos/php.svg" },
  { name: "Laravel", desc: "Backend Framework", icon: "/logos/laravel.svg" },
  { name: "Supabase", desc: "Backend as a Service", icon: "/logos/supabase.svg" },
  { name: "Firebase", desc: "Backend as a Service", icon: "/logos/firebase.svg" },
];

const TechStack = () => {
  return (
    <section className="flex w-full flex-col gap-y-4 py-8">
      <div className="pad-x flex w-full flex-col gap-y-2">
        <h2 className="text-3xl font-semibold leading-tight">Stack/Tech</h2>
        <p className="max-w-xl text-muted-foreground">
          I&apos;m proficient in a range of modern technologies that empower me to
          build highly functional solutions. These are some of my main
          technologies.
        </p>
      </div>

      <div className="pad-x grid w-full grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {TechStackItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-x-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-background p-2 ring-1 ring-border">
              <Image
                src={item.icon}
                alt={item.name}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold leading-none track-tight">
                {item.name}
              </span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
