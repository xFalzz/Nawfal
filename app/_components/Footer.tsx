import Link from "next/link";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import ShinyButton from "./ui/ShinyButton";

const Footer = () => {
  return (
    <div
      className="flex flex-col justify-center antialiased relative border border-dark-300 rounded-xl mb-5"
      id="contact"
    >
      <div>
        <div className="space-y-8 p-10">
          <h1 className="text-5xl font-bold max-w-2xl leading-[110%] relative z-10">
            Any discuss or collaborate?{" "}
            <Link
              href="mailto:nawfalirfan005@gmail.com"
              className="text-primary hover:text-primary/80 border-b-2 border-primary hover:border-primary/80 transition-colors duration-200"
            >
              Contact
            </Link>{" "}
            me here!
          </h1>

          <ShinyButton>
            <Link href="mailto:nawfalirfan005@gmail.com">Email</Link>
          </ShinyButton>
        </div>

        <div className="mt-16 p-10 border-t border-dark-200 dark:border-white/10 flex flex-col md:flex-row justify-between gap-10 md:gap-0">
          <div className="space-y-2.5">
            <h3 className="text-xl font-bold relative z-10">
              Nawfal Irfan
            </h3>
            <p className="text-dark-200/70 dark:text-stone-200/70 relative z-10">
              &copy; 2024 | All rights reserved.
            </p>
          </div>

          <div className="flex justify-between gap-0 sm:gap-16">
            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-base sm:text-lg font-semibold">Navigate</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="/">Home</Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="#work">Project</Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="#about">About</Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="#contact">Contact</Link>
              </li>
            </ul>

            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-lg font-semibold">Projects</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link
                  href="https://github.com/xFalzz/"
                  target="_blank"
                >
                  Dusevoscho-MM2
                </Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link
                  href="https://github.com/xFalzz/"
                  target="_blank"
                >
                  Snake's
                </Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link
                  href="https://github.com/xFalzz/QRQuick"
                  target="_blank"
                >
                  QRQuick
                </Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link
                  href="#"
                  target="_blank"
                >
                  MoveiHub
                </Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link
                  href="#"
                  target="_blank"
                >
                  SpotToSee
                </Link>
              </li>
            </ul>

            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-lg font-semibold">Socials</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link
                  href="https://www.linkedin.com/in/nawfal-irfan/"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="https://github.com/xFalzz" target="_blank">
                  Github
                </Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="https://instagram.com/nawfaljr__">Instagram</Link>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <Link href="https://discord.gg/v6dgnKCpuM">Discord</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <BackgroundBeams className="hidden sm:flex" />
    </div>
  );
};

export default Footer;
