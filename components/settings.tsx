"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { Globe, Lock, Moon, Smartphone, Sun, User } from "lucide-react"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="units">Measurement Units</Label>
                    <Select defaultValue="imperial">
                      <SelectTrigger id="units">
                        <SelectValue placeholder="Select units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imperial">Imperial (lbs, ft, in)</SelectItem>
                        <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoSync">Auto-sync data</Label>
                      <p className="text-sm text-muted-foreground">Automatically sync your health data</p>
                    </div>
                    <Switch id="autoSync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Share anonymous usage data to help us improve</p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="updates">Automatic updates</Label>
                      <p className="text-sm text-muted-foreground">Keep the application up to date automatically</p>
                    </div>
                    <Switch id="updates" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      theme === "light" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5" />
                        <span className="font-medium">Light</span>
                      </div>
                      {theme === "light" && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <div className="h-24 rounded-md bg-[#FFFFFF] border"></div>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      theme === "dark" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Moon className="h-5 w-5" />
                        <span className="font-medium">Dark</span>
                      </div>
                      {theme === "dark" && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <div className="h-24 rounded-md bg-[#1F1F1F] border border-gray-800"></div>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      theme === "system" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        <span className="font-medium">System</span>
                      </div>
                      {theme === "system" && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <div className="h-24 rounded-md bg-gradient-to-r from-[#FFFFFF] to-[#1F1F1F] border"></div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accent Color</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[
                    { name: "Default", color: "bg-primary" },
                    { name: "Purple", color: "bg-purple-500" },
                    { name: "Green", color: "bg-green-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Red", color: "bg-red-500" },
                    { name: "Orange", color: "bg-orange-500" },
                  ].map((accent) => (
                    <div key={accent.name} className="flex flex-col items-center gap-2">
                      <div className={`h-12 w-12 rounded-full ${accent.color}`}></div>
                      <span className="text-sm">{accent.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Accent color customization is available in the premium version.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interface Density</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer border-primary bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Comfortable</span>
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">More space between elements</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Compact</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Less space between elements</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Font Size</h3>
                <div className="space-y-2">
                  <Label>Text Size</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size, i) => (
                      <Button key={size} variant={i === 2 ? "default" : "outline"} className="h-10">
                        {size}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Font size customization is available in the premium version.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch id="smsNotifications" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reminderNotifications">Reminders</Label>
                      <p className="text-sm text-muted-foreground">Daily reminders for your health activities</p>
                    </div>
                    <Switch id="reminderNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="goalNotifications">Goal Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates on your progress towards goals</p>
                    </div>
                    <Switch id="goalNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="achievementNotifications">Achievements</Label>
                      <p className="text-sm text-muted-foreground">Notifications when you earn achievements</p>
                    </div>
                    <Switch id="achievementNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="tipsNotifications">Tips & Insights</Label>
                      <p className="text-sm text-muted-foreground">Health tips and personalized insights</p>
                    </div>
                    <Switch id="tipsNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="updateNotifications">App Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications about new features and updates</p>
                    </div>
                    <Switch id="updateNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingNotifications">Marketing</Label>
                      <p className="text-sm text-muted-foreground">Promotional offers and newsletters</p>
                    </div>
                    <Switch id="marketingNotifications" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quiet Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quietHoursStart">Start Time</Label>
                    <Select defaultValue="22">
                      <SelectTrigger id="quietHoursStart">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietHoursEnd">End Time</Label>
                    <Select defaultValue="7">
                      <SelectTrigger id="quietHoursEnd">
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="quietHoursEnabled">Enable Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">Don't send notifications during these hours</p>
                  </div>
                  <Switch id="quietHoursEnabled" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Sharing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shareAnalytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Share anonymous usage data to improve our service</p>
                    </div>
                    <Switch id="shareAnalytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shareCrashReports">Crash Reports</Label>
                      <p className="text-sm text-muted-foreground">Share crash reports to help us fix issues</p>
                    </div>
                    <Switch id="shareCrashReports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shareHealthData">Health Data Research</Label>
                      <p className="text-sm text-muted-foreground">
                        Contribute anonymized health data for research purposes
                      </p>
                    </div>
                    <Switch id="shareHealthData" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                    </div>
                    <Select defaultValue="private">
                      <SelectTrigger id="profileVisibility" className="w-[180px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activityVisibility">Activity Visibility</Label>
                      <p className="text-sm text-muted-foreground">Control who can see your health activities</p>
                    </div>
                    <Select defaultValue="friends">
                      <SelectTrigger id="activityVisibility" className="w-[180px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="searchable">Searchable Profile</Label>
                      <p className="text-sm text-muted-foreground">Allow others to find you by name or email</p>
                    </div>
                    <Switch id="searchable" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-2" />
                      Setup
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sessionTimeout">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after a period of inactivity
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger id="sessionTimeout" className="w-[180px]">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="biometricLogin">Biometric Login</Label>
                      <p className="text-sm text-muted-foreground">Use fingerprint or face recognition to log in</p>
                    </div>
                    <Switch id="biometricLogin" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    <User className="h-4 w-4 mr-2" />
                    Request Account Deletion
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Data export includes all your health records, activities, and account information in a portable
                  format.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
