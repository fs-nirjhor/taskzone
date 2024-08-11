"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { createBoard } from "@/actions/create-board";
import { UseAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset,
}: FormPopoverProps) => {
  const { execute, fieldErrors, isLoading } = UseAction(createBoard, {
    onSuccess: (data) => {
      console.log("Success: ", { data });
      toast.success("Board created");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="size-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
            size="sm"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              type="text"
              id="title"
              label="Board Title"
              errors={fieldErrors}
              disabled={isLoading}
            />
          </div>
          <FormSubmit className="w-full" disabled={isLoading}>
            Create
          </FormSubmit>
        </form>
        <FormPicker id="image" errors={fieldErrors} />
      </PopoverContent>
    </Popover>
  );
};
