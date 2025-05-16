"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoodTracker } from "@/components/mood-tracker"
import { WaterTracker } from "@/components/water-tracker"
import { BreathingExercise } from "@/components/breathing-exercise"
import { MealLog } from "@/components/meal-log"
import { SleepTracker } from "@/components/sleep-tracker"
import { FitnessRoutine } from "@/components/fitness-routine"
import { StretchSequence } from "@/components/stretch-sequence"
import { MentalHealthJournal } from "@/components/mental-health-journal"
import { WeightTracker } from "@/components/weight-tracker"
import { HealthDashboard } from "@/components/health-dashboard"
import { UserProfile } from "@/components/user-profile"
import { Settings } from "@/components/settings"
import { Notifications } from "@/components/notifications"
import { Achievements } from "@/components/achievements"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Bell, Menu, Moon, Sun, User, Heart } from "lucide-react"

// Default user data for the dashboard
const defaultUser = {
  id: "default",
  name: "Guest User",
  email: "guest@example.com",
  avatar: "/placeholder.svg?height=100&width=100"
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show welcome toast on first load
  useEffect(() => {
    if (mounted) {
      toast({
        title: "Welcome to Vitality!",
        description: "Your health dashboard is ready.",
      })
    }
  }, [mounted, toast])

  // Add a loading animation
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // Return loading screen if still loading
  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-background flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center justify-center mb-6"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <Heart className="h-16 w-16 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Vitality</h1>
            <p className="text-muted-foreground">Loading your health dashboard...</p>
            <motion.div className="mt-6 w-48 h-1 bg-muted mx-auto overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-background">
        {/* Mobile Navigation */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "fixed top-4 left-4 z-50 rounded-full bg-primary text-primary-foreground shadow-lg p-3 md:hidden",
            isMobileNavOpen ? "opacity-0" : "opacity-100",
          )}
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </motion.button>

        <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <div className="flex h-14 items-center px-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex-1 flex justify-center">
              <h1 className="text-xl font-semibold">Vitality</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileNavOpen && (
            <MobileNav
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab)
                setIsMobileNavOpen(false)
              }}
              onClose={() => setIsMobileNavOpen(false)}
              user={defaultUser}
            />
          )}
        </AnimatePresence>

        <div className="flex">
          {/* Sidebar for desktop */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
            user={defaultUser}
          />

          {/* Main Content */}
          <main
            className={cn(
              "flex-1 transition-all duration-300 ease-in-out",
              isSidebarCollapsed ? "md:ml-[70px]" : "md:ml-[240px]",
            )}
          >
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">
              {/* Header */}
              <header className="hidden md:flex items-center justify-between py-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {activeTab === "dashboard" && "Dashboard"}
                    {activeTab === "mood" && "Mood Tracker"}
                    {activeTab === "water" && "Water Intake"}
                    {activeTab === "breathing" && "Breathing Exercise"}
                    {activeTab === "meals" && "Meal Log"}
                    {activeTab === "sleep" && "Sleep Tracker"}
                    {activeTab === "fitness" && "Fitness Routine"}
                    {activeTab === "stretch" && "Stretch Sequence"}
                    {activeTab === "mental" && "Mental Health"}
                    {activeTab === "weight" && "Weight Tracker"}
                    {activeTab === "profile" && "User Profile"}
                    {activeTab === "settings" && "Settings"}
                    {activeTab === "notifications" && "Notifications"}
                    {activeTab === "achievements" && "Achievements"}
                  </h1>
                  <p className="text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    <span className="relative">
                      Notifications
                      <span className="absolute -top-1 -right-4 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[10px] text-primary-foreground justify-center items-center">
                          3
                        </span>
                      </span>
                    </span>
                  </Button>
                  <Button variant="outline" size="sm" className="hidden md:flex" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="hidden md:flex"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </header>

              {/* Content */}
              <div className="mt-4 md:mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.3,
                    }}
                  >
                    {activeTab === "dashboard" && <HealthDashboard user={defaultUser} />}
                    {activeTab === "mood" && <MoodTracker />}
                    {activeTab === "water" && <WaterTracker />}
                    {activeTab === "breathing" && <BreathingExercise />}
                    {activeTab === "meals" && <MealLog />}
                    {activeTab === "sleep" && <SleepTracker />}
                    {activeTab === "fitness" && <FitnessRoutine />}
                    {activeTab === "stretch" && <StretchSequence />}
                    {activeTab === "mental" && <MentalHealthJournal />}
                    {activeTab === "weight" && <WeightTracker />}
                    {activeTab === "profile" && <UserProfile user={defaultUser} />}
                    {activeTab === "settings" && <Settings />}
                    {activeTab === "notifications" && <Notifications />}
                    {activeTab === "achievements" && <Achievements />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <footer className="mt-12 border-t pt-6 pb-8 text-center text-sm text-muted-foreground">
                <p>© 2025 Vitality Health Tracker. All rights reserved.</p>
                <div className="mt-2 flex justify-center space-x-4">
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
