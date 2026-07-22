import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
