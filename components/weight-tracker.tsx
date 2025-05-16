"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, Plus, X, TrendingDown, TrendingUp, Minus } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "@/components/ui/chart"

type WeightEntry = {
  id: string
  date: string
  weight: number
  note?: string
}

export function WeightTracker() {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([
    { id: "1", date: "2023-05-01", weight: 185.5 },
    { id: "2", date: "2023-05-03", weight: 184.8 },
    { id: "3", date: "2023-05-05", weight: 183.6 },
    { id: "4", date: "2023-05-07", weight: 183.2 },
    { id: "5", date: "2023-05-09", weight: 182.7 },
    { id: "6", date: "2023-05-11", weight: 182.0 },
    { id: "7", date: "2023-05-13", weight: 181.5 },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newWeight, setNewWeight] = useState("")
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0])
  const [newNote, setNewNote] = useState("")
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs")
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  const sortedEntries = [...weightEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const currentWeight = sortedEntries.length > 0 ? sortedEntries[sortedEntries.length - 1].weight : 0

  const startWeight = sortedEntries.length > 0 ? sortedEntries[0].weight : 0

  const weightChange = currentWeight - startWeight
  const weightChangePercent = startWeight !== 0 ? (weightChange / startWeight) * 100 : 0

  const handleAddWeight = () => {
    if (newWeight && newDate) {
      const entry: WeightEntry = {
        id: Date.now().toString(),
        date: newDate,
        weight: Number.parseFloat(newWeight),
        note: newNote || undefined,
      }

      setWeightEntries([...weightEntries, entry])
      setNewWeight("")
      setNewDate(new Date().toISOString().split("T")[0])
      setNewNote("")
      setIsAdding(false)
    }
  }

  const getFilteredEntries = () => {
    const now = new Date()
    const cutoffDate = new Date()

    if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7)
    } else if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1)
    } else if (timeRange === "year") {
      cutoffDate.setFullYear(now.getFullYear() - 1)
    }

    return sortedEntries.filter((entry) => new Date(entry.date) >= cutoffDate)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getWeightWithUnit = (weight: number) => {
    return `${weight} ${unit}`
  }

  const getAverageWeight = () => {
    if (weightEntries.length === 0) return 0

    const sum = weightEntries.reduce((acc, entry) => acc + entry.weight, 0)
    return sum / weightEntries.length
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Tracker</CardTitle>
        <CardDescription>Track your weight changes over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Scale className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">
                  {currentWeight > 0 ? getWeightWithUnit(currentWeight) : "No data"}
                </h3>
                <p className="text-sm text-muted-foreground">Current Weight</p>

                {weightChange !== 0 && (
                  <div className="flex items-center mt-4">
                    {weightChange < 0 ? (
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={weightChange < 0 ? "text-green-500" : "text-red-500"}>
                      {weightChange < 0 ? "-" : "+"}
                      {Math.abs(weightChange).toFixed(1)} {unit} ({Math.abs(weightChangePercent).toFixed(1)}%)
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="space-x-1">
                  <Button
                    variant={timeRange === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={timeRange === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("month")}
                  >
                    Month
                  </Button>
                  <Button
                    variant={timeRange === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("year")}
                  >
                    Year
                  </Button>
                </div>
                <div className="space-x-1">
                  <Button variant={unit === "lbs" ? "default" : "outline"} size="sm" onClick={() => setUnit("lbs")}>
                    lbs
                  </Button>
                  <Button variant={unit === "kg" ? "default" : "outline"} size="sm" onClick={() => setUnit("kg")}>
                    kg
                  </Button>
                </div>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getFilteredEntries().map((entry) => ({
                      date: formatDate(entry.date),
                      weight: entry.weight,
                      fullDate: entry.date,
                    }))}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip
                      formatter={(value) => [`${value} ${unit}`, "Weight"]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <ReferenceLine
                      y={getAverageWeight()}
                      stroke="#8884d8"
                      strokeDasharray="3 3"
                      label={{
                        value: "Average",
                        position: "insideBottomRight",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Weight Log</h3>
          <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Weight
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
                    <Label htmlFor="weight">Weight ({unit})</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder={`e.g. 180.5 ${unit}`}
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="note">Note (optional)</Label>
                  <Input
                    id="note"
                    placeholder="e.g. After morning workout"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddWeight}>Save Weight</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <Tabs defaultValue="list">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {sortedEntries.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No weight entries yet</p>
              ) : (
                <div className="space-y-2">
                  {[...sortedEntries].reverse().map((entry, index) => {
                    const prevEntry =
                      index < sortedEntries.length - 1 ? sortedEntries[sortedEntries.length - index - 2] : null

                    const change = prevEntry ? entry.weight - prevEntry.weight : 0

                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                            <Scale className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{getWeightWithUnit(entry.weight)}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {change !== 0 && prevEntry && (
                            <div className="flex items-center mr-2">
                              {change < 0 ? (
                                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                              ) : change > 0 ? (
                                <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                              ) : (
                                <Minus className="h-4 w-4 text-gray-500 mr-1" />
                              )}
                              <span
                                className={
                                  change < 0 ? "text-green-500" : change > 0 ? "text-red-500" : "text-gray-500"
                                }
                              >
                                {change < 0 ? "" : "+"}
                                {change.toFixed(1)} {unit}
                              </span>
                            </div>
                          )}
                          {entry.note && <div className="text-sm text-muted-foreground italic ml-2">{entry.note}</div>}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="table">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Weight</th>
                      <th className="text-left p-3">Change</th>
                      <th className="text-left p-3">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEntries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center p-4 text-muted-foreground">
                          No weight entries yet
                        </td>
                      </tr>
                    ) : (
                      [...sortedEntries].reverse().map((entry, index) => {
                        const prevEntry =
                          index < sortedEntries.length - 1 ? sortedEntries[sortedEntries.length - index - 2] : null

                        const change = prevEntry ? entry.weight - prevEntry.weight : 0

                        return (
                          <tr key={entry.id} className="border-t">
                            <td className="p-3">{formatDate(entry.date)}</td>
                            <td className="p-3 font-medium">{getWeightWithUnit(entry.weight)}</td>
                            <td className="p-3">
                              {change !== 0 && prevEntry ? (
                                <div className="flex items-center">
                                  {change < 0 ? (
                                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                                  ) : change > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                                  ) : (
                                    <Minus className="h-4 w-4 text-gray-500 mr-1" />
                                  )}
                                  <span
                                    className={
                                      change < 0 ? "text-green-500" : change > 0 ? "text-red-500" : "text-gray-500"
                                    }
                                  >
                                    {change < 0 ? "" : "+"}
                                    {change.toFixed(1)} {unit}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="p-3 text-sm text-muted-foreground">{entry.note || "-"}</td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
