import { useState, useMemo } from "react";
import { ArrowLeft, Download, TrendingUp, Users, DollarSign, Activity, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { ChartCard } from "@/components/ChartCard";
import { InsightsPanel } from "@/components/InsightsPanel";
import { FilterPanel } from "@/components/FilterPanel";
import type { DataRow } from "@/pages/Index";

interface DashboardProps {
  data: DataRow[];
  columns: string[];
  onReset: () => void;
}

export const Dashboard = ({ data, columns, onReset }: DashboardProps) => {
  const [filteredData, setFilteredData] = useState<DataRow[]>(data);
  const [showFilters, setShowFilters] = useState(false);

  const numericColumns = useMemo(() => 
    columns.filter(col => typeof data[0]?.[col] === 'number'),
    [columns, data]
  );

  const calculateKPI = (column: string, operation: 'sum' | 'avg' | 'max' | 'min' = 'sum'): number => {
    const values = filteredData.map(row => row[column] as number).filter(v => !isNaN(v));
    
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

  const kpis = useMemo(() => 
    numericColumns.slice(0, 4).map((col, idx) => {
      const icons = [TrendingUp, Users, DollarSign, Activity];
      const Icon = icons[idx] || TrendingUp;
      const value = calculateKPI(col, idx % 2 === 0 ? 'sum' : 'avg');
      
      return {
        title: col,
        value: formatNumber(value),
        change: '+12.5%',
        icon: Icon,
      };
    }),
    [numericColumns, filteredData]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onReset} className="hover:scale-105 transition-transform">
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Upload
            </Button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <span className="text-sm text-muted-foreground">
              {filteredData.length} / {data.length} rows
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="hover:scale-105 transition-transform"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Insights Panel */}
        <div className="mb-8 animate-fade-in">
          <InsightsPanel data={filteredData} columns={numericColumns} />
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 animate-slide-in-right">
            <FilterPanel 
              data={data} 
              columns={columns} 
              onFilter={setFilteredData}
            />
          </div>
        )}

        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, idx) => (
            <Card 
              key={idx} 
              className="bg-gradient-card shadow-card hover:shadow-lg transition-all hover:scale-[1.02] animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <div className="rounded-full bg-primary/10 p-2">
                  <kpi.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-accent flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {numericColumns.slice(0, 4).map((col, idx) => (
            <div 
              key={col}
              className="animate-fade-in"
              style={{ animationDelay: `${(idx + 4) * 0.1}s` }}
            >
              <ChartCard
                data={filteredData}
                column={col}
                type={['bar', 'line', 'area', 'pie'][idx % 4] as any}
              />
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
              <CardDescription>
                Showing {filteredData.length} rows × {columns.length} columns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={filteredData} columns={columns} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
