"use client";

import PageContainer from "@/components/page-container";
import AssignmentsManager from "@/features/assignments/components/assignments-manager";

export default function AssignmentsPage() {
  return (
    <PageContainer title="Assignments" subtitle="Manage agent and sales manager assignments">
      <AssignmentsManager />
    </PageContainer>
  );
}
