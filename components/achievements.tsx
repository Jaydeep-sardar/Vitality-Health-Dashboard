"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Calendar,
  Clock,
  Droplets,
  Dumbbell,
  Flame,
  Heart,
  Medal,
  Moon,
  Share2,
  Trophy,
  Zap,
} from "lucide-react"

type Achievement = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: "fitness" | "nutrition" | "sleep" | "water" | "streak" | "milestone"
  progress: number
  total: number
  completed: boolean
  date?: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      name: "First Steps",
      description: "Complete your first workout",
      icon: <Dumbbell className="h-6 w-6" />,
      category: "fitness",
      progress: 1,
      total: 1,
      completed: true,
      date: "Jan 15, 2023",
      rarity: "common",
    },
    {
      id: "2",
      name: "Hydration Hero",
      description: "Reach your water goal for 7 consecutive days",
      icon: <Droplets className="h-6 w-6" />,
      category: "water",
      progress: 7,
      total: 7,
      completed: true,
      date: "Feb 3, 2023",
      rarity: "uncommon",
    },
    {
      id: "3",
      name: "Early Bird",
      description: "Log activity before 7 AM for 5 days",
      icon: <Calendar className="h-6 w-6" />,
      category: "streak",
      progress: 5,
      total: 5,
      completed: true,
      date: "Mar 12, 2023",
      rarity: "uncommon",
    },
    {
      id: "4",
      name: "Dream Weaver",
      description: "Track your sleep for 30 consecutive days",
      icon: <Moon className="h-6 w-6" />,
      category: "sleep",
      progress: 23,
      total: 30,
      completed: false,
      rarity: "rare",
    },
    {
      id: "5",
      name: "Marathon Runner",
      description: "Log 100 miles of running",
      icon: <Zap className="h-6 w-6" />,
      category: "fitness",
      progress: 68,
      total: 100,
      completed: false,
      rarity: "epic",
    },
    {
      id: "6",
      name: "Consistency King",
      description: "Log health data every day for 30 days",
      icon: <Flame className="h-6 w-6" />,
      category: "streak",
      progress: 30,
      total: 30,
      completed: true,
      date: "Apr 5, 2023",
      rarity: "rare",
    },
    {
      id: "7",
      name: "Weight Goal Achieved",
      description: "Reach your target weight goal",
      icon: <Award className="h-6 w-6" />,
      category: "milestone",
      progress: 1,
      total: 1,
      completed: true,
      date: "May 20, 2023",
      rarity: "epic",
    },
    {
      id: "8",
      name: "Meditation Master",
      description: "Complete 50 meditation sessions",
      icon: <Heart className="h-6 w-6" />,
      category: "milestone",
      progress: 32,
      total: 50,
      completed: false,
      rarity: "rare",
    },
    {
      id: "9",
      name: "Iron Will",
      description: "Complete 100 workouts",
      icon: <Dumbbell className="h-6 w-6" />,
      category: "fitness",
      progress: 87,
      total: 100,
      completed: false,
      rarity: "epic",
    },
    {
      id: "10",
      name: "Century Club",
      description: "Log health data for 100 consecutive days",
      icon: <Trophy className="h-6 w-6" />,
      category: "streak",
      progress: 42,
      total: 100,
      completed: false,
      rarity: "legendary",
    },
  ])

  const completedAchievements = achievements.filter((achievement) => achievement.completed)
  const inProgressAchievements = achievements.filter((achievement) => !achievement.completed)

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "uncommon":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }
  }

  const getCategoryIcon = (category: Achievement["category"]) => {
    switch (category) {
      case "fitness":
        return <Dumbbell className="h-4 w-4" />
      case "nutrition":
        return <Flame className="h-4 w-4" />
      case "sleep":
        return <Moon className="h-4 w-4" />
      case "water":
        return <Droplets className="h-4 w-4" />
      case "streak":
        return <Calendar className="h-4 w-4" />
      case "milestone":
        return <Trophy className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Track your progress and earn rewards</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-medium">{completedAchievements.length}</span>
                <span className="text-muted-foreground">/{achievements.length} Unlocked</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    rarityColor={getRarityColor(achievement.rarity)}
                    categoryIcon={getCategoryIcon(achievement.category)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              {completedAchievements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No achievements completed yet</h3>
                  <p className="text-muted-foreground">Keep going to earn your first achievement!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      rarityColor={getRarityColor(achievement.rarity)}
                      categoryIcon={getCategoryIcon(achievement.category)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="in-progress" className="mt-6">
              {inProgressAchievements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Medal className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">All achievements completed!</h3>
                  <p className="text-muted-foreground">Congratulations on completing all achievements!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inProgressAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      rarityColor={getRarityColor(achievement.rarity)}
                      categoryIcon={getCategoryIcon(achievement.category)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="categories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Fitness",
                    icon: <Dumbbell className="h-5 w-5" />,
                    category: "fitness" as const,
                    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                  },
                  {
                    name: "Nutrition",
                    icon: <Flame className="h-5 w-5" />,
                    category: "nutrition" as const,
                    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                  },
                  {
                    name: "Sleep",
                    icon: <Moon className="h-5 w-5" />,
                    category: "sleep" as const,
                    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                  },
                  {
                    name: "Water",
                    icon: <Droplets className="h-5 w-5" />,
                    category: "water" as const,
                    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                  },
                  {
                    name: "Streaks",
                    icon: <Calendar className="h-5 w-5" />,
                    category: "streak" as const,
                    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                  },
                  {
                    name: "Milestones",
                    icon: <Trophy className="h-5 w-5" />,
                    category: "milestone" as const,
                    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                  },
                ].map((category) => {
                  const categoryAchievements = achievements.filter((a) => a.category === category.category)
                  const completed = categoryAchievements.filter((a) => a.completed).length
                  const total = categoryAchievements.length
                  const progress = Math.round((completed / total) * 100)

                  return (
                    <Card key={category.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${category.color}`}>{category.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <CardDescription>
                              {completed} of {total} achievements
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress value={progress} className="h-2" />
                          <div className="space-y-2">
                            {categoryAchievements.map((achievement) => (
                              <div
                                key={achievement.id}
                                className={`flex items-center justify-between p-2 rounded-md ${
                                  achievement.completed ? "bg-muted" : ""
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                      achievement.completed
                                        ? "bg-primary/20 text-primary"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    {achievement.icon}
                                  </div>
                                  <span
                                    className={`text-sm ${
                                      achievement.completed ? "font-medium" : "text-muted-foreground"
                                    }`}
                                  >
                                    {achievement.name}
                                  </span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={achievement.completed ? "bg-primary/10 text-primary" : ""}
                                >
                                  {achievement.completed ? "Completed" : `${achievement.progress}/${achievement.total}`}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface AchievementCardProps {
  achievement: Achievement
  rarityColor: string
  categoryIcon: React.ReactNode
}

function AchievementCard({ achievement, rarityColor, categoryIcon }: AchievementCardProps) {
  return (
    <Card className={`overflow-hidden transition-all ${achievement.completed ? "" : "opacity-80"}`}>
      <div className={`h-2 w-full ${rarityColor.split(" ")[0]}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center ${
              achievement.completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            {achievement.icon}
          </div>
          <Badge variant="outline" className={rarityColor}>
            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
          </Badge>
        </div>
        <h3 className="text-lg font-medium mb-1">{achievement.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

        <div className="space-y-4">
          {!achievement.completed ? (
            <>
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Completed on {achievement.date}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {categoryIcon}
              <span className="text-xs text-muted-foreground capitalize">{achievement.category}</span>
            </div>
            {achievement.completed && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share achievement</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
