import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import {Button} from "../../components/ui/button.tsx";
import {Database, FileSpreadsheet, Plus, Upload} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";
import {DataTable} from "../../components/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {SearchableEventSelect} from "../../components/searchable-event-select.tsx";
import {CaretSortIcon} from "@radix-ui/react-icons";
import ExcelExportXLSX from "./components/export-excel-xlsx.tsx";
import {ModalForm} from "../../components/modal-form.tsx";
import {useFindAttendance} from "../../services/event/hooks/use-find-attendance.ts";
import FormImportData from "./components/form-import-data.tsx";

type Participant = {
  id: string
  invoice: string
  name: string
  email: string
  phone: string
  status: string
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
    accessorKey: "attendance",
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
    cell: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [openApproveModal, setOpenApproveModal] = useState(false)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [openUpdateModal, setOpenUpdateModal] = useState(false)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [openDeleteModal, setOpenDeleteModal] = useState(false)
      return (
        <div className={'flex gap-2 justify-center'}>
          <ModalForm open={openApproveModal} setOpen={setOpenApproveModal} title={"Import Data Seminar"} triggerText={
            <Button size={'sm'} className={'rounded-2xl bg-amber-500 hover:bg-amber-400'}>
              Approve
            </Button>}>
            Test
          </ModalForm>
          <ModalForm open={openUpdateModal} setOpen={setOpenUpdateModal} title={"Import Data Seminar"} triggerText={
            <Button size={'sm'} className={'rounded-2xl  bg-blue-500 hover:bg-blue-400'}>
              Update
            </Button>}>
            Test
          </ModalForm>
          <ModalForm open={openDeleteModal} setOpen={setOpenDeleteModal} title={"Import Data Seminar"} triggerText={
            <Button size={'sm'} variant="destructive" className={'rounded-2xl'}>
              Delete
            </Button>}>
            Test
          </ModalForm>
        </div>
      )
    },  },
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
   const [openImportModal, setOpenImportModal] = useState(false)
   const [eventID, setEventID] = useState("")
   const {data: attendees, refetch} = useFindAttendance(eventID)
   const attendeesData = attendees?.data || []
  console.log(eventID)
  
  useEffect(() => {
    refetch()
  }, [eventID, refetch])
   
   return (
      <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <ExcelExportXLSX data={data} filename={`Template Seminar ${new Date().getFullYear()}.xlsx`} text={'Download Template'} />
              <ModalForm open={openImportModal} setOpen={setOpenImportModal} title={"Import Data Seminar"} triggerText={
                  <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Data
                  </Button>
              }>
                <FormImportData />
              </ModalForm>

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
                <SearchableEventSelect onSelect={
                  (event) => {
                    setEventID(event?.id.toString() === eventID ? "" : event?.id.toString() || "")
                  }
                }/>
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
            <DataTable columns={columns} data={attendeesData} />
          </CardContent>
        </Card>
   )
}