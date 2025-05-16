"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Smile,
  Droplets,
  Wind,
  Utensils,
  Moon,
  Dumbbell,
  SpaceIcon as Yoga,
  Brain,
  Weight,
  Settings,
  Bell,
  Trophy,
  LucideUser,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isCollapsed: boolean
  toggleSidebar: () => void
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
}

export function Sidebar({ activeTab, setActiveTab, isCollapsed, toggleSidebar, user }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "mood", label: "Mood Tracker", icon: Smile },
    { id: "water", label: "Water Intake", icon: Droplets },
    { id: "breathing", label: "Breathing Exercise", icon: Wind },
    { id: "meals", label: "Meal Log", icon: Utensils },
    { id: "sleep", label: "Sleep Tracker", icon: Moon },
    { id: "fitness", label: "Fitness Routine", icon: Dumbbell },
    { id: "stretch", label: "Stretch Sequence", icon: Yoga },
    { id: "mental", label: "Mental Health", icon: Brain },
    { id: "weight", label: "Weight Tracker", icon: Weight },
    { id: "profile", label: "User Profile", icon: LucideUser },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "achievements", label: "Achievements", icon: Trophy },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b">
        {!isCollapsed && <h2 className="text-lg font-semibold">Vitality</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="space-y-4 py-4">
          <div className="px-3">
            <div className="mb-4 flex items-center justify-center">
              <Avatar className={cn("h-12 w-12", isCollapsed ? "mx-auto" : "mr-3")}>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold">{user?.name}</h2>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              )}
            </div>
          </div>

          <div className="px-3">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "relative mb-1 w-full justify-start",
                  isCollapsed ? "px-2" : "px-3",
                  hoveredItem === item.id && "shadow-sm",
                )}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
                {isCollapsed && hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-md bg-popover px-2 py-1 text-sm"
                  >
                    {item.label}
                  </motion.div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
