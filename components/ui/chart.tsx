"use client"

import type React from "react"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts"

// Create a default Chart component that can be used generically
const Chart = RechartsLineChart

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  )
}

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tooltip
      contentStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "none",
      }}
    >
      {children}
    </Tooltip>
  )
}

const ChartTooltipContent = () => {
  return null
}

const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return null
}

const ChartLegendContent = () => {
  return null
}

const ChartStyle = () => {
  return null
}

export {
  RechartsLineChart as LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RechartsAreaChart as AreaChart,
  Area,
  RechartsBarChart as BarChart,
  Bar,
  RechartsPieChart as PieChart,
  Pie,
  Cell,
  ReferenceLine,
  Chart, // Export the default Chart component
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
