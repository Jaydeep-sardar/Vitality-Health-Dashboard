"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Plus, X, CalendarIcon, Tag, Search } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"

type JournalEntry = {
  id: string
  date: Date
  title: string
  content: string
  mood: number
  tags: string[]
}

type MoodData = {
  name: string
  count: number
}

type TagData = {
  name: string
  count: number
}

export function MentalHealthJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: new Date(2023, 4, 1),
      title: "Feeling accomplished",
      content: "Completed a major project at work today. Feeling proud of my accomplishments.",
      mood: 4,
      tags: ["work", "accomplishment", "proud"],
    },
    {
      id: "2",
      date: new Date(2023, 4, 3),
      title: "Stress and anxiety",
      content: "Feeling overwhelmed with upcoming deadlines. Need to practice more self-care.",
      mood: 2,
      tags: ["stress", "anxiety", "work"],
    },
    {
      id: "3",
      date: new Date(2023, 4, 5),
      title: "Family time",
      content: "Spent quality time with family. Feeling grateful for their support.",
      mood: 5,
      tags: ["family", "gratitude", "relaxation"],
    },
    {
      id: "4",
      date: new Date(2023, 4, 7),
      title: "Mixed emotions",
      content: "Had both ups and downs today. Trying to focus on the positive aspects.",
      mood: 3,
      tags: ["reflection", "mixed"],
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newMood, setNewMood] = useState<number>(3)
  const [newTags, setNewTags] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  const moodLabels = ["Very Bad", "Bad", "Neutral", "Good", "Excellent"]
  const moodColors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#10b981"]

  const handleAddEntry = () => {
    if (newTitle && newContent) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: selectedDate,
        title: newTitle,
        content: newContent,
        mood: newMood,
        tags: newTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      }

      setEntries([...entries, entry])
      setNewTitle("")
      setNewContent("")
      setNewMood(3)
      setNewTags("")
      setIsAdding(false)
    }
  }

  const getMoodData = (): MoodData[] => {
    const moodCounts = [0, 0, 0, 0, 0]

    entries.forEach((entry) => {
      moodCounts[entry.mood - 1]++
    })

    return moodLabels.map((label, index) => ({
      name: label,
      count: moodCounts[index],
    }))
  }

  const getTagData = (): TagData[] => {
    const tagCounts: Record<string, number> = {}

    entries.forEach((entry) => {
      entry.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  const filteredEntries = entries
    .filter((entry) => {
      if (!searchQuery) return true

      const query = searchQuery.toLowerCase()
      return (
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  const getMoodColor = (mood: number) => {
    return moodColors[mood - 1]
  }

  const getMoodLabel = (mood: number) => {
    return moodLabels[mood - 1]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Health Journal</CardTitle>
        <CardDescription>Track your thoughts, feelings, and emotional well-being</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="journal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search entries..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "outline" : "default"}>
                {isAdding ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    New Entry
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
                  className="space-y-4 overflow-hidden border rounded-lg p-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor="entry-title">Title</Label>
                        <Input
                          id="entry-title"
                          placeholder="Entry title"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="entry-date">Date</Label>
                        <div className="flex items-center border rounded-md h-10 px-3">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatDate(selectedDate)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="entry-content">Journal Entry</Label>
                      <Textarea
                        id="entry-content"
                        placeholder="Write your thoughts here..."
                        className="min-h-[150px]"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Mood</Label>
                      <div className="flex justify-between">
                        {moodLabels.map((label, index) => (
                          <motion.div
                            key={label}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              },
                            }}
                          >
                            <Button
                              type="button"
                              variant={newMood === index + 1 ? "default" : "outline"}
                              className="flex-1 mx-1 transition-all duration-300"
                              onClick={() => setNewMood(index + 1)}
                              style={{
                                backgroundColor: newMood === index + 1 ? getMoodColor(index + 1) : undefined,
                                borderColor: getMoodColor(index + 1),
                                color: newMood === index + 1 ? "white" : undefined,
                                transform: newMood === index + 1 ? "translateY(-2px)" : "translateY(0)",
                                boxShadow: newMood === index + 1 ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                              }}
                            >
                              {label}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="entry-tags">Tags (comma separated)</Label>
                      <div className="flex items-center border rounded-md h-10 px-3">
                        <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="entry-tags"
                          placeholder="e.g. work, family, stress"
                          className="border-0 p-0 focus-visible:ring-0"
                          value={newTags}
                          onChange={(e) => setNewTags(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button onClick={handleAddEntry}>Save Entry</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {filteredEntries.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-muted-foreground py-8"
                >
                  {searchQuery ? "No entries match your search" : "No journal entries yet"}
                </motion.p>
              ) : (
                <AnimatePresence>
                  {filteredEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        },
                      }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      whileHover={{ scale: 1.01 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{entry.title}</h3>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${getMoodColor(entry.mood)}20`,
                            color: getMoodColor(entry.mood),
                          }}
                        >
                          {getMoodLabel(entry.mood)}
                        </motion.div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{formatDate(entry.date)}</p>
                      <p className="mb-3">{entry.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              transition: { delay: index * 0.1 + tagIndex * 0.05 + 0.2 },
                            }}
                          >
                            <Badge variant="outline">{tag}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Mood Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getMoodData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ name, percent }) => (percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : "")}
                        >
                          {getMoodData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={moodColors[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getTagData()}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mood Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={entries
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((entry) => ({
                          date: formatDate(entry.date),
                          mood: entry.mood,
                        }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                      <Tooltip formatter={(value) => [`${getMoodLabel(value as number)}`, "Mood"]} />
                      <Bar dataKey="mood" name="Mood" fill="#8884d8" isAnimationActive={true}>
                        {entries.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getMoodColor(entry.mood)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="flex flex-col items-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                components={{
                  DayContent: ({ day }) => {
                    const dateString = day.toISOString().split("T")[0]
                    const entry = entries.find((e) => e.date.toISOString().split("T")[0] === dateString)

                    return (
                      <div className="h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                        <div className="h-7 w-7 absolute top-1 left-1 flex items-center justify-center">
                          {day.getDate()}
                        </div>
                        {entry && (
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: `${getMoodColor(entry.mood)}40`,
                            }}
                          >
                            <Brain className="h-3 w-3" style={{ color: getMoodColor(entry.mood) }} />
                          </div>
                        )}
                      </div>
                    )
                  },
                }}
              />

              <div className="mt-6 w-full">
                <h3 className="text-lg font-medium mb-2">Entries for {formatDate(selectedDate)}</h3>

                {entries.filter(
                  (entry) => entry.date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0],
                ).length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No entries for this date</p>
                ) : (
                  <div className="space-y-4">
                    {entries
                      .filter(
                        (entry) => entry.date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0],
                      )
                      .map((entry) => (
                        <div key={entry.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium">{entry.title}</h3>
                            <div
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: `${getMoodColor(entry.mood)}20`,
                                color: getMoodColor(entry.mood),
                              }}
                            >
                              {getMoodLabel(entry.mood)}
                            </div>
                          </div>
                          <p className="mb-3">{entry.content}</p>
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
