import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import { OrganizationResource } from "@clerk/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  isActive?: boolean;
  isExpanded?: boolean;
  organization: OrganizationResource;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="mr-2 size-4" />,
      href: `/organization/${organization?.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="mr-2 size-4" />,
      href: `/organization/${organization?.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 size-4" />,
      href: `/organization/${organization?.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 size-4" />,
      href: `/organization/${organization?.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization?.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative size-7">
            <Image
              src={organization?.imageUrl}
              alt={organization?.name}
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <h4 className="text-sm font-medium">{organization?.name}</h4>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-2 pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            variant="ghost"
            onClick={() => onClick(route.href)}
            className={cn(
              "mb-1 w-full justify-start pl-10 text-start font-normal no-underline transition hover:bg-neutral-500/10 hover:no-underline",
              pathname === route.href && "bg-sky-500/10 text-sky-700",
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Skeleton className="size-7" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
};
