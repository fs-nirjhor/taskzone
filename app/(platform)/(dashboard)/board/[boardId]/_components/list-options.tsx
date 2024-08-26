import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-500">
          List Actions
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant="ghost"
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          Add Card
        </Button>
        <form>
          <input type="hidden" name="id" id="id" value={data.id} />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
