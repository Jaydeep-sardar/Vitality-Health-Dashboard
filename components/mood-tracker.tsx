"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Smile, Meh, Frown, Angry, Heart } from "lucide-react"

type Mood = "happy" | "neutral" | "sad" | "angry" | "love" | null

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [moodHistory, setMoodHistory] = useState<Record<string, Mood>>({})

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    const dateKey = date.toISOString().split("T")[0]
    setMoodHistory((prev) => ({
      ...prev,
      [dateKey]: mood,
    }))
  }

  const getMoodColor = (mood: Mood): string => {
    switch (mood) {
      case "happy":
        return "bg-green-100 text-green-700"
      case "neutral":
        return "bg-blue-100 text-blue-700"
      case "sad":
        return "bg-yellow-100 text-yellow-700"
      case "angry":
        return "bg-red-100 text-red-700"
      case "love":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100"
    }
  }

  const renderDayContent = (day: Date) => {
    const dateKey = day.toISOString().split("T")[0]
    const mood = moodHistory[dateKey]

    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          {day.getDate()}
        </div>
        {mood && (
          <div className={`absolute inset-0 flex items-center justify-center ${getMoodColor(mood)} rounded-full opacity-40`}>
            {mood === "happy" && <Smile className="h-4 w-4" />}
            {mood === "neutral" && <Meh className="h-4 w-4" />}
            {mood === "sad" && <Frown className="h-4 w-4" />}
            {mood === "angry" && <Angry className="h-4 w-4" />}
            {mood === "love" && <Heart className="h-4 w-4" />}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mood Tracker</CardTitle>
          <CardDescription>Track how you feel each day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { mood: "happy", icon: <Smile className="h-8 w-8" />, label: "Happy" },
                  { mood: "neutral", icon: <Meh className="h-8 w-8" />, label: "Neutral" },
                  { mood: "sad", icon: <Frown className="h-8 w-8" />, label: "Sad" },
                  { mood: "angry", icon: <Angry className="h-8 w-8" />, label: "Angry" },
                  { mood: "love", icon: <Heart className="h-8 w-8" />, label: "Love" },
                ].map((item) => (
                  <motion.div
                    key={item.mood}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: ["happy", "neutral", "sad", "angry", "love"].indexOf(item.mood) * 0.1,
                    }}
                  >
                    <Button
                      variant={selectedMood === item.mood ? "default" : "outline"}
                      size="lg"
                      onClick={() => {
                        handleMoodSelect(item.mood as Mood)
                        // Add ripple animation
                        const ripple = document.createElement("span")
                        ripple.classList.add("ripple-animation")
                        document.body.appendChild(ripple)
                        setTimeout(() => document.body.removeChild(ripple), 1000)
                      }}
                      className={`h-16 w-16 rounded-full relative overflow-hidden ${
                        selectedMood === item.mood ? "shadow-lg" : ""
                      }`}
                    >
                      {item.icon}
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`p-4 rounded-lg ${getMoodColor(selectedMood)}`}
                >
                  <motion.p
                    className="font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedMood === "happy" && "You're feeling happy today! 😊"}
                    {selectedMood === "neutral" && "You're feeling neutral today. 😐"}
                    {selectedMood === "sad" && "You're feeling sad today. 😔"}
                    {selectedMood === "angry" && "You're feeling angry today. 😠"}
                    {selectedMood === "love" && "You're feeling love today! ❤️"}
                  </motion.p>
                </motion.div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Mood Calendar</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
                components={{
                  DayContent: ({ date: dayDate }) => renderDayContent(dayDate)
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <style jsx global>{`
      .ripple-animation {
        position: fixed;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `}</style>
    </>
  )
}
