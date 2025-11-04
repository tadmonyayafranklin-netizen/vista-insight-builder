import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search } from "lucide-react";
import type { DataRow } from "@/pages/Index";

interface FilterPanelProps {
  data: DataRow[];
  columns: string[];
  onFilter: (filteredData: DataRow[]) => void;
}

export const FilterPanel = ({ data, columns, onFilter }: FilterPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<string>(columns[0] || "");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedColumn, minValue, maxValue]);

  const applyFilters = () => {
    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Range filter for numeric columns
    if (selectedColumn && (minValue || maxValue)) {
      filtered = filtered.filter(row => {
        const value = row[selectedColumn];
        if (typeof value !== 'number') return true;
        
        const min = minValue ? parseFloat(minValue) : -Infinity;
        const max = maxValue ? parseFloat(maxValue) : Infinity;
        
        return value >= min && value <= max;
      });
    }

    onFilter(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setMinValue("");
    setMaxValue("");
    onFilter(data);
  };

  const numericColumns = columns.filter(col => typeof data[0]?.[col] === 'number');

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Data Filters</CardTitle>
            <CardDescription>Refine your dataset to discover insights</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search All Columns</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search across all data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {numericColumns.length > 0 && (
          <>
            <div className="space-y-2">
              <Label>Filter by Column</Label>
              <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {numericColumns.map(col => (
                    <SelectItem key={col} value={col}>
                      {col}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min">Min Value</Label>
                <Input
                  id="min"
                  type="number"
                  placeholder="Minimum"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max Value</Label>
                <Input
                  id="max"
                  type="number"
                  placeholder="Maximum"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
