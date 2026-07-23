"use client";

import { DataTable } from "@/components/data-table";
import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { AuditLogsFilters } from "@/features/audit-logs/components/audit-logs-filters";
import { AuditLogsPagination } from "@/features/audit-logs/components/audit-logs-pagination";
import { auditLogsColumns } from "@/features/audit-logs/components/columns";
import { useAuditLogs } from "@/features/audit-logs/hooks/use-audit-logs";

export default function AuditLogsPage() {
  const {
    logs,
    total,
    loading,
    search,
    setSearch,
    actionFilter,
    setActionFilter,
    page,
    setPage,
    totalPages,
    limit,
    isError,
    error,
    refetch,
  } = useAuditLogs();

  return (
    <PageContainer
      title="Audit Logs"
      subtitle="Complete activity history — read-only"
    >
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <AuditLogsFilters
            search={search}
            setSearch={setSearch}
            actionFilter={actionFilter}
            setActionFilter={setActionFilter}
            resetPage={() => setPage(1)}
          />

          {isError ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 border border-destructive/20 bg-destructive/5 rounded-lg text-destructive">
              <span className="text-sm font-medium">Failed to load audit logs</span>
              <span className="text-xs text-muted-foreground">
                {error instanceof Error ? error.message : "An unexpected error occurred."}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="mt-2 text-foreground"
              >
                Try Again
              </Button>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 border rounded-lg">
              <Spinner className="h-6 w-6 text-primary" />
              <span className="text-xs text-muted-foreground">
                Loading audit logs...
              </span>
            </div>
          ) : (
            <>
              <DataTable columns={auditLogsColumns} data={logs} />

              <AuditLogsPagination
                total={total}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                limit={limit}
                loading={loading}
              />
            </>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
