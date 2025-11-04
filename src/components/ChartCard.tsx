import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { DataRow } from "@/pages/Index";

interface ChartCardProps {
  data: DataRow[];
  column: string;
  type: 'bar' | 'line' | 'area' | 'pie';
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export const ChartCard = ({ data, column, type }: ChartCardProps) => {
  const chartData = data.slice(0, 20).map((row, idx) => ({
    name: `Row ${idx + 1}`,
    value: row[column] as number,
  }));

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={3} />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-3))" 
              fill="hsl(var(--chart-3))"
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData.slice(0, 8)}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="hsl(var(--chart-1))"
              dataKey="value"
            >
              {chartData.slice(0, 8).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        );
    }
  };

  const titles = {
    bar: `${column} Distribution`,
    line: `${column} Trend`,
    area: `${column} Area`,
    pie: `${column} Breakdown`,
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>{titles[type]}</CardTitle>
        <CardDescription>First 20 records</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
