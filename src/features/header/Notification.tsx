import React from "react";
import { Bell } from "lucide-react";

import { Button } from "../../components/ui/button";

export default function Notification() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
        3
      </span>
    </Button>
  );
}
