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
      className="relative h-full bg-no-repeat bg-cover bg-center bg-sky-700"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="pt-32 pb-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto relative h-full">
        {children}
      </main>
    </div>
  );
};

export default BoardIdLayout;
