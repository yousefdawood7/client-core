"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

import { DBHistoryLog } from "../types";

export const auditLogsColumns: ColumnDef<DBHistoryLog>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || "User"}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          <span className="font-medium text-foreground">
            {user?.name || "Unknown User"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const action = row.original.action;
      let colorClasses = "";
      let displayLabel = "";

      if (action === "create") {
        colorClasses =
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
        displayLabel = "CREATE";
      } else if (action === "update") {
        colorClasses =
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
        displayLabel = "UPDATE";
      } else {
        colorClasses =
          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
        displayLabel = "DELETE";
      }

      return (
        <Badge
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${colorClasses}`}
          variant="outline"
        >
          {displayLabel}
        </Badge>
      );
    },
  },
  {
    accessorKey: "entity",
    header: "Entity",
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.original.entity}</span>;
    },
  },
  {
    accessorKey: "oldValue",
    header: "Old Value",
    cell: ({ row }) => {
      const oldValue = row.original.oldValue;
      return !oldValue || oldValue === "—" ? (
        <span className="text-muted-foreground/50">—</span>
      ) : (
        <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          {oldValue}
        </span>
      );
    },
  },
  {
    accessorKey: "newValue",
    header: "New Value",
    cell: ({ row }) => {
      return (
        <span className="font-medium text-foreground bg-accent/50 px-1.5 py-0.5 rounded">
          {row.original.newValue}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return (
        <span className="text-muted-foreground text-xs">{formattedDate}</span>
      );
    },
  },
];
