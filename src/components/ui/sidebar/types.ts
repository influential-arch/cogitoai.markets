import { type DialogProps } from "@radix-ui/react-dialog"
import { type TooltipProps } from "@radix-ui/react-tooltip"
import React from "react"

export type SidebarState = {
  open: boolean
  openMobile: boolean
}

export type SidebarProviderProps = {
  children: React.ReactNode
  defaultOpen?: boolean
  defaultOpenMobile?: boolean
  onOpenChange?: (open: boolean) => void
  onOpenMobileChange?: (open: boolean) => void
}

export type SidebarContextValue = {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  toggleSidebar: () => void
}

export type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "inset"
}

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>

export type SidebarNavProps = React.HTMLAttributes<HTMLDivElement>

export type SidebarNavItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean
  disabled?: boolean
  external?: boolean
  icon?: React.ReactNode
  label?: string
  showDot?: boolean
  showArrow?: boolean
  showBadge?: boolean
  badgeContent?: React.ReactNode
}

export type SidebarTriggerProps = DialogProps & {
  tooltipProps?: Omit<TooltipProps, "children">
}

export type SidebarSeparatorProps = React.HTMLAttributes<HTMLDivElement>