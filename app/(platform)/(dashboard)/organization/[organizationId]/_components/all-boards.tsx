import { db } from "@/lib/db";

export const AllBoards = async () => {
  const allBoards = await db.board.findMany({});
  return <div className="flex flex-col space-y-3 [&_*]:bg-gray-300 ">{allBoards.map((board) => board.title)}</div>;
};
