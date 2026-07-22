"use client";
import { Action } from "@generated/prisma";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuditLogsFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  actionFilter: "all" | Action;
  setActionFilter: (value: "all" | Action) => void;
  resetPage: () => void;
}

export function AuditLogsFilters({
  search,
  setSearch,
  actionFilter,
  setActionFilter,
  resetPage,
}: AuditLogsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search user or entity…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>
      <Select
        value={actionFilter}
        onValueChange={(value) => {
          setActionFilter(value as "all" | Action);
          resetPage();
        }}
      >
        <SelectTrigger className="w-full sm:w-40 h-9">
          <SelectValue placeholder="All Actions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Actions</SelectItem>
          <SelectItem value="create">Create</SelectItem>
          <SelectItem value="update">Update</SelectItem>
          <SelectItem value="delete">Delete</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
