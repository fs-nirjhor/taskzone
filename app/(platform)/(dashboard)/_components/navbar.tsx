import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="bg-white fixed top-0 z-50 flex items-center h-14 px-4 border-b shadow-sm w-full">
      <nav className="md:max-w-screen-2xl w-full mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Logo />
          </div>
          <Button size="sm" variant="primary" className="hidden md:block">
            Create
          </Button>
          <Button size="sm" variant="primary" className="block md:hidden">
            <Plus className="size-6" />
          </Button>
        </div>
        <div className="flex items-center justify-end gap-4">
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-organization"
          />
          <UserButton />
        </div>
      </nav>
    </header>
  );
};
