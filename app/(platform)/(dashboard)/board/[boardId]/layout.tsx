import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params: { boardId },
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return { title: "Board" };
  }
  const board = await db.board.findUnique({
    where: { id: boardId, orgId },
  });

  return { title: board?.title || "Board" };
}

const BoardIdLayout = async ({
  children,
  params: { boardId },
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-organization");
  }
  const board = await db.board.findUnique({
    where: { id: boardId, orgId },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-sky-700 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pb-24 pt-32">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
