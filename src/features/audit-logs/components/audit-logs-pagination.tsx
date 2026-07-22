"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditLogsPaginationProps {
  total: number;
  page: number;
  setPage: (value: number | ((prev: number) => number)) => void;
  totalPages: number;
  limit: number;
  loading: boolean;
}

export function AuditLogsPagination({
  total,
  page,
  setPage,
  totalPages,
  limit,
  loading,
}: AuditLogsPaginationProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-border/40">
      <div className="text-xs text-muted-foreground">
        {total > 0
          ? `Showing ${(page - 1) * limit + 1}-${Math.min(
              page * limit,
              total
            )} of ${total}`
          : "Showing 0-0 of 0"}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {(() => {
          const pages = [];
          if (page - 1 >= 1) pages.push(page - 1);
          pages.push(page);
          if (page + 1 <= totalPages) pages.push(page + 1);

          return pages.map((p) => (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="icon-sm"
              onClick={() => setPage(p)}
              disabled={loading}
              className={
                p === page
                  ? "bg-primary text-primary-foreground font-semibold"
                  : ""
              }
            >
              {p}
            </Button>
          ));
        })()}

        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages || loading}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
