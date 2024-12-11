import {CaretSortIcon, DotsHorizontalIcon, PlusCircledIcon,} from "@radix-ui/react-icons"
import {ColumnDef,} from "@tanstack/react-table"

import {Button} from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {Badge} from "../../components/ui/badge"
import {Card, CardContent} from "../../components/ui/card.tsx";
import {DataTable} from "../../components/data-table.tsx";
import {useFindUsers} from "../../services/users/hooks/use-find-users.ts";

const data = [
  {
    id: "1",
    username: "admin",
    displayName: "Desta Admin",
    resetStatus: "No request",
  },
  {
    id: "2",
    username: "aclub",
    displayName: "A-CLUB Admin",
    resetStatus: "No request",
  },
  {
    id: "3",
    username: "user_admin",
    displayName: "User Admin",
    resetStatus: "No request",
  },
  {
    id: "4",
    username: "desta",
    displayName: "Desta Admin",
    resetStatus: "No request",
  },
  {
    id: "5",
    username: "ashop",
    displayName: "A-SHOP",
    resetStatus: "No request",
  },
  {
    id: "6",
    username: "cat_institute",
    displayName: "CAT Institute",
    resetStatus: "No request",
  },
  {
    id: "7",
    username: "orbi_trade",
    displayName: "ORBI Trade",
    resetStatus: "No request",
  },
  {
    id: "8",
    username: "sekuritas",
    displayName: "Sekuritas Astronacci",
    resetStatus: "No request",
  },
  {
    id: "9",
    username: "developer",
    displayName: "Developer",
    resetStatus: "No request",
  },
]

const columns: ColumnDef<typeof data[0]>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <CaretSortIcon />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <CaretSortIcon />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Display Name
          <CaretSortIcon />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("displayName")}</div>,
  },
  {
    accessorKey: "resetStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reset Password
          <CaretSortIcon/>
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
        {row.getValue("resetStatus")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function SuperAdminPage() {
  const { data: users } = useFindUsers()
  console.log(users)
  
  return (
    <Card>
      <CardContent>
        <div className="w-full">
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button>
                  <PlusCircledIcon className="mr-2 h-4 w-4"/>
                  Add User
                </Button>
                <Button variant="secondary">
                  <PlusCircledIcon className="mr-2 h-4 w-4"/>
                  Setup Google Form
                </Button>
              </div>
            </div>
            
            <DataTable columns={columns} data={users} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}