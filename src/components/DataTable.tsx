import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DataRow } from "@/pages/Index";

interface DataTableProps {
  data: DataRow[];
  columns: string[];
}

export const DataTable = ({ data, columns }: DataTableProps) => {
  const displayData = data.slice(0, 100); // Show first 100 rows

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-muted">
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            {columns.map(col => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium text-muted-foreground">{idx + 1}</TableCell>
              {columns.map(col => (
                <TableCell key={col}>
                  {typeof row[col] === 'number' 
                    ? row[col].toLocaleString() 
                    : row[col]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
