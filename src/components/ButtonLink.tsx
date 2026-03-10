import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

interface ButtonLinkProps {
  to: string
  variant?: "default" | "outline" | "hero" | "heroOutline"
  size?: "default" | "sm" | "lg"
  className?: string
  children: React.ReactNode
}

export function ButtonLink({
  to,
  variant = "default",
  size = "default",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  )
}
