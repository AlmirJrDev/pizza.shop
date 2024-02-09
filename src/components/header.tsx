import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="w-6 h-6"/>

        <Separator orientation="vertical" className="h-6"/>

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4"/>
            Inicio
          </NavLink>
          <NavLink to="/ordens">
            <UtensilsCrossed className="h-4 w-4"/>
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle/>
        </div>
      </div>
    </div>
  )
}