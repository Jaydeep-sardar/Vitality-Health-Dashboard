"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types
export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  isLoading: boolean
  error: string | null
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null)

// Sample users for demo
const DEMO_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user", e)
      }
    }
    setIsLoading(false)
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setError(null)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user
      const foundUser = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        setIsLoading(false)
        return true
      } else {
        setError("Invalid email or password")
        setIsLoading(false)
        return false
      }
    } catch (err) {
      setError("An error occurred during sign in")
      setIsLoading(false)
      return false
    }
  }

  // Sign up function
  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setError(null)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const userExists = DEMO_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase())

      if (userExists) {
        setError("User with this email already exists")
        setIsLoading(false)
        return false
      }

      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: `${DEMO_USERS.length + 1}`,
        name,
        email,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    } catch (err) {
      setError("An error occurred during sign up")
      setIsLoading(false)
      return false
    }
  }

  // Sign out function
  const signOut = async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
