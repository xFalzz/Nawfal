import Link from "next/link";

// Components
import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import SubLinks from "@/components/macro/sub-links";
import Shine from "@/components/macro/shine";
import ProfileHeader from "@/components/macro/profile-header";

export default function Page() {
  return (
    <>
      <section
        id="home"
        className="flex h-full w-full flex-col pt-4 md:grow md:pt-8 lg:pt-12"
      >
        <ProfileHeader />
        <div className="pad-x relative w-full">
          <h1 className="text-balance text-left text-3xl font-semibold leading-[1.1] tracking-tight xs:text-4xl md:w-[60%] lg:text-5xl">
            Software Engineer
            <br />
            UI/UX Designer
          </h1>

          <div className="pad-r absolute bottom-0 right-0 hidden flex-col items-end gap-y-2 sm:flex">
            <code className="justify-end gap-x-2 text-xs text-muted-foreground">
              Theme{" "}
              <kbd className="pointer-events-none inline-flex h-fit select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>M
              </kbd>
            </code>
            <code className="justify-end gap-x-2 text-xs text-muted-foreground">
              Command{" "}
              <kbd className="pointer-events-none inline-flex h-fit select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>F
              </kbd>
            </code>
          </div>
        </div>

        <SubLinks />

        <div className="pad-x flex w-full flex-col justify-center py-4 md:grow md:py-8 lg:py-12">
          <div className="grid grid-cols-1 items-end gap-x-6 md:grid-cols-2">
            <div className="flex flex-col justify-between">
              <Shine className="anim mb-2 inline-flex w-fit items-center justify-center py-1">
                <span>✨ I&apos;m open for work</span>
              </Shine>
              <h2 className="mb-3 w-full max-w-lg text-balance text-xl font-semibold text-foreground md:mb-4 md:text-2xl lg:text-3xl">
                I create intuitive, visually stunning and highly functional Web.
              </h2>
              <p className="text-balance text-base text-muted-foreground md:max-w-sm md:text-lg lg:max-w-lg">
                Ciao, I&apos;m{" "}
                <span className="font-medium text-foreground">Nawfal</span>. I
                design and build digital products, focusing on web design, web
                development, and product management. Feel free to surf around 👋
              </p>

              <h2 className="mt-8 text-sm font-semibold uppercase text-foreground md:text-base">
                Featured Projects
              </h2>
            </div>

            {/* Test */}
            <Accordion
              className="h-fit w-full md:ml-auto md:max-w-md lg:max-w-lg"
              type="single"
              collapsible
            >
              <AccordionItem value="item-0">
                <AccordionTrigger>Hijara - AI Sustainability 🌿</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-muted-foreground">
                    AI-Powered Sustainability Platform built for Google{" "}
                    <span className="text-foreground">#JuaraVibeCoding</span>. Integrates{" "}
                    <span className="text-foreground">Gemini Vision</span> for waste classification,{" "}
                    energy monitoring, and recycling tracking. Fully serverless on{" "}
                    <span className="text-foreground">Google Cloud Run</span>.
                  </p>
                  <div className="flex items-center justify-between gap-x-4">
                    <Badge
                      variant="secondary"
                      className="relative flex w-fit items-center gap-x-2 rounded-full"
                    >
                      <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                      <div className="absolute left-2.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </Badge>
                    <Link
                      href="https://hijara-juaravibecoding.vercel.app"
                      target="_blank"
                      className="rounded-sm border bg-popover px-2 text-popover-foreground"
                    >
                      <code className="text-xs font-medium md:text-sm">
                        Visit Project
                      </code>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger>KURA - Game Discovery</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-muted-foreground">
                    A scalable game discovery platform with 897,000+ games. Built with{" "}
                    <span className="text-foreground">Next.js</span>,{" "}
                    <span className="text-foreground">TypeScript</span>,{" "}
                    <span className="text-foreground">Firebase</span>, and{" "}
                    <span className="text-foreground">RAWG API</span>. Features trending systems, community, and dynamic content exploration.
                  </p>
                  <div className="flex items-center justify-between gap-x-4">
                    <Badge
                      variant="secondary"
                      className="relative flex w-fit items-center gap-x-2 rounded-full"
                    >
                      <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                      <div className="absolute left-2.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </Badge>
                    <Link
                      href="https://kuraa.vercel.app"
                      target="_blank"
                      className="rounded-sm border bg-popover px-2 text-popover-foreground"
                    >
                      <code className="text-xs font-medium md:text-sm">
                        Visit Project
                      </code>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>MacOS Clone</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-muted-foreground">
                    A highly detailed MacOS desktop clone built with{" "}
                    <span className="text-foreground">Next.js</span>,{" "}
                    <span className="text-foreground">TypeScript</span>, and{" "}
                    <span className="text-foreground">Tailwind CSS</span>. Features a functional dock, menu bar, and window system.
                  </p>
                  <div className="flex items-center justify-between gap-x-4">
                    <Badge
                      variant="secondary"
                      className="relative flex w-fit items-center gap-x-2 rounded-full"
                    >
                      <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                      <div className="absolute left-2.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </Badge>
                    <Link
                      href="https://github.com/xFalzz/MacOS-clone"
                      target="_blank"
                      className="rounded-sm border bg-popover px-2 text-popover-foreground"
                    >
                      <code className="text-xs font-medium md:text-sm">
                        Visit Project
                      </code>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>QRQuick</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-muted-foreground">
                    A functional QR code generator focusing on utility and simplicity. Built with{" "}
                    <span className="text-foreground">TypeScript</span>,{" "}
                    <span className="text-foreground">Next.js</span>, and{" "}
                    <span className="text-foreground">Prisma</span>.
                  </p>
                  <div className="flex items-center justify-between gap-x-4">
                    <Badge
                      variant="secondary"
                      className="relative flex w-fit items-center gap-x-2 rounded-full"
                    >
                      <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                      <div className="absolute left-2.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </Badge>
                    <Link
                      href="https://qrquicks.vercel.app/"
                      target="_blank"
                      className="rounded-sm border bg-popover px-2 text-popover-foreground"
                    >
                      <code className="text-xs font-medium md:text-sm">
                        Visit Project
                      </code>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Particle Flow Squash</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-muted-foreground">
                    An interactive particle game using the{" "}
                    <span className="text-foreground">Canvas API</span>,{" "}
                    <span className="text-foreground">React</span>, and{" "}
                    <span className="text-foreground">TypeScript</span>. Experience smooth animations and physics-based interactions.
                  </p>
                  <div className="flex items-center justify-between gap-x-4">
                    <Badge
                      variant="secondary"
                      className="relative flex w-fit items-center gap-x-2 rounded-full"
                    >
                      <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                      <div className="absolute left-2.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </Badge>
                    <Link
                      href="https://particleflowsquash.vercel.app/"
                      target="_blank"
                      className="rounded-sm border bg-popover px-2 text-popover-foreground"
                    >
                      <code className="text-xs font-medium md:text-sm">
                        Visit Project
                      </code>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
