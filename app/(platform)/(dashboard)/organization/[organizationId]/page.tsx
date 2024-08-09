import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";

export default async function OrganizationIdPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  return (
      <section className="w-full mb-20">
        <Info />
        <Separator className="my-4"/>
        <div className="px-4 md:px-4">
        <BoardList />
        </div>
      </section>
  );
}
