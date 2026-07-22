"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AssignAgents from "./assign-agents";
import AssignSalesManagers from "./assign-sales-managers";

export default function AssignmentsManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Assignments</h1>

        <p className="text-sm text-muted-foreground">
          Manage agent and sales manager assignments
        </p>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents">Assign Agents</TabsTrigger>

          <TabsTrigger value="managers">Assign Sales Managers</TabsTrigger>
        </TabsList>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <TabsContent value="agents">
            <AssignAgents />
          </TabsContent>

          <TabsContent value="managers">
            <AssignSalesManagers />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
