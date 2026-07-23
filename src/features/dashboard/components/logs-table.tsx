import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { auditLogsColumns } from "@/features/audit-logs/components/columns";
import { useAuditLogs } from "@/features/audit-logs/hooks/use-audit-logs";

export default function LogsTable() {
  const { logs, loading, error, refetch, isError } = useAuditLogs();
  return (
    <div>
      {isError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 py-20 text-destructive">
          <span className="text-sm font-medium">Failed to load audit logs</span>

          <span className="text-xs text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred."}
          </span>

          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border py-20">
          <Spinner className="h-6 w-6 text-primary" />

          <span className="text-xs text-muted-foreground">
            Loading audit logs...
          </span>
        </div>
      ) : (
        <DataTable columns={auditLogsColumns} data={logs} />
      )}
    </div>
  );
}
