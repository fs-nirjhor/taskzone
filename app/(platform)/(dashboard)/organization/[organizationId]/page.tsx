import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { db } from "@/lib/db";
import { Board } from "./_components/board";

export default async function OrganizationIdPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const boards = await db.board.findMany();
  return (
    <section>
      <form action={createBoard} >
        <input type="text" name="title" className="border border-gray-400 p-2" placeholder="Board Title" required/>
        <Button type="submit" className="rounded-l-none">Create</Button>
      </form>
      <div className="space-y-2 divide-y mt-5">
        {boards.map(board => <Board key={board.id} board={board} />)}
      </div>
    </section>
  );
}
