"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const Info = () => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <figure className="flex items-center gap-x-4">
      <div className="size-16 relative">
        <Image
          fill
          src={organization?.imageUrl as string}
          alt={organization?.name as string}
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-xl">{organization?.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <CreditCard className="size-3" />
          <span>Free</span>
        </div>
      </div>
    </figure>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <figure className="flex items-center gap-x-4">
      <div className="size-16 relative">
        <Skeleton className="size-full absolute" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-6 w-52" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </figure>
  );
};
