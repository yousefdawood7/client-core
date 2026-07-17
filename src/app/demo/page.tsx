import DataTable from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

type User = {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Editor" | "User";
    status: "Active" | "Inactive";
};




export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllRowsSelected()}
    //             onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    // }
];
export const data: User[] = [
    {
        id: 1,
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Sara Ali",
        email: "sara@example.com",
        role: "Editor",
        status: "Active",
    },
    {
        id: 3,
        name: "Omar Hassan",
        email: "omar@example.com",
        role: "User",
        status: "Inactive",
    },
    {
        id: 4,
        name: "Mona Ibrahim",
        email: "mona@example.com",
        role: "User",
        status: "Active",
    },
];

function page() {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default page