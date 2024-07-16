import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import { OrganizationResource } from "@clerk/types";
import { Button } from "@/components/ui/button";

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
      icon: <Layout className="size-4 mr-2" />,
      href: `/organization/${organization?.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="size-4 mr-2" />,
      href: `/organization/${organization?.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="size-4 mr-2" />,
      href: `/organization/${organization?.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="size-4 mr-2" />,
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
          "flex items-center gap-x-2 p-1.5 rounded-md text-neutral-700 hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="size-7 relative">
            <Image
              src={organization?.imageUrl}
              alt={organization?.name}
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <h4 className="font-medium text-sm">{organization?.name}</h4>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700 px-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            variant="ghost"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
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
