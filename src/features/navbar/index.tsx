import HeaderBreadcrumb from "./header-breadcrumb";
import UserMenu from "./user-menu";
// import Notification from "./Notification";
// import SearchInput from "@/components/ui/search-input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <HeaderBreadcrumb />
        <div className="ml-auto flex items-center gap-2">
          {/* <SearchInput />
          <Notification /> */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
