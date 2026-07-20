"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import FormDialog from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  CreateCompanySchema,
  createCompanySchema,
} from "@/features/companies/schema";

type User = {
  compnay: string;
  email: string;
  agent: string;
  salesManager: string;
  created: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "compnay",
    header: "Compnay",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div>
          <div className="font-medium">{item.compnay}</div>
          <div className="text-xs text-muted-foreground">{item.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
  },
  {
    accessorKey: "salesManager",
    header: "Sales Manager",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex items-center gap-2 ">
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      );
    },
  },
];
export const data: User[] = [
  {
    compnay: "TechVision Solutions",
    email: "techvision.com",
    agent: "3 agents",
    salesManager: "Sarah Chen",
    created: "Jan 15, 2024",
  },
  {
    compnay: "Global Commerce Ltd",
    email: "globalcommerce.com",
    agent: "2 agents",
    salesManager: "Marcus Rodriguez",
    created: "Feb 8, 2024",
  },
  {
    compnay: "Nexus Retail Group",
    email: "nexusretail.com",
    agent: "3 agents",
    salesManager: "Emma Thompson",
    created: "Feb 20, 2024",
  },
  {
    compnay: "Prime Digital Agency",
    email: "primedigital.com",
    agent: "2 agents",
    salesManager: "Sarah Chen",
    created: "Mar 5, 2024",
  },
  {
    compnay: "Apex Market Partners",
    email: "apexmarket.com",
    agent: "1 agents",
    salesManager: "Marcus Rodriguez",
    created: "Mar 18, 2024",
  },
];

export default function CompanyInfo() {
  const confirm = useForm<CreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    values: {
      companyName: "",
      salesManager: "",
    },
  });

  const onSubmit = () => {};

  return (
    <>
      <FormDialog
        trigger={<Button variant="default">+ Add Company</Button>}
        title="Add Company"
        submitText="Create"
        form={confirm}
        onSubmit={onSubmit}
      >
        <FormField
          label="Company Name"
          name="companyName"
          placeholder="Enter your company name"
        />

        <FormField
          label="Sales Manager"
          name="salesManager"
          placeholder="Enter name of sales manager"
        />
      </FormDialog>
      <div className="container mx-auto">
        <Input type="text" placeholder="search" className="mt-4 w-80" />
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
