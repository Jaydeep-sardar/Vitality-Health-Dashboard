"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Moon, Plus, Clock } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

type SleepEntry = {
  id: string
  date: string
  hours: number
  quality: number
}

export function SleepTracker() {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    { id: "1", date: "Mon", hours: 7.5, quality: 4 },
    { id: "2", date: "Tue", hours: 6.2, quality: 3 },
    { id: "3", date: "Wed", hours: 8.0, quality: 5 },
    { id: "4", date: "Thu", hours: 7.0, quality: 4 },
    { id: "5", date: "Fri", hours: 6.5, quality: 3 },
    { id: "6", date: "Sat", hours: 8.5, quality: 5 },
    { id: "7", date: "Sun", hours: 7.8, quality: 4 },
  ])

  const [hours, setHours] = useState("")
  const [quality, setQuality] = useState("3")
  const [isAdding, setIsAdding] = useState(false)

  const averageSleep = sleepEntries.reduce((sum, entry) => sum + entry.hours, 0) / sleepEntries.length

  const handleAddSleep = () => {
    if (hours) {
      const today = new Date()
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const day = days[today.getDay()]

      const entry: SleepEntry = {
        id: Date.now().toString(),
        date: day,
        hours: Number.parseFloat(hours),
        quality: Number.parseInt(quality),
      }

      // Remove oldest entry if we have more than 7
      const newEntries = [...sleepEntries]
      if (newEntries.length >= 7) {
        newEntries.shift()
      }

      setSleepEntries([...newEntries, entry])
      setHours("")
      setQuality("3")
      setIsAdding(false)
    }
  }

  const getQualityLabel = (quality: number) => {
    switch (quality) {
      case 1:
        return "Very Poor"
      case 2:
        return "Poor"
      case 3:
        return "Average"
      case 4:
        return "Good"
      case 5:
        return "Excellent"
      default:
        return "Unknown"
    }
  }

  const getQualityColor = (quality: number) => {
    switch (quality) {
      case 1:
        return "text-red-500"
      case 2:
        return "text-orange-500"
      case 3:
        return "text-yellow-500"
      case 4:
        return "text-green-500"
      case 5:
        return "text-emerald-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Tracker</CardTitle>
        <CardDescription>Track your sleep duration and quality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Moon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">{averageSleep.toFixed(1)}</h3>
                <p className="text-sm text-muted-foreground">Avg. Hours/Night</p>

                <div className="w-full mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Last Night</span>
                    <span className="text-sm font-medium">
                      {sleepEntries.length > 0 ? `${sleepEntries[sleepEntries.length - 1].hours} hrs` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality</span>
                    <motion.span
                      key={sleepEntries.length > 0 ? sleepEntries[sleepEntries.length - 1].quality : 0}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className={`text-sm font-medium ${sleepEntries.length > 0 ? getQualityColor(sleepEntries[sleepEntries.length - 1].quality) : ""}`}
                    >
                      {sleepEntries.length > 0 ? getQualityLabel(sleepEntries[sleepEntries.length - 1].quality) : "N/A"}
                    </motion.span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardContent className="pt-6 h-full">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sleepEntries}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#8884d8"
                      fill="url(#sleepGradient)"
                      fillOpacity={0.3}
                      name="Hours"
                      strokeWidth={2}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Log Sleep</h3>
          <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? (
              "Cancel"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </>
            )}
          </Button>
        </div>

        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sleep-hours">Hours Slept</Label>
                  <div className="flex items-center">
                    <Input
                      id="sleep-hours"
                      type="number"
                      step="0.1"
                      min="0"
                      max="24"
                      placeholder="e.g. 7.5"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                    <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sleep-quality">Sleep Quality (1-5)</Label>
                  <Input
                    id="sleep-quality"
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleAddSleep}>Save Sleep Entry</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Recent Sleep Log</h3>
          <div className="space-y-2">
            {sleepEntries
              .slice(-3)
              .reverse()
              .map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      <Moon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{entry.date}</p>
                      <p className="text-sm text-muted-foreground">{entry.hours} hours</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${getQualityColor(entry.quality)}`}>
                    {getQualityLabel(entry.quality)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
