import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Data for performance chart
const performanceData = [
  { day: 'Mon', Sent: 420, Opened: 280, Replied: 45, Booked: 6 },
  { day: 'Tue', Sent: 480, Opened: 310, Replied: 58, Booked: 12 },
  { day: 'Wed', Sent: 510, Opened: 380, Replied: 74, Booked: 18 },
  { day: 'Thu', Sent: 450, Opened: 290, Replied: 61, Booked: 9 },
  { day: 'Fri', Sent: 580, Opened: 420, Replied: 98, Booked: 24 },
  { day: 'Sat', Sent: 210, Opened: 150, Replied: 32, Booked: 4 },
  { day: 'Sun', Sent: 180, Opened: 120, Replied: 28, Booked: 2 },
];

// Data for funnel chart
const funnelData = [
  { name: 'Targeted Leads', value: 3200, color: '#6366f1' },
  { name: 'Emails Sent', value: 2840, color: '#818cf8' },
  { name: 'Emails Opened', value: 1780, color: '#a78bfa' },
  { name: 'Replies Received', value: 342, color: '#fbbf24' },
  { name: 'Meetings Booked', value: 65, color: '#10b981' },
];

// Custom styled tooltips
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/80 shadow-xl rounded-xl p-3.5 space-y-1 text-xs select-none">
        <p className="font-extrabold text-slate-800 dark:text-slate-200">{label}</p>
        <div className="space-y-0.5">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center gap-2" style={{ color: entry.color }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-semibold text-muted-foreground">{entry.name}:</span>
              <span className="font-bold text-slate-900 dark:text-white">{entry.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const PerformanceChart: React.FC = () => {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={performanceData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            name="Sent"
            type="monotone"
            dataKey="Sent"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSent)"
          />
          <Area
            name="Opened"
            type="monotone"
            dataKey="Opened"
            stroke="#a78bfa"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOpened)"
          />
          <Area
            name="Replied"
            type="monotone"
            dataKey="Replied"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorReplied)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ConversionFunnelChart: React.FC = () => {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={funnelData}
          layout="vertical"
          margin={{ top: 15, right: 20, left: 30, bottom: 5 }}
          barSize={18}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148, 163, 184, 0.08)" />
          <XAxis 
            type="number" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(99, 102, 241, 0.03)' }}
            content={({ active, payload }: any) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-border/80 shadow-xl rounded-xl p-3 space-y-0.5 text-xs select-none">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{payload[0].payload.name}</p>
                    <p className="text-muted-foreground flex gap-1 items-center">
                      Volume: <span className="font-black text-slate-900 dark:text-white">{payload[0].value} leads</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
