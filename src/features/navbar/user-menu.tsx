"use client";
import AvatarFallback from "react-avatar";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useSignOut } from "@/features/auth/hooks/useSignout";
import { authClient } from "@/lib/better-auth/auth-client";
import { getInitials } from "@/lib/utils";

export default function UserMenu() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const signOut = useSignOut();

  const userInitials = getInitials(user?.name);
  console.log(userInitials);

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu disabled={!user}>
        <DropdownMenuTrigger className="cursor-pointer">
          <div className="flex h-auto items-center gap-3 px-2">
            {user ? (
              <AvatarFallback
                name={userInitials.split("").join(" ")}
                size="45"
                className="rounded-full"
              />
            ) : (
              <Spinner className="size-8 opacity-45" />
            )}

            <div className="hidden text-left lg:block">
              <p className="font-medium">{user?.name}</p>

              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>

            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        {user && (
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <AvatarFallback
                    name={userInitials.split("").join(" ")}
                    size="35"
                    className="rounded-full"
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/profile">profile</Link>} />

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-chart-5"
              onClick={signOut}
              variant="destructive"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
