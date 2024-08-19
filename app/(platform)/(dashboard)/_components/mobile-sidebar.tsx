"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { useMobileNavbar } from "@/hooks/use-mobile-navbar";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SheetContent, Sheet } from "@/components/ui/sheet";

import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useMobileNavbar();

  useEffect(() => {
    // to handle hydration error
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="block md:hidden"
        onClick={onOpen}
      >
        <Menu className="mx-auto size-6" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="tz-organization-mobile-sidebar-expanded" />
        </SheetContent>
      </Sheet>
    </>
  );
};
