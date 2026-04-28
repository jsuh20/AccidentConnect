import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import type { ComponentProps } from "react"

type LinkProps = Omit<ComponentProps<typeof Link>, "to" | "className" | "children">

interface ButtonLinkProps extends LinkProps {
  to: string
  variant?: "default" | "outline" | "hero" | "heroOutline"
  size?: "default" | "sm" | "lg"
  className?: string
  children: ComponentProps<"a">["children"]
}

export function ButtonLink({
  to,
  variant = "default",
  size = "default",
  className,
  children,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ variant, size }), className)}
      {...linkProps}
    >
      {children}
    </Link>
  )
}
