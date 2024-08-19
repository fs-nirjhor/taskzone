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
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors, isLoading } = UseAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger ref={closeRef} asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant="ghost"
            size="sm"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <FormPicker id="image" errors={fieldErrors} />
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
      </PopoverContent>
    </Popover>
  );
};
