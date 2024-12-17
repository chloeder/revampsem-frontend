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
import {UserEntity} from "../../services/users/entity/UserEntity.ts";
import {ModalForm} from "../../components/modal-form.tsx";
import {FormCreateUser} from "./components/form-create-user.tsx";
import {useState} from "react";
import {FormEditUser} from "./components/form-edit-user.tsx";

export default function SuperAdminPage() {
  const [openCreate, setOpenCreate] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const { data } = useFindUsers()
  const columns: ColumnDef<UserEntity>[] = [
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
    cell: ({ row }) => <div className="">{row.index+1}</div>,
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
    accessorKey: "display_name",
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
    cell: ({ row }) => <div>{row.getValue("display_name")}</div>,
  },
  {
    accessorKey: "reset_password",
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
      <Badge variant="secondary" className="bg-zinc-100">
        {row.getValue("reset_password")  ? "Yes Request" : "No Request"}
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user?.id.toString())}>
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ModalForm open={openUpdate} setOpen={setOpenUpdate} title={"Edit User"} triggerText={<span>Edit User</span>}>
                <FormEditUser setOpen={setOpenUpdate} userId={user?.id}/>
              </ModalForm>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
  
  return (
    <Card>
      <CardContent>
        <div className="w-full">
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ModalForm open={openCreate} setOpen={setOpenCreate} title={"Create User"} triggerText={
                  <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4"/>
                    Add User
                  </Button>}>
                  <FormCreateUser setOpen={setOpenCreate}/>
                </ModalForm>
                <Button variant="secondary">
                  <PlusCircledIcon className="mr-2 h-4 w-4"/>
                  Setup Google Form
                </Button>
              </div>
            </div>
            
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}