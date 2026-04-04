"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { regionSearchStats } from "@/lib/data"
import { ChartTooltipContent } from "@/components/ui/chart"

export function OverviewChart() {
  return (
     <Card>
        <CardHeader>
            <CardTitle>أكثر المناطق بحثاً</CardTitle>
            <CardDescription>
                تحليل عمليات البحث لمعرفة المناطق الأكثر طلباً للخدمات.
            </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionSearchStats} layout="vertical" margin={{ right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={80} 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                            reversed
                        />
                        <Tooltip 
                            cursor={{fill: 'hsl(var(--secondary))'}} 
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar 
                            dataKey="total" 
                            radius={[4, 4, 0, 0]} 
                            fill="hsl(var(--primary))"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
