import { useState } from "react";
import { ArrowLeft, Download, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { ChartCard } from "@/components/ChartCard";
import type { DataRow } from "@/pages/Index";

interface DashboardProps {
  data: DataRow[];
  columns: string[];
  onReset: () => void;
}

export const Dashboard = ({ data, columns, onReset }: DashboardProps) => {
  const numericColumns = columns.filter(col => 
    typeof data[0]?.[col] === 'number'
  );

  const calculateKPI = (column: string, operation: 'sum' | 'avg' | 'max' | 'min' = 'sum'): number => {
    const values = data.map(row => row[column] as number).filter(v => !isNaN(v));
    
    switch (operation) {
      case 'sum':
        return values.reduce((acc, val) => acc + val, 0);
      case 'avg':
        return values.reduce((acc, val) => acc + val, 0) / values.length;
      case 'max':
        return Math.max(...values);
      case 'min':
        return Math.min(...values);
      default:
        return 0;
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const kpis = numericColumns.slice(0, 4).map((col, idx) => {
    const icons = [TrendingUp, Users, DollarSign, Activity];
    const Icon = icons[idx] || TrendingUp;
    const value = calculateKPI(col, idx % 2 === 0 ? 'sum' : 'avg');
    
    return {
      title: col,
      value: formatNumber(value),
      change: '+12.5%',
      icon: Icon,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onReset}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Upload
            </Button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, idx) => (
            <Card key={idx} className="bg-gradient-card shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-accent">
                  {kpi.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {numericColumns.slice(0, 4).map((col, idx) => (
            <ChartCard
              key={col}
              data={data}
              column={col}
              type={['bar', 'line', 'area', 'pie'][idx % 4] as any}
            />
          ))}
        </div>

        {/* Data Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
            <CardDescription>
              Showing {data.length} rows × {columns.length} columns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={data} columns={columns} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
