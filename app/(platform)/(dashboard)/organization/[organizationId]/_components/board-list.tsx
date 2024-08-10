import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-semibold text-lg text-neutral-700">
        <User2 className="size-6" /> <span>Your Boards</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
