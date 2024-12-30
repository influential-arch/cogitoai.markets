import React from "react"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { type SidebarProviderProps, type SidebarState } from "./types"
import { SidebarContext } from "./SidebarContext"
import { useMediaQuery } from "@/hooks/use-media-query"

const SIDEBAR_WIDTH = "240px"
const SIDEBAR_WIDTH_ICON = "80px"

export function SidebarProvider({
  children,
  defaultOpen = true,
  defaultOpenMobile = false,
  onOpenChange,
  onOpenMobileChange,
}: SidebarProviderProps) {
  const [state, setState] = React.useState<SidebarState>({
    open: defaultOpen,
    openMobile: defaultOpenMobile,
  })

  const isMobile = useMediaQuery("(max-width: 768px)")
  const open = state.open
  const openMobile = state.openMobile

  const setOpen = React.useCallback(
    (open: boolean) => {
      setState((prev) => ({ ...prev, open }))
      onOpenChange?.(open)
    },
    [onOpenChange]
  )

  const setOpenMobile = React.useCallback(
    (openMobile: boolean) => {
      setState((prev) => ({ ...prev, openMobile }))
      onOpenMobileChange?.(openMobile)
    },
    [onOpenMobileChange]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, openMobile, setOpen, setOpenMobile])

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  const SidebarWrapper = ({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <SidebarWrapper />
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}