import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import Link from "next/link";
import { FormPopover } from "@/components/form/form-popover";

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <nav className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-screen-2xl">
        <div className="flex items-center gap-x-2">
          <MobileSidebar />
          <div className="flex items-center gap-x-4">
            <div className="hidden md:block">
              <Logo />
            </div>
            <FormPopover align="start" sideOffset={18} side="bottom">
              <Button size="sm" variant="primary" className="hidden md:block">
                Create
              </Button>
            </FormPopover>
            <FormPopover>
              <Button size="icon" variant="primary" className="block md:hidden">
                <Plus className="mx-auto size-6" />
              </Button>
            </FormPopover>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-organization"
            appearance={{
              elements: {
                rootBox: "flex justify-center items-center",
              },
            }}
          />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-8",
              },
            }}
          />
        </div>
      </nav>
    </header>
  );
};
