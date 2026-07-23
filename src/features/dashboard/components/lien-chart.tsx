"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Mar 1", leads: 2 },
  { date: "Mar 3", leads: 1 },
  { date: "Mar 5", leads: 3 },
  { date: "Mar 7", leads: 4 },
  { date: "Mar 9", leads: 2 },
  { date: "Mar 11", leads: 3 },
  { date: "Mar 13", leads: 1 },
  { date: "Mar 15", leads: 2 },
];

export default function  LienChart() {
  return (
    <div
      className="h-[320px] rounded-xl border p-3 shadow-sm"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          />

          <Line
            type="monotone"
            dataKey="leads"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#2563EB",
              stroke: "#2563EB",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#2563EB",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
