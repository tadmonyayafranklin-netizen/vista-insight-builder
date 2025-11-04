import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import type { DataRow } from "@/pages/Index";

interface InsightsPanelProps {
  data: DataRow[];
  columns: string[];
}

export const InsightsPanel = ({ data, columns }: InsightsPanelProps) => {
  const generateInsights = () => {
    const insights = [];

    if (columns.length > 0) {
      const firstCol = columns[0];
      const values = data.map(row => row[firstCol] as number).filter(v => !isNaN(v));
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const max = Math.max(...values);
      
      insights.push({
        type: 'trend',
        message: `Average ${firstCol} is ${avg.toFixed(2)}, with a peak of ${max.toFixed(2)}`,
        icon: TrendingUp,
        color: 'text-chart-2',
      });
    }

    if (data.length > 100) {
      insights.push({
        type: 'volume',
        message: `Large dataset detected with ${data.length} records. Performance optimizations applied.`,
        icon: AlertCircle,
        color: 'text-chart-4',
      });
    }

    if (columns.length >= 3) {
      insights.push({
        type: 'correlation',
        message: `${columns.length} dimensions available for analysis. Try filtering to discover patterns.`,
        icon: Sparkles,
        color: 'text-chart-3',
      });
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <Card className="border-primary/20 bg-gradient-card shadow-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Smart Insights</CardTitle>
            <CardDescription>AI-powered analysis of your data</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-3 rounded-lg bg-background/50 p-3 transition-all hover:bg-background/80"
            >
              <insight.icon className={`h-5 w-5 flex-shrink-0 ${insight.color}`} />
              <p className="text-sm leading-relaxed">{insight.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
