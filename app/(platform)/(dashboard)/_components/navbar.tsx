import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="bg-white fixed top-0 z-50 flex items-center h-14 px-4 border-b shadow-sm w-full">
      <nav className="md:max-w-screen-2xl w-full mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-x-2">
          <MobileSidebar />
          <div className="flex items-center gap-x-4">
            <div className="hidden md:block">
              <Logo />
            </div>
            <Button size="sm" variant="primary" className="hidden md:block">
              <Link href="/select-organization">Create</Link>
            </Button>
            <Button size="icon" variant="primary" className="block md:hidden">
              <Link href="/select-organization">
                <Plus className="size-6 mx-auto" />
              </Link>
            </Button>
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
