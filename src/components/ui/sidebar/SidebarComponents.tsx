import React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ExternalLink } from "lucide-react"
import { useSidebar } from "./SidebarContext"
import {
  type SidebarProps,
  type SidebarHeaderProps,
  type SidebarNavProps,
  type SidebarNavItemProps,
  type SidebarSeparatorProps,
} from "./types"

export function Sidebar({
  className,
  variant = "default",
  ...props
}: SidebarProps) {
  const { open, isMobile, openMobile } = useSidebar()

  return (
    <aside
      data-variant={variant}
      className={cn(
        "group/sidebar relative z-30 h-full w-[--sidebar-width] shrink-0 transition-all duration-300",
        isMobile ? "absolute inset-y-0 left-0" : "relative",
        !isMobile && !open && "w-[--sidebar-width-icon]",
        !isMobile && variant === "inset" && "!absolute",
        isMobile && !openMobile && "!w-0",
        className
      )}
      {...props}
    />
  )
}

export function SidebarHeader({
  className,
  children,
  ...props
}: SidebarHeaderProps) {
  const { open, isMobile, openMobile } = useSidebar()

  return (
    <header
      className={cn(
        "flex h-[60px] items-center gap-4 px-4",
        !isMobile && !open && "justify-center px-2",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export function SidebarNav({
  className,
  children,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn("flex flex-col gap-1 p-2", className)}
      {...props}
    >
      {children}
    </nav>
  )
}

export function SidebarNavItem({
  className,
  children,
  active,
  disabled,
  external,
  icon,
  label,
  showDot,
  showArrow,
  showBadge,
  badgeContent,
  ...props
}: SidebarNavItemProps) {
  const { open, isMobile } = useSidebar()

  return (
    <a
      className={cn(
        "group/navitem relative flex h-10 w-full items-center gap-4 rounded-md px-4 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        !isMobile && !open && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0">
          {icon}
        </span>
      )}
      {(!isMobile || open) && (
        <>
          <span className="flex-1 truncate">
            {label}
            {children}
          </span>
          {showDot && (
            <span className="h-2 w-2 rounded-full bg-primary" />
          )}
          {showArrow && (
            <ChevronRight className="h-4 w-4" />
          )}
          {external && (
            <ExternalLink className="h-4 w-4" />
          )}
          {showBadge && badgeContent}
        </>
      )}
    </a>
  )
}

export function SidebarSeparator({
  className,
  ...props
}: SidebarSeparatorProps) {
  return (
    <div
      className={cn("mx-2 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}