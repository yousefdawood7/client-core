import { Activity, Building2, Target, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashCardProps = {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor?: string;
};

const stats = [
  {
    title: "Total Companies",
    value: 5,
    subtitle: "+2 this month",
    icon: Building2,
    color: "bg-blue-600",
  },
  {
    title: "Total Agents",
    value: 8,
    subtitle: "+3 this month",
    icon: Users,
    color: "bg-violet-500",
  },
  {
    title: "Total Leads",
    value: 15,
    subtitle: "+5 this week",
    icon: Target,
    color: "bg-cyan-500",
  },
  {
    title: "New Leads",
    value: 6,
    subtitle: "Active pipeline",
    icon: TrendingUp,
    color: "bg-green-400",
  },
  {
    title: "Converted",
    value: 4,
    subtitle: "13% conv. rate",
    icon: Activity,
    color: "bg-green-600",
  },
];

function DashCard({
  title,
  value,
  subtitle,
  icon,
  iconColor = "bg-blue-600",
}: DashCardProps) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="">
        <div
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white",
            iconColor,
          )}
        >
          {icon}
        </div>
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
        <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-600">
          <TrendingUp className="w-4" />
          {subtitle}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StatisticsCard() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <DashCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={<Icon className="h-5 w-5" />}
            iconColor={item.color}
          />
        );
      })}
    </section>
  );
}
