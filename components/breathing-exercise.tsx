"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [inhaleTime, setInhaleTime] = useState(4)
  const [holdTime, setHoldTime] = useState(4)
  const [exhaleTime, setExhaleTime] = useState(4)
  const [restTime, setRestTime] = useState(2)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + 1

          if (phase === "inhale" && newCount >= inhaleTime) {
            setPhase("hold")
            return 0
          } else if (phase === "hold" && newCount >= holdTime) {
            setPhase("exhale")
            return 0
          } else if (phase === "exhale" && newCount >= exhaleTime) {
            setPhase("rest")
            return 0
          } else if (phase === "rest" && newCount >= restTime) {
            setPhase("inhale")
            setCycles((prev) => prev + 1)
            return 0
          }

          return newCount
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, phase, inhaleTime, holdTime, exhaleTime, restTime])

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setCount(0)
    setCycles(0)
  }

  const getInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "rest":
        return "Rest"
    }
  }

  const getTimeForPhase = () => {
    switch (phase) {
      case "inhale":
        return inhaleTime
      case "hold":
        return holdTime
      case "exhale":
        return exhaleTime
      case "rest":
        return restTime
    }
  }

  const getCircleVariants = () => {
    switch (phase) {
      case "inhale":
        return {
          animate: {
            scale: [1, 1.5],
            opacity: [0.7, 1],
            transition: { duration: inhaleTime, ease: "easeInOut" },
          },
        }
      case "hold":
        return {
          animate: {
            scale: 1.5,
            opacity: 1,
            transition: { duration: holdTime },
          },
        }
      case "exhale":
        return {
          animate: {
            scale: [1.5, 1],
            opacity: [1, 0.7],
            transition: { duration: exhaleTime, ease: "easeInOut" },
          },
        }
      case "rest":
        return {
          animate: {
            scale: 1,
            opacity: 0.7,
            transition: { duration: restTime },
          },
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Breathing Exercise</CardTitle>
        <CardDescription>Follow the animation for guided breathing</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative flex items-center justify-center h-64 w-full mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${phase}-${count}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{
                scale: phase === "inhale" ? 1 : phase === "exhale" ? 1.5 : 1.5,
                opacity: 0.7,
                boxShadow: "0 0 0 0 rgba(129, 140, 248, 0)",
              }}
              animate={{
                scale: getCircleVariants().animate.scale,
                opacity: getCircleVariants().animate.opacity,
                boxShadow: ["0 0 0 0 rgba(129, 140, 248, 0.7)", "0 0 0 20px rgba(129, 140, 248, 0)"],
                transition: {
                  ...getCircleVariants().animate.transition,
                  boxShadow: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: phase === "inhale" ? inhaleTime : phase === "exhale" ? exhaleTime : holdTime,
                  },
                },
              }}
              style={{ width: "200px", height: "200px" }}
            />
          </AnimatePresence>
          <div className="absolute flex flex-col items-center justify-center text-center z-10">
            <motion.h3
              className="text-2xl font-bold mb-2"
              key={phase}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getInstructions()}
            </motion.h3>
            <motion.div
              className="text-4xl font-bold mb-2"
              key={count}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {count + 1}
            </motion.div>
            <div className="text-sm text-muted-foreground">
              {count + 1} of {getTimeForPhase()} seconds
            </div>
            {cycles > 0 && (
              <motion.div
                className="mt-2 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Cycles completed: {cycles}
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={handleToggle} size="lg">
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" onClick={handleReset} size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Inhale Duration</span>
              <span className="text-sm font-medium">{inhaleTime}s</span>
            </div>
            <Slider
              value={[inhaleTime]}
              min={2}
              max={10}
              step={1}
              onValueChange={(value) => setInhaleTime(value[0])}
              disabled={isActive}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Hold Duration</span>
              <span className="text-sm font-medium">{holdTime}s</span>
            </div>
            <Slider
              value={[holdTime]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => setHoldTime(value[0])}
              disabled={isActive}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Exhale Duration</span>
              <span className="text-sm font-medium">{exhaleTime}s</span>
            </div>
            <Slider
              value={[exhaleTime]}
              min={2}
              max={10}
              step={1}
              onValueChange={(value) => setExhaleTime(value[0])}
              disabled={isActive}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Rest Duration</span>
              <span className="text-sm font-medium">{restTime}s</span>
            </div>
            <Slider
              value={[restTime]}
              min={0}
              max={5}
              step={1}
              onValueChange={(value) => setRestTime(value[0])}
              disabled={isActive}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
