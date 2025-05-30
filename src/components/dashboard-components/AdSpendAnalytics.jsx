import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "Jan", expense: 520 },
  { month: "Feb", expense: 120 },
  { month: "Mar", expense: 480 },
  { month: "Apr", expense: 300 },
  { month: "May", expense: 580 },
  { month: "Jun", expense: 200 },
  { month: "Jul", expense: 60 },
  { month: "Aug", expense: 340 },
  { month: "Sep", expense: 540 },
  { month: "Oct", expense: 490 },
  { month: "Nov", expense: 430 },
  { month: "Dec", expense: 320 },
];

const quarterlyData = [
  { month: "Q1", expense: 1120 },
  { month: "Q2", expense: 1080 },
  { month: "Q3", expense: 940 },
  { month: "Q4", expense: 1240 },
];

const yearlyData = [
  { month: "2022", expense: 4200 },
  { month: "2023", expense: 4800 },
  { month: "2024", expense: 5100 },
];

const AdSpendsAnalytics = () => {
  const [view, setView] = useState("Monthly");

  const getData = () => {
    if (view === "Quarterly") return quarterlyData;
    if (view === "Yearly") return yearlyData;
    return monthlyData;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ad Spends Analytics</h2>
        <select
          className="border border-[#445E94] rounded-md px-3 py-1 text-sm"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: view === "Yearly" ? "Year" : "Month", position: "insideBottom", offset: -5 }}
            />
            <YAxis label={{ value: "Budget", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-end mt-4">
          <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-md">
            <span className="w-3 h-3 rounded-full bg-yellow-600 inline-block"></span>
            <span className="text-sm">Expense</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSpendsAnalytics;
