import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

export default function ProfileInfoCard({
  name,
  role,
  image,
}: {
  name?: string | null;
  role?: string | null;
  image?: string | null;
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Avatar Badge */}
      <Avatar className="h-14 w-14 text-lg font-bold">
        <AvatarImage src={image || undefined} alt={name || ""} />
        <AvatarFallback className="bg-emerald-600 text-white font-bold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      {/* User Details */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-bold text-foreground tracking-tight">
          {name || "User"}
        </h2>
        <Badge variant="secondary" className="text-[#7008E7] mt-1">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
        </Badge>
      </div>
    </div>
  );
}

