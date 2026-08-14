import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { TbBrandTwitter, TbBrandInstagram, TbBrandYoutube } from "react-icons/tb";

// Assets
import BTKP from "@/public/images/logos/BTKP.jpeg";
import UBSI from "@/public/images/logos/UBSI.jpeg";
import Avatar from "@/public/images/avatar-cloud.png";
import MicrosoftLogo from "@/public/images/logos/microsoft.svg";

// Components
import { Button } from "@/components/ui/button";

// Constants
import { Inspiration } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Nawfal Irfan Ramadhan — Fullstack Software Engineer",
  description:
    "Learn more about Nawfal Irfan Ramadhan, a Fullstack Software Engineer and AI Systems Architect based in Yogyakarta, Indonesia. Information Systems student at Universitas Bina Sarana Informatika, certified in Microsoft AI, Google Cloud, and Creator of Nawfal UI Kit.",
  keywords: [
    "About Nawfal Irfan Ramadhan",
    "Nawfal Irfan Ramadhan Biography",
    "Nawfal Fullstack Developer",
    "Nawfal Irfan Background",
    "Universitas Bina Sarana Informatika Nawfal",
    "BTKP DIY Nawfal"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Nawfal Irfan Ramadhan — Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer and AI Systems Architect based in Yogyakarta. Information Systems student at UBSI, certified in Microsoft AI and Google Cloud.",
    url: "https://nawfal.vercel.app/about",
  },
};

