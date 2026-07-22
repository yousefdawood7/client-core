"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/hooks/use-sign-out";
import { authClient } from "@/lib/better-auth/auth-client";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";

export default function UserMenu() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const signOut = useSignOut();
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <div className="flex h-auto items-center gap-3 px-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="hidden text-left lg:block">
              <p className="font-medium">{user?.name}</p>

              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>

            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <Link href="/profile">
            <DropdownMenuItem>profile</DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="text-chart-5" onClick={signOut}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
