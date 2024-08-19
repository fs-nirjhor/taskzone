import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params: { boardId } }: BoardIdPageProps) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-organization");
  }
  const lists = await db.list.findMany({
    where: { boardId, board: { orgId } },
    include: { cards: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="h-full overflow-x-auto p-4 text-white">
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
