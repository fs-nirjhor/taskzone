import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { db } from "@/lib/db";
import { Board } from "./_components/board";
import { Form } from "./_components/form";

export default async function OrganizationIdPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const boards = await db.board.findMany();
  return (
    <section>
      <Form />
      <div className="space-y-2 divide-y mt-5">
        {boards.map(board => <Board key={board.id} board={board} />)}
      </div>
    </section>
  );
}
