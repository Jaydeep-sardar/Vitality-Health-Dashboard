"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
}

export function MobileNav({ activeTab, setActiveTab, onClose, user }: MobileNavProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "mood", label: "Mood Tracker" },
    { id: "water", label: "Water Intake" },
    { id: "breathing", label: "Breathing Exercise" },
    { id: "meals", label: "Meal Log" },
    { id: "sleep", label: "Sleep Tracker" },
    { id: "fitness", label: "Fitness Routine" },
    { id: "stretch", label: "Stretch Sequence" },
    { id: "mental", label: "Mental Health" },
    { id: "weight", label: "Weight Tracker" },
    { id: "profile", label: "User Profile" },
    { id: "settings", label: "Settings" },
    { id: "notifications", label: "Notifications" },
    { id: "achievements", label: "Achievements" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed left-0 top-0 bottom-0 w-screen max-w-xs bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="space-y-4 py-4">
            <div className="px-3">
              <div className="mb-4 flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold">{user?.name}</h2>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="px-3">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="relative mb-1 w-full justify-start"
                  onClick={() => {
                    setActiveTab(item.id)
                  }}
                >
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  )
}
