"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Check, MessageSquare, Settings, Trophy, X } from "lucide-react"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  type: "reminder" | "achievement" | "system" | "social"
  read: boolean
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Daily Water Goal Achieved!",
      description: "Congratulations! You've reached your daily water intake goal of 8 cups.",
      time: "Just now",
      type: "achievement",
      read: false,
    },
    {
      id: "2",
      title: "Workout Reminder",
      description: "Don't forget your scheduled HIIT workout today at 5:30 PM.",
      time: "2 hours ago",
      type: "reminder",
      read: false,
    },
    {
      id: "3",
      title: "Sleep Analysis Complete",
      description: "Your sleep analysis for the past week is ready to view.",
      time: "Yesterday",
      type: "system",
      read: false,
    },
    {
      id: "4",
      title: "New Achievement Unlocked",
      description: "You've earned the 'Early Bird' badge for consistent morning activities.",
      time: "2 days ago",
      type: "achievement",
      read: true,
    },
    {
      id: "5",
      title: "Sarah shared a workout",
      description: "Sarah shared their 'Morning Energizer' workout routine with you.",
      time: "3 days ago",
      type: "social",
      read: true,
    },
    {
      id: "6",
      title: "Weekly Health Report",
      description: "Your weekly health summary is now available. Check your progress!",
      time: "1 week ago",
      type: "system",
      read: true,
    },
    {
      id: "7",
      title: "Meditation Reminder",
      description: "Time for your daily 10-minute meditation session.",
      time: "1 week ago",
      type: "reminder",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "achievement":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "social":
        return <MessageSquare className="h-5 w-5 text-green-500" />
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated with your health journey</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
              <X className="h-4 w-4 mr-2" />
              Clear all
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Notification settings</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="relative">
                All
                {unreadCount > 0 && <Badge className="ml-2 px-1 py-0 h-5 min-w-5">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="unread" className="mt-4 space-y-4">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Check className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No unread notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="reminders" className="mt-4 space-y-4">
              {notifications.filter((n) => n.type === "reminder").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No reminders</h3>
                  <p className="text-muted-foreground">You don't have any reminder notifications</p>
                </div>
              ) : (
                notifications
                  .filter((notification) => notification.type === "reminder")
                  .map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="achievements" className="mt-4 space-y-4">
              {notifications.filter((n) => n.type === "achievement").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No achievements</h3>
                  <p className="text-muted-foreground">Keep going to earn achievements!</p>
                </div>
              ) : (
                notifications
                  .filter((notification) => notification.type === "achievement")
                  .map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="system" className="mt-4 space-y-4">
              {notifications.filter((n) => n.type === "system").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No system notifications</h3>
                  <p className="text-muted-foreground">You don't have any system notifications</p>
                </div>
              ) : (
                notifications
                  .filter((notification) => notification.type === "system")
                  .map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "achievement":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "social":
        return <MessageSquare className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`flex items-start gap-4 p-4 rounded-lg border ${
        !notification.read ? "bg-primary/5 border-primary/20" : ""
      }`}
    >
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className={`font-medium ${!notification.read ? "text-primary" : ""}`}>{notification.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notification.time}</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-1">
        {!notification.read && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMarkAsRead(notification.id)}>
            <Check className="h-4 w-4" />
            <span className="sr-only">Mark as read</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(notification.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </motion.div>
  )
}
