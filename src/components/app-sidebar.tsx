"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarItem = {
  title: string;
  href: Route;
  icon: LucideIcon;
};

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    href: "/companies",
    icon: Building2,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: ClipboardList,
  },
  {
    title: "Audit Logs",
    href: "/auditlogs",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r bg-sidebar">
      <SidebarHeader className="border-b p-2 transition-all duration-300">
        <Link href="/dashboard" className="flex h-12 items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-5" />
          </div>

          <div className="ml-3 flex min-w-0 flex-col overflow-hidden transition-all duration-300 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
            <span className="truncate font-semibold">CRM Pro</span>
            <span className="truncate text-xs text-muted-foreground">
              Admin Panel
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.href}
                    className="h-11 rounded-xl cursor-pointer"
                  >
                    <Icon className="size-5 shrink-0" />
                    <span className="truncate transition-all duration-200 group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
