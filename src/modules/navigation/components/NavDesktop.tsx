import { MAIN_NAV } from "../config/routes";
import { NavDropdown } from "./NavDropdown";
import { NavItemLink } from "./NavItemLink";

/** Navegación horizontal (lg en adelante). */
export function NavDesktop() {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {MAIN_NAV.map((item) =>
        item.tipo === "dropdown" ? (
          <NavDropdown key={item.label} item={item} />
        ) : (
          <NavItemLink
            key={item.label}
            item={item}
            className="px-4 py-2 text-sm text-white/80 hover:text-accent transition-colors duration-200 tracking-wide"
          />
        )
      )}
    </nav>
  );
}
