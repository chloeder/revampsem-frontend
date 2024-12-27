import React from 'react';
import * as XLSX from 'xlsx';
import {Button} from "../../../components/ui/button.tsx";
import {Download} from "lucide-react";

// Define interfaces for our data structures
interface ExportData {
  [key: string]: string | number | boolean | Date;
}

interface ExcelExportProps {
  data: ExportData[];
  filename?: string;
  sheetName?: string;
  text?: string;
  customHeaders?: { [key: string]: string };
}

const ExcelExportXLSX: React.FC<ExcelExportProps> = ({
  data,
  filename = 'export.xlsx',
  sheetName = 'Sheet1',
  text = 'Download Excel',
  customHeaders
}) => {
   // Function to capitalize first letter of each word
  const capitalizeFirstLetter = (str: string): string => {
    // Split by spaces and underscores
    return str.split(/[\s_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Function to convert camelCase to space-separated words and capitalize
  const formatHeader = (header: string): string => {
    // Handle camelCase
    const spacedHeader = header.replace(/([A-Z])/g, ' $1');
    return capitalizeFirstLetter(spacedHeader);
  };

  const exportToXLSX = () => {
    try {
      // Get original headers
      const originalHeaders = Object.keys(data[0]);
      
      // Create formatted headers mapping if not provided
      const formattedHeaders = originalHeaders.reduce((acc, header) => {
        acc[header] = customHeaders?.[header] || formatHeader(header);
        return acc;
      }, {} as { [key: string]: string });

      // Prepare the data with formatted headers
      const processedData = data.map(row => {
        const processedRow: ExportData = {};
        Object.keys(row).forEach(key => {
          const headerKey = formattedHeaders[key];
          let value = row[key];
          
          // Format dates
          if (value instanceof Date) {
            value = value.toLocaleDateString();
          }
          
          processedRow[headerKey] = value;
        });
        return processedRow;
      });

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(processedData, {
        header: Object.values(formattedHeaders)
      });

      // Enhanced styling for headers
      const headerStyle = {
        font: {
          bold: true,
          color: { rgb: "000000" },
          sz: 12,
          name: "Arial"
        },
        fill: {
          fgColor: { rgb: "E0E0E0" },
          patternType: "solid"
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
          wrapText: true
        },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" }
        }
      };

      // Apply enhanced header styling
      for (let i = 0; i < Object.values(formattedHeaders).length; i++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
        if (!ws[cellRef]) continue;
        ws[cellRef].s = headerStyle;
      }

      // Set column widths based on header content
      const colWidths = Object.values(formattedHeaders).map(header => ({
        wch: Math.max(header.length * 1.2, 12) // Multiply by 1.2 for better readability
      }));
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      // Generate and download file
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('An error occurred while exporting to Excel. Please try again.');
    }
  };

  return (
    <Button variant="outline" onClick={exportToXLSX}>
       <Download className="mr-2 h-4 w-4" />
       {text}
    </Button>
  );
};

export default ExcelExportXLSX;