import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import {Button} from "../../components/ui/button.tsx";
import {Database, Download, FileSpreadsheet, Plus, Upload} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";
import {DataTable} from "../../components/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "../../components/ui/badge.tsx";
import {useState} from "react";
import {SearchableEventSelect} from "../../components/searchable-event-select.tsx";
import {CaretSortIcon} from "@radix-ui/react-icons";

type Participant = {
  id: string
  invoice: string
  name: string
  email: string
  phone: string
  status: "pending" | "confirmed" | "cancelled"
}

const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <CaretSortIcon/>
        </Button>
      )
    },
  },
  {
    accessorKey: "invoice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice
          <CaretSortIcon/>
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <CaretSortIcon/>
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon/>
        </Button>
      )
    },

  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No Telepon
          <CaretSortIcon/>
        </Button>
      )
    },

  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon/>
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className="m-1 h-9 w-full rounded-full flex items-center justify-center"
          variant={
            status === "pending"
              ? "secondary"
              : status === "confirmed"
              ? "default"
              : "outline"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
]

const data: Participant[] = [
  {
    id: "1",
    invoice: "INV001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    status: "pending",
  },
  {
    id: "2",
    invoice: "INV002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+0987654321",
    status: "confirmed",
  },
  {
    id: "3",
    invoice: "INV003",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1122334455",
    status: "cancelled",
  },
]

export default function AdminPage(){
   const [selectedStatus, setSelectedStatus] = useState("")
   return (
      <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
              <Button variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
              <Button variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="default">
                <Database className="mr-2 h-4 w-4" />
                Sync Database
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-1 gap-4 flex-wrap">
                <SearchableEventSelect />
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Add Peserta
              </Button>
            </div>

            {/* DataTable */}
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
   )
}