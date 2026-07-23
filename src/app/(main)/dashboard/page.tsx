"use client";

import LeadsStatusChart from "@/features/dashboard/components/bar-chart";
import LeadsChart from "@/features/dashboard/components/lien-chart";
import LogsTable from "@/features/dashboard/components/logs-table";
import StatisticsCard from "@/features/dashboard/components/statistics-card";

export default function Page() {
  return (
    <section className="min-w-0 space-y-6">
      <StatisticsCard />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LeadsStatusChart />
        <LeadsChart />
      </div>
      <div className="overflow-x-auto">
        <LogsTable />
      </div>
    </section>
  );
}
