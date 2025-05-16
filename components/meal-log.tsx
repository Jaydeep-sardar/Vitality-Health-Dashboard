"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Utensils, Plus, X, Coffee, Sun, Moon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Meal = {
  id: string
  name: string
  calories: number
  type: "breakfast" | "lunch" | "dinner" | "snack"
}

export function MealLog() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: "1", name: "Oatmeal with Berries", calories: 320, type: "breakfast" },
    { id: "2", name: "Grilled Chicken Salad", calories: 450, type: "lunch" },
    { id: "3", name: "Protein Bar", calories: 180, type: "snack" },
  ])

  const [newMeal, setNewMeal] = useState("")
  const [newCalories, setNewCalories] = useState("")
  const [newType, setNewType] = useState<Meal["type"]>("breakfast")
  const [isAdding, setIsAdding] = useState(false)

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieGoal = 2000
  const calorieProgress = Math.min(100, Math.round((totalCalories / calorieGoal) * 100))

  const handleAddMeal = () => {
    if (newMeal && newCalories) {
      const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal,
        calories: Number.parseInt(newCalories),
        type: newType,
      }

      setMeals([...meals, meal])
      setNewMeal("")
      setNewCalories("")
      setIsAdding(false)
    }
  }

  const handleRemoveMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const getMealTypeIcon = (type: Meal["type"]) => {
    switch (type) {
      case "breakfast":
        return <Coffee className="h-4 w-4" />
      case "lunch":
        return <Sun className="h-4 w-4" />
      case "dinner":
        return <Moon className="h-4 w-4" />
      case "snack":
        return <Utensils className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Log</CardTitle>
        <CardDescription>Track your daily food intake and calories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Daily Calories</h3>
            <span className="text-lg font-bold">
              {totalCalories} / {calorieGoal}
            </span>
          </div>
          <Progress value={calorieProgress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span>500</span>
            <span>1000</span>
            <span>1500</span>
            <span>2000+</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Today's Meals</h3>
            <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
              {isAdding ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.2 },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: { duration: 0.2 },
                    opacity: { duration: 0.1 },
                  },
                }}
                className="space-y-4 overflow-hidden"
              >
                <motion.div
                  className="grid gap-4 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                      <Label htmlFor="meal-name">Meal Name</Label>
                      <Input
                        id="meal-name"
                        placeholder="e.g. Grilled Chicken Salad"
                        value={newMeal}
                        onChange={(e) => setNewMeal(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        placeholder="e.g. 450"
                        value={newCalories}
                        onChange={(e) => setNewCalories(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="meal-type">Meal Type</Label>
                      <Select value={newType} onValueChange={(value) => setNewType(value as Meal["type"])}>
                        <SelectTrigger id="meal-type">
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleAddMeal} className="w-full">
                      Add Meal
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {meals.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No meals logged today</p>
            ) : (
              <AnimatePresence>
                {meals.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 10 }}
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
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.2 },
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {getMealTypeIcon(meal.type)}
                      </motion.div>
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{meal.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="font-medium"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {meal.calories} cal
                      </motion.span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMeal(meal.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {calorieGoal - totalCalories > 0
            ? `${calorieGoal - totalCalories} calories remaining`
            : "Daily calorie goal reached"}
        </div>
        <Button variant="outline" size="sm" onClick={() => setMeals([])}>
          Clear All
        </Button>
      </CardFooter>
    </Card>
  )
}
