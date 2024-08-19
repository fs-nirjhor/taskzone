"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const { organizationId } = useParams();
  const { setActive } = useOrganizationList();

  //* This will change the clerk organization to following organization of route
  useEffect(() => {
    if (!setActive) return;
    setActive({ organization: organizationId as string } as any);
  }, [setActive, organizationId]);

  return null;
};