const Page = () => {
  return (
    <section id="about" className="flex h-full w-full grow flex-col">
      <div className="pad-x flex w-full flex-col items-start gap-x-8 gap-y-6 py-4 md:flex-row md:py-8 lg:py-12">
        <h1 className="w-full text-balance text-3xl font-medium leading-tight sm:text-left md:w-1/2 lg:text-4xl">
          Software Engineer building modern fullstack web applications and AI-driven solutions.
        </h1>
        <div className="flex w-full flex-col gap-y-4 text-muted-foreground md:w-1/2">
          <p>
            <span className="font-medium text-foreground">Nawfal</span> is a{" "}
            <span className="font-medium text-foreground">
              Software Engineer
            </span>{" "}
            focused on{" "}
            <span className="font-medium text-foreground">
              Web Development and AI-driven applications
            </span>
            , combining a multimedia background with modern engineering practices to build scalable, high-performance web applications.
          </p>
          <p>
            Currently expanding from Front-End into{" "}
            <span className="font-medium text-foreground">Full-Stack architecture</span>.
            I don&apos;t just write code, I build products.
          </p>
          <p className="text-sm">
            <span className="font-medium text-foreground">Tech Stack:</span> Next.js, React, TypeScript, Tailwind CSS, Node.js, Firebase, AWS Cloud.
          </p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-border" />
      <div className="flex h-full w-full grow flex-col md:flex-row">
        <div className="pad-x flex h-auto w-full flex-col justify-center gap-y-4 border-b py-4 md:w-fit md:border-b-0 md:border-r md:py-8 lg:py-12">
          <h2 className="mb-2 text-balance text-left text-2xl font-semibold lg:mb-4">
            Experience
          </h2>
          {/* Fiverr */}
          <div className="flex items-center gap-x-4">
            <div className="anim flex h-14 w-14 items-center justify-center rounded-md border border-border bg-popover p-2">
              <div className="flex h-full w-full items-center justify-center rounded bg-gradient-to-br from-green-500 to-teal-600 text-white font-bold text-sm">
                Fivr
              </div>
            </div>
            <div className="flex w-fit flex-col">
              <h3 className="text-balance text-base font-medium lg:text-lg">
                Fiverr
              </h3>
              <p className="text-xs text-muted-foreground md:text-sm">
                Freelance Web Developer · Remote
              </p>
              <p className="text-xs text-muted-foreground">
                Nov 2025 - Present
              </p>
            </div>
          </div>
          {/* Microsoft METC */}
          <div className="flex items-center gap-x-4">
            <div className="anim flex h-14 w-14 items-center justify-center rounded-md border border-border bg-popover p-2">
              <Image src={MicrosoftLogo} alt="Microsoft" className="h-auto w-full rounded" />
            </div>
            <div className="flex w-fit flex-col">
              <h3 className="text-balance text-base font-medium lg:text-lg">
                Microsoft Elevate Training Center
              </h3>
              <p className="text-xs text-muted-foreground md:text-sm">
                AI Training · Apprenticeship · Remote
              </p>
              <p className="text-xs text-muted-foreground">
                Oct 2025 - Mar 2026 · 6 mos
              </p>
            </div>
          </div>
          {/* BTKP */}
          <div className="flex items-center gap-x-4">
            <div className="anim flex h-14 w-14 items-center justify-center rounded-md border border-border bg-popover p-2">
              <Image src={BTKP} alt="BTKP" className="h-auto w-full rounded" />
            </div>
            <div className="flex w-fit flex-col">
              <h3 className="text-balance text-base font-medium lg:text-lg">
                Balai Teknologi Komunikasi Pendidikan DIY
              </h3>
              <p className="text-xs text-muted-foreground md:text-sm">
                Multimedia Intern · On-site
              </p>
              <p className="text-xs text-muted-foreground">
                Mar 2024 - Aug 2024 · 6 mos
              </p>
            </div>
          </div>
          {/* Kopvie */}
          <div className="flex items-center gap-x-4">
            <div className="anim flex h-14 w-14 items-center justify-center rounded-md border border-border bg-popover p-2">
              <div className="flex h-full w-full items-center justify-center rounded bg-gradient-to-br from-red-500 to-orange-600 text-white font-bold text-lg">
                KF
              </div>
            </div>
            <div className="flex w-fit flex-col">
              <h3 className="text-balance text-base font-medium lg:text-lg">
                Kopvie - Film Community
              </h3>
              <p className="text-xs text-muted-foreground md:text-sm">
                Video Editor & Second Cameraman · Hybrid
              </p>
              <p className="text-xs text-muted-foreground">
                Sep 2023 - Jun 2024 · 10 mos
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-border my-2" />
          <h2 className="text-balance text-left text-2xl font-semibold">
            Education
          </h2>
          {/* UBSI */}
          <div className="flex items-center gap-x-4">
            <div className="anim flex h-14 w-14 items-center justify-center rounded-md border border-border bg-popover p-2">
              <Image src={UBSI} alt="UBSI" className="h-auto w-full rounded" />
            </div>
            <div className="flex w-fit flex-col">
              <h3 className="text-balance text-base font-medium lg:text-lg">
                Universitas Bina Sarana Informatika
              </h3>
              <p className="text-xs text-muted-foreground md:text-sm">
                Bachelor of Science, Information Systems
              </p>
              <p className="text-xs text-muted-foreground">
                2025 - 2029 · GPA 3.78
              </p>
            </div>
          </div>
          {/* SMK Negeri 2 Sewon */}
          <div className="flex items-center gap-x-4">
            <div className="anim flex h-14 w-14 items-center justify-center rounded-md border border-border bg-popover p-2">
              <div className="flex h-full w-full items-center justify-center rounded bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs text-center leading-tight">
                SMK
              </div>
            </div>
            <div className="flex w-fit flex-col">
              <h3 className="text-balance text-base font-medium lg:text-lg">
                SMK Negeri 2 Sewon
              </h3>
              <p className="text-xs text-muted-foreground md:text-sm">
                Multimedia
              </p>
              <p className="text-xs text-muted-foreground">
                Jul 2022 - May 2025
              </p>
            </div>
          </div>

          <Button
            asChild
            className="mt-2 bg-popover lg:mt-4"
            variant={"outline"}
          >
            <Link
              href={"https://www.linkedin.com/in/nawfal-irfan/"}
              target={"_blank"}
            >
              See My LinkedIn
            </Link>
          </Button>
        </div>
        <div className="pad-x flex h-auto w-auto grow flex-col justify-center gap-y-4 self-stretch pb-5 pt-4 md:items-center md:py-8 lg:py-12">
          <h2 className="w-full text-balance text-left text-2xl font-semibold md:max-w-lg">
            Inspiration
          </h2>
          <div className="flex w-full flex-col gap-y-4 md:max-w-lg">
            <p className="text-sm text-muted-foreground">
              Inspirations can come from anywhere. These people shaped my
              journey and I am grateful for that, not only programming-wise but
              also life-wise.
            </p>
            <div className="flex w-full flex-wrap items-center gap-2">
              {Inspiration.map((inspo, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-2 rounded-sm border bg-popover px-2 py-0.5 text-popover-foreground"
                >
                  <span className="text-xs font-medium md:text-sm">
                    {inspo.name}
                  </span>
                  <div className="flex items-center gap-x-1.5 border-l border-border/50 pl-2">
                    {inspo.twitter && (
                      <Link
                        href={`https://twitter.com/${inspo.twitter}`}
                        target="_blank"
                      >
                        <TbBrandTwitter
                          size={14}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        />
                      </Link>
                    )}
                    {inspo.youtube && (
                      <Link
                        href={`https://youtube.com/${inspo.youtube}`}
                        target="_blank"
                      >
                        <TbBrandYoutube
                          size={14}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        />
                      </Link>
                    )}
                    {inspo.instagram && (
                      <Link
                        href={`https://instagram.com/${inspo.instagram}`}
                        target="_blank"
                      >
                        <TbBrandInstagram
                          size={14}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              <div className="rounded-sm bg-transparent px-1 py-0.5 text-popover-foreground">
                <code className="text-xs font-medium md:text-sm">...</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
