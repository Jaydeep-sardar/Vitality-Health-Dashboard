"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Play, Pause, RotateCcw, Plus, X, Clock, CheckCircle2 } from "lucide-react"

type Exercise = {
  id: string
  name: string
  duration: number
  completed: boolean
}

export function FitnessRoutine() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "1", name: "Warm-up Stretching", duration: 300, completed: false },
    { id: "2", name: "Push-ups", duration: 180, completed: false },
    { id: "3", name: "Squats", duration: 180, completed: false },
    { id: "4", name: "Plank", duration: 60, completed: false },
    { id: "5", name: "Jumping Jacks", duration: 120, completed: false },
    { id: "6", name: "Cool-down Stretching", duration: 180, completed: false },
  ])

  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newExerciseName, setNewExerciseName] = useState("")
  const [newExerciseDuration, setNewExerciseDuration] = useState("")

  const totalExercises = exercises.length
  const completedExercises = exercises.filter((ex) => ex.completed).length
  const progress = Math.round((completedExercises / totalExercises) * 100)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && activeExercise) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Mark current exercise as completed
            setExercises(exercises.map((ex) => (ex.id === activeExercise ? { ...ex, completed: true } : ex)))

            // Find next uncompleted exercise
            const currentIndex = exercises.findIndex((ex) => ex.id === activeExercise)
            const nextExercise = exercises.slice(currentIndex + 1).find((ex) => !ex.completed)

            if (nextExercise) {
              setActiveExercise(nextExercise.id)
              setTimeRemaining(nextExercise.duration)
            } else {
              setIsRunning(false)
              setActiveExercise(null)
              return 0
            }

            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, activeExercise, exercises])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleStartExercise = (id: string) => {
    const exercise = exercises.find((ex) => ex.id === id)
    if (exercise) {
      setActiveExercise(id)
      setTimeRemaining(exercise.duration)
      setIsRunning(true)
    }
  }

  const handleToggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const handleResetTimer = () => {
    setIsRunning(false)
    if (activeExercise) {
      const exercise = exercises.find((ex) => ex.id === activeExercise)
      if (exercise) {
        setTimeRemaining(exercise.duration)
      }
    }
  }

  const handleToggleComplete = (id: string) => {
    setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex)))
  }

  const handleAddExercise = () => {
    if (newExerciseName && newExerciseDuration) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: newExerciseName,
        duration: Number.parseInt(newExerciseDuration) * 60, // Convert minutes to seconds
        completed: false,
      }

      setExercises([...exercises, newExercise])
      setNewExerciseName("")
      setNewExerciseDuration("")
      setIsAdding(false)
    }
  }

  const handleResetRoutine = () => {
    setExercises(exercises.map((ex) => ({ ...ex, completed: false })))
    setIsRunning(false)
    setActiveExercise(null)
    setTimeRemaining(0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitness Routine</CardTitle>
        <CardDescription>Track your workout exercises with timers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Progress</h3>
            <span className="text-sm font-medium">
              {completedExercises} of {totalExercises} completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {activeExercise && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="bg-primary/10 rounded-lg p-4 text-center relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-primary/5"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
            <h3 className="text-lg font-medium mb-2 relative z-10">
              {exercises.find((ex) => ex.id === activeExercise)?.name}
            </h3>
            <motion.div
              className="text-4xl font-bold mb-4 relative z-10"
              key={timeRemaining}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {formatTime(timeRemaining)}
            </motion.div>
            <div className="flex justify-center gap-2 relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleToggleTimer}>
                  {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isRunning ? "Pause" : "Resume"}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={handleResetTimer}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Exercises</h3>
            <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
              {isAdding ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exercise-name">Exercise Name</Label>
                      <Input
                        id="exercise-name"
                        placeholder="e.g. Push-ups"
                        value={newExerciseName}
                        onChange={(e) => setNewExerciseName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="exercise-duration">Duration (minutes)</Label>
                      <Input
                        id="exercise-duration"
                        type="number"
                        placeholder="e.g. 3"
                        value={newExerciseDuration}
                        onChange={(e) => setNewExerciseDuration(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddExercise}>Add Exercise</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {exercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  activeExercise === exercise.id ? "border-primary bg-primary/5" : ""
                } ${exercise.completed ? "bg-muted" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Checkbox
                      id={`exercise-${exercise.id}`}
                      checked={exercise.completed}
                      onCheckedChange={() => handleToggleComplete(exercise.id)}
                    />
                  </motion.div>
                  <div>
                    <Label
                      htmlFor={`exercise-${exercise.id}`}
                      className={`font-medium ${exercise.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {exercise.name}
                    </Label>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(exercise.duration)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {exercise.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartExercise(exercise.id)}
                        disabled={isRunning && activeExercise !== exercise.id}
                      >
                        {activeExercise === exercise.id && isRunning ? "In Progress" : "Start"}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {progress === 100 ? "🎉 Workout completed!" : `${totalExercises - completedExercises} exercises remaining`}
        </div>
        <Button variant="outline" size="sm" onClick={handleResetRoutine}>
          Reset All
        </Button>
      </CardFooter>
    </Card>
  )
}
