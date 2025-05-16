"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Chart } from "@/components/ui/chart"
import {
  Activity,
  Heart,
  Droplets,
  Utensils,
  Moon,
  Dumbbell,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

export function HealthDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview")
  const userName = user?.name || "User"

  // Sample data for charts
  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours",
        data: [7.5, 6.8, 8.2, 7.0, 6.5, 9.0, 8.5],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [8432, 7621, 9853, 6324, 8765, 12453, 10876],
        backgroundColor: "hsl(var(--primary))",
        borderRadius: 6,
      },
    ],
  }

  const nutritionData = {
    labels: ["Protein", "Carbs", "Fat", "Fiber"],
    datasets: [
      {
        label: "Grams",
        data: [75, 220, 56, 32],
        backgroundColor: [
          "hsl(var(--primary))",
          "hsl(var(--primary) / 0.8)",
          "hsl(var(--primary) / 0.6)",
          "hsl(var(--primary) / 0.4)",
        ],
        borderWidth: 0,
      },
    ],
  }

  const waterData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Glasses",
        data: [6, 8, 5, 7, 9, 8, 7],
        borderColor: "hsl(217, 91%, 60%)",
        backgroundColor: "hsl(217, 91%, 60%, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [78, 77.5, 76.8, 76.2, 75.5, 75],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "transparent",
        tension: 0.3,
      },
    ],
  }

  const moodData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood (1-10)",
        data: [7, 6, 8, 7, 9, 8, 9],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {userName}!</h2>
          <p className="text-muted-foreground">Here's an overview of your health metrics and progress.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button variant="default" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Track Activity
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Summary Card */}
            <motion.div variants={itemVariants} className="col-span-full">
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 dark:bg-primary/10">
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Daily Summary
                  </CardTitle>
                  <CardDescription>Your health metrics for today</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mb-2">
                        <Droplets className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-bold">6/8</div>
                      <div className="text-xs text-muted-foreground">Water (glasses)</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mb-2">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-xs text-muted-foreground">Active (min)</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mb-2">
                        <Moon className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-bold">7.5</div>
                      <div className="text-xs text-muted-foreground">Sleep (hrs)</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mb-2">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-bold">68</div>
                      <div className="text-xs text-muted-foreground">Resting HR</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        <Clock className="mr-1 h-3 w-3" />
                        Updated 15m ago
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        On track
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Sleep Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Moon className="mr-2 h-4 w-4 text-primary" />
                      Sleep
                    </CardTitle>
                    <Badge variant="outline" className="font-normal">
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                      +12%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px]">
                    <Chart type="line" data={sleepData} />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-between items-center w-full text-sm">
                    <div className="text-muted-foreground">Weekly average</div>
                    <div className="font-medium">7.6 hrs</div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Activity Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Activity className="mr-2 h-4 w-4 text-primary" />
                      Activity
                    </CardTitle>
                    <Badge variant="outline" className="font-normal">
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                      +8%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px]">
                    <Chart type="bar" data={activityData} />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-between items-center w-full text-sm">
                    <div className="text-muted-foreground">Daily average</div>
                    <div className="font-medium">9,189 steps</div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Nutrition Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Utensils className="mr-2 h-4 w-4 text-primary" />
                      Nutrition
                    </CardTitle>
                    <Badge variant="outline" className="font-normal">
                      <ArrowDownRight className="mr-1 h-3 w-3 text-amber-500" />
                      -3%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px]">
                    <Chart type="doughnut" data={nutritionData} />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-between items-center w-full text-sm">
                    <div className="text-muted-foreground">Calorie intake</div>
                    <div className="font-medium">1,850 kcal</div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Progress Card */}
            <motion.div variants={itemVariants} className="col-span-full">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Weekly Goals
                  </CardTitle>
                  <CardDescription>Your progress towards this week's health goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="font-medium">Water Intake</div>
                      <div>75%</div>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="font-medium">Exercise</div>
                      <div>60%</div>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="font-medium">Sleep Quality</div>
                      <div>85%</div>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="font-medium">Nutrition Balance</div>
                      <div>70%</div>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Goals
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div variants={itemVariants} className="col-span-full">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    Health Trends
                  </CardTitle>
                  <CardDescription>Your health metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Weight Trend</div>
                      <div className="h-[200px]">
                        <Chart type="line" data={weightData} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">Mood Trend</div>
                      <div className="h-[200px]">
                        <Chart type="line" data={moodData} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="mr-2 h-5 w-5" />
                    Water Intake
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <Chart type="line" data={waterData} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Activity Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <Chart type="bar" data={activityData} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Health Insights
                  </CardTitle>
                  <CardDescription>Personalized recommendations based on your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary shrink-0">
                        <Droplets className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Hydration Insight</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your water intake has been below target for 3 days this week. Aim to drink at least 8 glasses
                          of water daily to maintain optimal hydration.
                        </p>
                        <Button variant="link" className="px-0 h-auto mt-1">
                          View hydration tips
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary shrink-0">
                        <Moon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Sleep Pattern</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your sleep quality has improved by 15% this week. Maintaining a consistent sleep schedule has
                          positively impacted your overall rest quality.
                        </p>
                        <Button variant="link" className="px-0 h-auto mt-1">
                          Sleep improvement plan
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary shrink-0">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Activity Recommendation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on your activity patterns, we recommend adding 2 more strength training sessions per
                          week to complement your cardio workouts.
                        </p>
                        <Button variant="link" className="px-0 h-auto mt-1">
                          View workout plan
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Get More Insights
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
