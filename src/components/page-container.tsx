import { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function PageContainer({
  title,
  subtitle,
  children,
}: PageContainerProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="mt-5">{children}</div>
    </div>
  );
}
