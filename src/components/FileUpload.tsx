import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import type { DataRow } from "@/pages/Index";

interface FileUploadProps {
  onDataUploaded: (data: DataRow[], columns: string[]) => void;
}

export const FileUpload = ({ onDataUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): { data: DataRow[]; columns: string[] } => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const data: DataRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const row: DataRow = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        // Try to parse as number
        const numValue = parseFloat(value);
        row[header] = isNaN(numValue) ? value : numValue;
      });
      
      data.push(row);
    }

    return { data, columns: headers };
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setIsLoading(true);
    try {
      const text = await file.text();
      const { data, columns } = parseCSV(text);
      
      if (data.length === 0) {
        throw new Error('No data found in CSV file');
      }

      toast.success(`Successfully loaded ${data.length} rows`);
      onDataUploaded(data, columns);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to parse CSV file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card
        className={`
          relative overflow-hidden border-2 border-dashed bg-gradient-card shadow-card backdrop-blur-sm transition-all
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50'}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            {isLoading ? (
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            ) : (
              <Upload className="h-12 w-12 text-primary" />
            )}
          </div>

          <h3 className="mb-2 text-2xl font-semibold">Upload Your Data</h3>
          <p className="mb-6 text-muted-foreground">
            Drag and drop your CSV file here, or click to browse
          </p>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            size="lg"
            className="mb-6"
          >
            <FileSpreadsheet className="mr-2 h-5 w-5" />
            Choose File
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mx-auto max-w-md rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p className="text-left">
                <strong>Supported format:</strong> CSV files with headers in the first row. 
                The app will automatically detect numeric and text columns.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
