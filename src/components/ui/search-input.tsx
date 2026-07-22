import React from "react";
import { Search } from "lucide-react";

import { Input } from "./input";

export default function SearchInput() {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Search..." className="w-72 pl-10" />
    </div>
  );
}
