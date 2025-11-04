import { useState } from "react";
import { Upload } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FileUpload } from "@/components/FileUpload";
import { Dashboard } from "@/components/Dashboard";

export interface DataRow {
  [key: string]: string | number;
}

const Index = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleDataUpload = (uploadedData: DataRow[], uploadedColumns: string[]) => {
    setData(uploadedData);
    setColumns(uploadedColumns);
  };

  return (
    <div className="min-h-screen bg-background">
      {data.length === 0 ? (
        <>
          <Hero />
          <div className="container mx-auto px-4 pb-20">
            <FileUpload onDataUploaded={handleDataUpload} />
          </div>
        </>
      ) : (
        <Dashboard data={data} columns={columns} onReset={() => { setData([]); setColumns([]); }} />
      )}
    </div>
  );
};

export default Index;
