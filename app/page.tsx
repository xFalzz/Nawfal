import {
  BriefcaseBusiness,
  Contact as ContactIco,
  House,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/app/_components/ui/Navbar";
import HeroSection from "@/app/_components/HeroSection";
import Skills from "@/app/_components/Skills";
import ProjectsSection from "@/app/_components/ProjectsSection";
import Footer from "@/app/_components/Footer";
import ScrollIndicator from "@/app/_components/ui/ScrollIndicator";

const navItems = [
  { name: "Home", link: "#home", icon: <House /> },
  { name: "About", link: "#about", icon: <UserRound /> },
  { name: "Project", link: "#work", icon: <BriefcaseBusiness /> },
  { name: "Contact", link: "#contact", icon: <ContactIco /> },
];

const Homepage = () => {
  return (
    <main className="flex flex-col px-5 sm:px-10 relative">
      {/* Tambahkan ScrollIndicator */}
      <ScrollIndicator />
      <div className="max-w-7xl mx-auto w-full">
        <Navbar navItems={navItems} />
        <HeroSection />
        <Skills />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  );
};

export default Homepage;
