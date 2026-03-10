import { Link, useLocation } from "react-router-dom"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/checklist", label: "Accident Checklist" },
  { path: "/find-providers", label: "Find Help" },
  { path: "/state-guidance", label: "State Guidance" },
]

export function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white shadow-sm backdrop-blur-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="rounded-lg bg-primary p-2">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-slate-900">
            AccidentConnect
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "rounded-md px-4 py-2 text-base font-medium transition-colors",
                isActive(link.path)
                  ? "bg-primary/10 text-primary"
                  : "text-slate-700 hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button className="ml-4 text-base" size="sm">
            Emergency Help
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 md:hidden hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border py-4 md:hidden">
          <div className="flex flex-col gap-2 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-4 py-2 text-base font-medium transition-colors",
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button className="mx-4 mt-2 text-base" size="sm">
              Emergency Help
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
