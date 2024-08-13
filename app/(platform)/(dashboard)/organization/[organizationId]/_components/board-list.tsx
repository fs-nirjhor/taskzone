import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-organization");
  }
  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-semibold text-lg text-neutral-700">
        <User2 className="size-6" /> <span>Your Boards</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm size-full overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition p-2">
              <p className="relative font-semibold text-white">{board.title}</p>
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative size-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-sm">5 Remaining</span>
            <Hint
              sideOffset={40}
              description="Free workspace can have up to 5 open boards. for unlimited boards upgrade this workspace"
            >
              <HelpCircle className="absolute bottom-2 right-2 size-3.5" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.SkeletonItem = function BoardListSkeletonItem() {
  return <Skeleton className="size-full aspect-video" />;
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
      <BoardList.SkeletonItem />
    </div>
  );
};
