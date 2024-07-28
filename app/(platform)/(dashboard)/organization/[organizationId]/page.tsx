//import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { db } from "@/lib/db";

export default async function OrganizationIdPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  //const { orgSlug } = auth();
  const boards = await db.board.findMany();
  return (
    <section>
      <form action={createBoard} >
        <input type="text" name="title" className="border border-gray-400 p-2" placeholder="Board Title"/>
        <Button type="submit" className="rounded-l-none">Submit</Button>
      </form>
      <ul className="space-y-2 divide-y mt-5 border border-dotted p-3">
        {boards.map(board => <li key={board.id}>{board.title}</li>)}
      </ul>
    </section>
  );
}
