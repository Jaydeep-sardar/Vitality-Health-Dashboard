"use client"

import { useState, useEffect } from "react"
import { motion, Reorder } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Play, Pause, RotateCcw, ArrowRight, GripVertical } from "lucide-react"

type Stretch = {
  id: string
  name: string
  duration: number
  description: string
  image: string
}

export function StretchSequence() {
  const [stretches, setStretches] = useState<Stretch[]>([
    {
      id: "1",
      name: "Neck Stretch",
      duration: 30,
      description: "Gently tilt your head to each side, holding for 5 seconds.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Shoulder Rolls",
      duration: 30,
      description: "Roll your shoulders forward and backward in circular motions.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Quad Stretch",
      duration: 45,
      description: "Stand on one leg, grab your ankle and pull gently toward your buttocks.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "Hamstring Stretch",
      duration: 45,
      description: "Sit with one leg extended, reach toward your toes while keeping your back straight.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      name: "Lower Back Stretch",
      duration: 60,
      description: "Lie on your back, hug your knees to your chest and gently rock side to side.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const [currentStretchIndex, setCurrentStretchIndex] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completedStretches, setCompletedStretches] = useState<string[]>([])

  const totalDuration = stretches.reduce((sum, stretch) => sum + stretch.duration, 0)
  const completedDuration = stretches
    .filter((stretch) => completedStretches.includes(stretch.id))
    .reduce((sum, stretch) => sum + stretch.duration, 0)

  const progress = Math.round((completedDuration / totalDuration) * 100)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && currentStretchIndex !== null) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Mark current stretch as completed
            const currentStretch = stretches[currentStretchIndex]
            if (!completedStretches.includes(currentStretch.id)) {
              setCompletedStretches([...completedStretches, currentStretch.id])
            }

            // Move to next stretch
            if (currentStretchIndex < stretches.length - 1) {
              const nextIndex = currentStretchIndex + 1
              setCurrentStretchIndex(nextIndex)
              setTimeRemaining(stretches[nextIndex].duration)
              return stretches[nextIndex].duration
            } else {
              setIsRunning(false)
              setCurrentStretchIndex(null)
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, currentStretchIndex, stretches, completedStretches])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleStartSequence = () => {
    setCurrentStretchIndex(0)
    setTimeRemaining(stretches[0].duration)
    setIsRunning(true)
    setCompletedStretches([])
  }

  const handleToggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const handleResetTimer = () => {
    if (currentStretchIndex !== null) {
      setTimeRemaining(stretches[currentStretchIndex].duration)
      setIsRunning(false)
    }
  }

  const handleSkipToNext = () => {
    if (currentStretchIndex !== null && currentStretchIndex < stretches.length - 1) {
      // Mark current as completed
      const currentStretch = stretches[currentStretchIndex]
      if (!completedStretches.includes(currentStretch.id)) {
        setCompletedStretches([...completedStretches, currentStretch.id])
      }

      // Move to next
      const nextIndex = currentStretchIndex + 1
      setCurrentStretchIndex(nextIndex)
      setTimeRemaining(stretches[nextIndex].duration)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stretch Sequence</CardTitle>
        <CardDescription>Interactive stretching routine with timers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Progress</h3>
            <span className="text-sm font-medium">
              {completedStretches.length} of {stretches.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-right">
            {formatTime(completedDuration)} / {formatTime(totalDuration)}
          </p>
        </div>

        {currentStretchIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 rounded-lg p-6 text-center"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">{stretches[currentStretchIndex].name}</h3>
              <div className="text-sm text-muted-foreground">
                {currentStretchIndex + 1} of {stretches.length}
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <img
                src={stretches[currentStretchIndex].image || "/placeholder.svg"}
                alt={stretches[currentStretchIndex].name}
                className="h-32 w-32 object-cover rounded-lg"
              />
            </div>

            <p className="mb-4 text-muted-foreground">{stretches[currentStretchIndex].description}</p>

            <div className="text-4xl font-bold mb-6">{formatTime(timeRemaining)}</div>

            <div className="flex justify-center gap-2">
              <Button onClick={handleToggleTimer}>
                {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isRunning ? "Pause" : "Resume"}
              </Button>
              <Button variant="outline" onClick={handleResetTimer}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              {currentStretchIndex < stretches.length - 1 && (
                <Button variant="outline" onClick={handleSkipToNext}>
                  Skip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Stretch Sequence</h3>
            <p className="text-sm text-muted-foreground">Drag to reorder</p>
          </div>

          <Reorder.Group values={stretches} onReorder={setStretches} className="space-y-2">
            {stretches.map((stretch, index) => (
              <Reorder.Item key={stretch.id} value={stretch}>
                <motion.div
                  layout
                  className={`flex items-center p-3 border rounded-lg cursor-move ${
                    currentStretchIndex === index ? "border-primary bg-primary/5" : ""
                  } ${completedStretches.includes(stretch.id) ? "bg-muted" : ""}`}
                >
                  <div className="mr-3 text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        src={stretch.image || "/placeholder.svg"}
                        alt={stretch.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${completedStretches.includes(stretch.id) ? "line-through text-muted-foreground" : ""}`}
                      >
                        {stretch.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatTime(stretch.duration)}</p>
                    </div>
                  </div>
                  {currentStretchIndex === index && (
                    <div className="ml-auto">
                      <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Current
                      </span>
                    </div>
                  )}
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleStartSequence} disabled={isRunning}>
          <Activity className="mr-2 h-4 w-4" />
          {completedStretches.length > 0 ? "Restart Sequence" : "Start Sequence"}
        </Button>
      </CardFooter>
    </Card>
  )
}
