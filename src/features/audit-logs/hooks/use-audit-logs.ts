"use client";
import { useState } from "react";
import { Action } from "@generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { fetchClient } from "@/lib/api-client";

import { DBHistoryLog, RawHistoryLog } from "../types";

export function useAuditLogs() {
  const [search, setSearchState] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [actionFilter, setActionFilterState] = useState<"all" | Action>("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const setSearch = (val: string) => {
    setSearchState(val);
    setPage(1);
  };

  const setActionFilter = (val: "all" | Action) => {
    setActionFilterState(val);
    setPage(1);
  };

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery({
    queryKey: ["audit-logs", { actionFilter, debouncedSearch, page }],
    queryFn: async () => {
      const result = await fetchClient<{
        logs: RawHistoryLog[];
        total: number;
      }>("/api/history", {
        params: {
          limit,
          offset: (page - 1) * limit,
          action: actionFilter !== "all" ? actionFilter : undefined,
          search: debouncedSearch || undefined,
        },
      });

      const formattedLogs = result.logs.map(
        (log: RawHistoryLog): DBHistoryLog => ({
          ...log,
          createdAt: new Date(log.createdAt),
        }),
      );

      return {
        logs: formattedLogs,
        total: result.total,
      };
    },
  });

  const logs = data?.logs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    logs,
    total,
    loading: isLoading || isFetching,
    search,
    setSearch,
    actionFilter,
    setActionFilter,
    page,
    setPage,
    totalPages,
    limit,
    error,
    isError,
    refetch,
  };
}
