"use client";

import Link from "next/link";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";

import { Plus } from "lucide-react";
import { NavItem } from "./nav-item";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({
  storageKey = "tz-sidebar-expanded",
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce<
    string[]
  >((acc, key) => {
    if (expanded[key]) acc.push(key);
    return acc;
  }, []);

  const onExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships?.isLoading) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-3 w-1/2 pl-4" />
          <Skeleton className="size-5" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-1 flex items-center justify-between text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button variant="ghost" size="icon" type="button">
          <Link href="/select-organization">
            <Plus className="size-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships?.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={organization.id === activeOrganization?.id}
            onExpand={onExpand}
            isExpanded={expanded[organization.id]}
            organization={organization}
          />
        ))}
      </Accordion>
    </>
  );
};
