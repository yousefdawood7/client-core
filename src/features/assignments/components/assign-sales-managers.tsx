"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Company, COMPANIES, SALES_MANAGERS } from "../constants";

export default function AssignSalesManagers() {
  const [selectedManagerId, setSelectedManagerId] = useState<string>("m1");
  
  const [managerAssignments, setManagerAssignments] = useState<Record<string, string[]>>({
    m1: ["c1", "c4"],
    m2: ["c2", "c5"],
    m3: ["c3"]
  });

const selectedManager =
  SALES_MANAGERS.find((m) => m.id === selectedManagerId) ??
  SALES_MANAGERS[0];

const currentlyManagedCompanyIds =
  managerAssignments[selectedManagerId] ?? [];

  const toggleCompanyAssignment = (companyId: string) => {
    setManagerAssignments(prev => {
      const current = prev[selectedManagerId] || [];
      const next = current.includes(companyId) 
        ? current.filter(id => id !== companyId)
        : [...current, companyId];
      return {
        ...prev,
        [selectedManagerId]: next
      };
    });
  };

  const handleSaveManagerAssignments = () => {
    toast.success(`Company assignments saved successfully for Sales Manager ${selectedManager.name}`);
  };

  // Define Columns for the companies list
  const columns = useMemo<ColumnDef<Company>[]>(() => [
    {
      id: "select",
      header: "",
      cell: ({ row }) => {
        const company = row.original;
        const isChecked = currentlyManagedCompanyIds.includes(company.id);
        return (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleCompanyAssignment(company.id)}
          />
        );
      },
      size: 40,
    },
    {
      accessorKey: "name",
      header: "Company",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div 
            onClick={() => toggleCompanyAssignment(company.id)}
            className="flex flex-col cursor-pointer select-none"
          >
            <div className="text-sm font-semibold text-foreground">{company.name}</div>
            <div className="text-xs text-muted-foreground">{company.agentsCount} agents</div>
          </div>
        );
      }
    },
    {
      id: "status",
      header: "",
      cell: ({ row }) => {
        const company = row.original;
        const isChecked = currentlyManagedCompanyIds.includes(company.id);
        return isChecked ? <Check className="ml-auto h-5 w-5 text-primary" /> : null;
      }
    }
  ], [currentlyManagedCompanyIds]);

  return (
    <div className="space-y-6 max-w-xl">
      {/* Select Sales Manager Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Select Sales Manager <span className="text-destructive">*</span>
        </label>

        <Select
          value={selectedManagerId}
          onValueChange={(value) => {
            if (value) {
              setSelectedManagerId(value);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sales Manager" />
          </SelectTrigger>

          <SelectContent>
            {SALES_MANAGERS.map((manager) => (
              <SelectItem
                key={manager.id}
                value={manager.id}
              >
                {manager.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/*  Companies Checkbox List */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground block">
          Assign Companies 
        <span className="text-destructive">*</span>
        </label>
        
        <div className="overflow-hidden rounded-md border bg-background">
          <DataTable columns={columns} data={COMPANIES} />
        </div>
      </div>

      {/* Selection Counter Text */}
      <div className="text-sm font-medium text-primary">
        {currentlyManagedCompanyIds.length} companies selected
      </div>

      {/* Bottom Actions */}
      <div className="pt-2">
        <Button 
          type="button"
          onClick={handleSaveManagerAssignments}
          className="gap-2"        >
          <Check className="h-4 w-4" />
          Save Assignments
        </Button>
      </div>
    </div>
  );
}
