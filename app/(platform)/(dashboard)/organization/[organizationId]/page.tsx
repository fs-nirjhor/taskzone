import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";
import { Suspense } from "react";

export default async function OrganizationIdPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  return (
    <section className="mb-20 w-full">
      <Info />
      <Separator className="my-4" />
      <div className="px-4 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </section>
  );
}
