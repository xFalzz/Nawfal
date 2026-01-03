// Import Assets
import { StatusWidget } from "./status-widget";
import NavLink from "./nav-link";
import NavDrop from "./nav-drop";

// Data
import { NavItems } from "@/lib/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="pad-x sticky top-0 z-40 flex w-full items-center justify-between border-b bg-background py-4">
      <Link href="/" className="flex items-center">
        <StatusWidget />
      </Link>

      {/* Nav Items */}
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-x-8">
          {NavItems.map((item, index) => (
            <li key={index} className="hidden sm:block">
              <NavLink href={item.href} name={item.name} />
            </li>
          ))}
          <li className="flex items-center">
            <NavDrop />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
