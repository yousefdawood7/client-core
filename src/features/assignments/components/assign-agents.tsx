"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Agent, COMPANIES, INITIAL_AGENTS } from "../constants";

export default function AssignAgents() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("c1");

  // Track company-to-agents assignment mapping state locally
  const [companyAssignments, setCompanyAssignments] = useState<
    Record<string, string[]>
  >({
    c1: ["1", "2", "3"],
    c2: ["4", "5"],
    c3: ["6"],
    c4: ["7"],
    c5: ["8"],
  });

  // Track checked state of list items
  const [checkedAvailableIds, setCheckedAvailableIds] = useState<Set<string>>(
    new Set(),
  );
  const [checkedAssignedIds, setCheckedAssignedIds] = useState<Set<string>>(
    new Set(),
  );

  const handleCompanyChange = (companyId: string | null) => {
    if (!companyId) return;

    setSelectedCompanyId(companyId);
    setCheckedAvailableIds(new Set());
    setCheckedAssignedIds(new Set());
  };

  const selectedCompany =
    COMPANIES.find((c) => c.id === selectedCompanyId) ?? COMPANIES[0];

  const assignedAgentIds = useMemo(() => {
    return companyAssignments[selectedCompanyId] || [];
  }, [companyAssignments, selectedCompanyId]);

  const assignedAgents = useMemo(() => {
    return INITIAL_AGENTS.filter((agent) =>
      assignedAgentIds.includes(agent.id),
    );
  }, [assignedAgentIds]);

  const availableAgents = useMemo(() => {
    return INITIAL_AGENTS.filter(
      (agent) => !assignedAgentIds.includes(agent.id),
    );
  }, [assignedAgentIds]);

  const toggleAvailableChecked = (agentId: string) => {
    setCheckedAvailableIds((prev) => {
      const next = new Set(prev);
      if (next.has(agentId)) {
        next.delete(agentId);
      } else {
        next.add(agentId);
      }
      return next;
    });
  };

  const toggleAssignedChecked = (agentId: string) => {
    setCheckedAssignedIds((prev) => {
      const next = new Set(prev);
      if (next.has(agentId)) {
        next.delete(agentId);
      } else {
        next.add(agentId);
      }
      return next;
    });
  };

  const moveToAssigned = () => {
    if (checkedAvailableIds.size === 0) return;

    setCompanyAssignments((prev) => {
      const currentAssigned = prev[selectedCompanyId] || [];
      const newlyAssigned = Array.from(checkedAvailableIds);
      return {
        ...prev,
        [selectedCompanyId]: [...currentAssigned, ...newlyAssigned],
      };
    });
    setCheckedAvailableIds(new Set());
  };

  const moveToAvailable = () => {
    if (checkedAssignedIds.size === 0) return;

    setCompanyAssignments((prev) => {
      const currentAssigned = prev[selectedCompanyId] || [];
      const updatedAssigned = currentAssigned.filter(
        (id) => !checkedAssignedIds.has(id),
      );
      return {
        ...prev,
        [selectedCompanyId]: updatedAssigned,
      };
    });
    setCheckedAssignedIds(new Set());
  };

  const handleSaveAgentAssignments = () => {
    toast.success(
      `Agent assignments saved successfully for ${selectedCompany.name}`,
    );
  };

  const availableColumns = useMemo<ColumnDef<Agent>[]>(
    () => [
      {
        id: "select",
        header: "",
        cell: ({ row }) => (
          <Checkbox
            checked={checkedAvailableIds.has(row.original.id)}
            onCheckedChange={() => toggleAvailableChecked(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Agent Name",
        cell: ({ row }) => {
          const agent = row.original;
          return (
            <div
              onClick={() => toggleAvailableChecked(agent.id)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <Avatar>
                <AvatarFallback
                  className={cn(agent.colorClass, "font-semibold text-white")}
                >
                  {agent.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {agent.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedCompany.name}
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    [checkedAvailableIds, selectedCompany.name],
  );

  // Define Assigned Columns
  const assignedColumns = useMemo<ColumnDef<Agent>[]>(
    () => [
      {
        id: "select",
        header: "",
        cell: ({ row }) => (
          <Checkbox
            checked={checkedAssignedIds.has(row.original.id)}
            onCheckedChange={() => toggleAssignedChecked(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Agent Name",
        cell: ({ row }) => {
          const agent = row.original;
          return (
            <div
              onClick={() => toggleAssignedChecked(agent.id)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <Avatar>
                <AvatarFallback
                  className={cn(
                    "size-8 rounded-full text-xs font-bold text-white",
                    agent.colorClass,
                  )}
                >
                  {agent.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {agent.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {agent.company}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {agent.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedCompany.name}
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    [checkedAssignedIds, selectedCompany],
  );

  return (
    <div className="space-y-6">
      {/* Select Company */}
      <div className="max-w-sm space-y-2">
        <label className="text-sm font-medium">Select Company</label>

        <Select value={selectedCompanyId} onValueChange={handleCompanyChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>

          <SelectContent>
            {COMPANIES.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transfer List */}
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Available */}
        <div className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Available ({availableAgents.length})
          </span>

          <DataTable columns={availableColumns} data={availableAgents} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-2 py-2 md:flex-col">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={moveToAssigned}
            disabled={checkedAvailableIds.size === 0}
          >
            <ChevronRight className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={moveToAvailable}
            disabled={checkedAssignedIds.size === 0}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>

        {/* Assigned */}
        <div className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Assigned ({assignedAgents.length})
          </span>

          <DataTable columns={assignedColumns} data={assignedAgents} />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2">
        <Button
          type="button"
          onClick={handleSaveAgentAssignments}
          className="gap-2"
        >
          <Check className="size-4" />
          Save Assignments
        </Button>
      </div>
    </div>
  );
}
