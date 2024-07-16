import Image from "next/image";
import { cn } from "@/lib/utils";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { OrganizationResource } from "@clerk/types";

interface NavItemProps {
    isActive?: boolean;
    isExpanded?: boolean;
    organization: OrganizationResource;
    onExpand: (id: string) => void;
}

export const NavItem = ({isActive, isExpanded, organization, onExpand}: NavItemProps) => {
  return (
      <AccordionItem value={organization.id} className="border-none">
          <AccordionTrigger onClick={() => onExpand(organization?.id)} className={cn("flex items-center gap-x-2 p-1.5 rounded-md text-neutral-700 hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline", isActive && !isExpanded &&  "bg-sky-500/10 text-sky-700")}>
              <div className="flex items-center gap-x-2">
                  <div className="size-7 relative">
                      <Image src={organization?.imageUrl} alt={organization?.name} fill className="rounded-sm object-cover" />
                  </div>
              <h4 className="font-medium text-sm">{organization?.name}</h4>
              </div>
          </AccordionTrigger>
      </AccordionItem>
  );
}