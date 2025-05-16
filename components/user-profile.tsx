"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Heart,
  Activity,
  Dumbbell,
  Edit,
  Save,
  Lock,
  Bell,
  Share2,
  Download,
  Trash,
  LogOut,
} from "lucide-react"

type Achievement = {
  id: string
  title: string
  description: string
  date: string
}

type HealthMetrics = {
  height: string
  weight: string
  bloodType: string
  allergies: string[]
  conditions: string[]
}

type Preferences = {
  notifications: boolean
  emailUpdates: boolean
  dataSharing: boolean
  darkMode: boolean
}

type UserData = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  birthdate: string
  joinDate: string
  bio: string
  avatar: string
  achievements: Achievement[]
  healthMetrics: HealthMetrics
  preferences: Preferences
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

const defaultUserData: UserData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  birthdate: "May 15, 1985",
  joinDate: "January 2023",
  bio: "Fitness enthusiast and health-conscious individual focused on maintaining a balanced lifestyle through proper nutrition and regular exercise.",
  avatar: "/placeholder.svg?height=100&width=100",
  achievements: [
    { id: "1", title: "30-Day Streak", description: "Logged in for 30 consecutive days", date: "2023-06-15" },
    { id: "2", title: "Hydration Master", description: "Met water intake goals for 14 days", date: "2023-05-22" },
    { id: "3", title: "Early Bird", description: "Completed morning workout 10 times", date: "2023-04-18" },
  ],
  healthMetrics: {
    height: "180 cm",
    weight: "75 kg",
    bloodType: "O+",
    allergies: ["Peanuts", "Shellfish"],
    conditions: ["None"],
  },
  preferences: {
    notifications: true,
    emailUpdates: false,
    dataSharing: false,
    darkMode: true,
  },
}

interface UserProfileProps {
  user?: Partial<UserData> | null
}

export function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

  // Ensure we always have valid user data by merging with default data
  const userData: UserData = {
    ...defaultUserData,
    ...user,
    // Ensure achievements is always an array
    achievements: user?.achievements || defaultUserData.achievements,
    healthMetrics: {
      ...defaultUserData.healthMetrics,
      ...(user?.healthMetrics || {}),
    },
    preferences: {
      ...defaultUserData.preferences,
      ...(user?.preferences || {}),
    },
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would save the profile data
  }

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Profile Sidebar */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold">{userData.name}</h3>
                <p className="text-muted-foreground mt-1">{userData.email}</p>
                <div className="flex mt-2 space-x-1">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Premium Member
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{userData.bio}</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{userData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Born {userData.birthdate}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Member since {userData.joinDate}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Health Metrics</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Height</span>
                    <span>{userData.healthMetrics?.height || "Not set"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Weight</span>
                    <span>{userData.healthMetrics?.weight || "Not set"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Blood Type</span>
                    <span>{userData.healthMetrics?.bloodType || "Not set"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Allergies</span>
                    <span>{userData.healthMetrics?.allergies?.join(", ") || "None"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Health Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  {isEditing ? (
                    <Button variant="default" size="sm" onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={userData.name}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={userData.email}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        defaultValue={userData.phone}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        defaultValue={userData.location}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <Input
                        id="birthdate"
                        defaultValue={userData.birthdate}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={4}
                      defaultValue={userData.bio}
                      readOnly={!isEditing}
                      className={cn(
                        "w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        !isEditing && "opacity-70",
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Health Information</CardTitle>
                  <CardDescription>Manage your health details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue={userData.healthMetrics?.height || ""}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        defaultValue={userData.healthMetrics?.weight || ""}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        defaultValue={userData.healthMetrics?.bloodType || ""}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input
                        id="allergies"
                        defaultValue={userData.healthMetrics?.allergies?.join(", ") || ""}
                        readOnly={!isEditing}
                        className={cn(!isEditing && "opacity-70")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>Track your progress and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userData.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary shrink-0">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Achieved on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Achievements
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                  <CardDescription>Goals you're working towards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground shrink-0">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">50-Day Streak</h4>
                        <p className="text-sm text-muted-foreground">Log in for 50 consecutive days</p>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: "60%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">30/50 days completed</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground shrink-0">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">Perfect Week</h4>
                        <p className="text-sm text-muted-foreground">Meet all health goals for 7 consecutive days</p>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: "40%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">3/7 days completed</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground shrink-0">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">Fitness Enthusiast</h4>
                        <p className="text-sm text-muted-foreground">Complete 20 workout sessions</p>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: "75%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">15/20 workouts completed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch id="notifications" checked={userData.preferences?.notifications || false} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailUpdates">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly summary emails</p>
                    </div>
                    <Switch id="emailUpdates" checked={userData.preferences?.emailUpdates || false} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Manage your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dataSharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymous data sharing for research</p>
                    </div>
                    <Switch id="dataSharing" checked={userData.preferences?.dataSharing || false} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full">Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
