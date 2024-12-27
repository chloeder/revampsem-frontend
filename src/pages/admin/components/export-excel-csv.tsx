import React from 'react';
import {Button} from "../../../components/ui/button.tsx";
import {Download} from "lucide-react";

// Define interfaces for our data structures
interface ExportData {
  [key: string]: string | number | boolean | Date;
}

interface ExcelExportProps {
  data: ExportData[];
  filename?: string;
}

const ExcelExportCSV: React.FC<ExcelExportProps> = ({
  data,
  filename = 'export.csv',
}) => {
  const downloadCSV = () => {
    // Convert data to CSV format
    const headers = Object.keys(data[0]);
    const csvContent = [
      // Add headers
      headers.join(','),
      // Add data rows
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          // Handle different data types
          if (value instanceof Date) {
            return value.toISOString();
          }
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create download URL
    const url = window.URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={downloadCSV}>
       <Download className="mr-2 h-4 w-4" />
       Download Template
    </Button>
  );
};

export default ExcelExportCSV;