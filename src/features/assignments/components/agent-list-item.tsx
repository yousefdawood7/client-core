"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Agent } from "../constants";

interface AgentListItemProps {
  agent: Agent;
  isChecked: boolean;
  onToggle: () => void;
  checkboxId: string;
}

export default function AgentListItem({
  agent,
  isChecked,
  onToggle,
  checkboxId,
}: AgentListItemProps) {
  return (
    <div
      onClick={onToggle}
      className=" hover:bg-muted"
    >
      <Checkbox
        id={checkboxId}
        checked={isChecked}
        onCheckedChange={() => onToggle()}
        onClick={(e) => e.stopPropagation()}
      />

      <Avatar className="size-8">
        <AvatarFallback
          className={cn(
            "text-xs font-semibold text-white",
            agent.colorClass
          )}
        >
          {agent.initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {agent.name}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {agent.company}
        </p>
      </div>
    </div>
  );
}