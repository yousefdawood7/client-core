import HeaderBreadcrumb from "./header-breadcrumb";
import UserMenu from "./user-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      <HeaderBreadcrumb />

      <div className="flex items-center gap-4">
        {/* <SearchInput /> */}
        {/* <Notification /> */}
        <UserMenu />
      </div>
    </header>
  );
}
