"use client"

import type { HistoricalDataPoint } from "@/lib/types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type HistoricalChartProps = {
  historicalData: HistoricalDataPoint[];
};

const glassmorphismStyle = "bg-card/30 backdrop-blur-sm border border-white/20 shadow-lg text-white";

const HistoricalChart = ({ historicalData }: HistoricalChartProps) => {
  return (
    <Card className={glassmorphismStyle}>
      <CardHeader>
        <CardTitle className="text-white">10-Year Climate Trends</CardTitle>
        <CardDescription className="text-white/80">Average temperature for this date over the last decade.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis
                dataKey="year"
                stroke="hsl(var(--foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />
               <ChartTooltip 
                cursor={false}
                content={<ChartTooltipContent 
                  indicator="dot" 
                  className="bg-card/80 backdrop-blur-sm border-white/30"
                  labelClassName="font-bold"
                  />}
              />
              <Bar dataKey="avgTemp" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;
