"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    status: "New",
    value: 6,
    fill: "#2563EB",
  },
  {
    status: "Contacted",
    value: 3,
    fill: "#0EA5E9",
  },
  {
    status: "Qualified",
    value: 3,
    fill: "#0891B2",
  },
  {
    status: "Converted",
    value: 2,
    fill: "#22C55E",
  },
  {
    status: "Lost",
    value: 2,
    fill: "#EF4444",
  },
];

type CustomBarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    fill?: string;
  };
};

const CustomBar = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}: CustomBarProps) => {
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={payload?.fill}
      radius={[8, 8, 0, 0]}
    />
  );
};

export default function DashBarChart() {
  return (
    <div className="h-[320px] rounded-xl border p-3 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="20%"
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#E2E8F0"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="status"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "slate-500", 
              fontSize: 12,
              fontWeight: 500,
            }}
            dy={8}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#64748B",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,.08)",
            }}
            labelStyle={{
              fontWeight: 600,
              color: "#0F172A",
            }}
            itemStyle={{
              color: "#334155",
            }}
          />

          <Bar
            dataKey="value"
            barSize={40}
            shape={(props) => <CustomBar {...props} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
