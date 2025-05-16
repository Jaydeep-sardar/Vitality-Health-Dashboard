"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Droplets, Plus, Minus } from "lucide-react"

export function WaterTracker() {
  const [waterGoal, setWaterGoal] = useState(8)
  const [waterIntake, setWaterIntake] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (waterGoal && waterIntake !== undefined) {
      const percentage = Math.min(100, Math.round((waterIntake / waterGoal) * 100))
      setProgress(percentage)
    }
  }, [waterIntake, waterGoal])

  const addWater = () => {
    if (waterIntake < 20) {
      setWaterIntake((prev) => prev + 1)
    }
  }

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake((prev) => prev - 1)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Intake Tracker</CardTitle>
        <CardDescription>Track your daily water consumption</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="relative w-48 h-48 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 overflow-hidden">
              <motion.div
                className="absolute bottom-0 w-full bg-blue-400/80"
                initial={{ height: "0%" }}
                animate={{
                  height: `${progress}%`,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                  },
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-2 bg-blue-300/50"
                  animate={{
                    top: ["0%", "5%", "0%"],
                    transition: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    },
                  }}
                />
              </motion.div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <Droplets className="h-10 w-10 text-blue-500" />
              <motion.div
                className="text-3xl font-bold text-blue-700"
                key={waterIntake}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {waterIntake}
              </motion.div>
              <div className="text-sm text-blue-600">of {waterGoal} cups</div>
            </div>
          </motion.div>

          <Progress value={progress} className="w-full h-2 mb-2" />
          <p className="text-sm text-muted-foreground mb-4">{progress}% of daily goal</p>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={removeWater} disabled={waterIntake <= 0}>
              <Minus className="h-4 w-4" />
            </Button>

            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: Math.min(waterIntake, 8) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="w-10 h-12 bg-blue-100 rounded-b-lg rounded-t-sm border border-blue-200 flex items-center justify-center relative overflow-hidden"
                >
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <motion.div
                    className="absolute bottom-0 w-full bg-blue-300/30"
                    initial={{ height: "0%" }}
                    animate={{
                      height: "100%",
                      transition: {
                        duration: 1,
                        delay: i * 0.05 + 0.2,
                      },
                    }}
                  />
                </motion.div>
              ))}
              {waterIntake > 8 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-10 h-12 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center"
                >
                  <span className="text-blue-500 font-medium">+{waterIntake - 8}</span>
                </motion.div>
              )}
            </div>

            <Button variant="outline" size="icon" onClick={addWater} disabled={waterIntake >= 20}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Daily Goal (cups)</span>
            <span className="text-sm font-medium">{waterGoal}</span>
          </div>
          <Slider value={[waterGoal]} min={1} max={15} step={1} onValueChange={(value) => setWaterGoal(value[0])} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {waterIntake >= waterGoal
            ? "🎉 You've reached your daily goal!"
            : `${waterGoal - waterIntake} more cups to reach your goal`}
        </div>
        <Button variant="outline" size="sm" onClick={() => setWaterIntake(0)}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}
