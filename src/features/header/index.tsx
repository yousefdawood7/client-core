import HeaderBreadcrumb from "./header-breadcrumb";
import Notification from "./Notification";
import UserMenu from "./user-menu";
import SearchInput from "../../components/ui/search-input";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      <HeaderBreadcrumb />

      <div className="flex items-center gap-4">
        <SearchInput />
        <Notification />
        <UserMenu />
      </div>
    </header>
  );
}
