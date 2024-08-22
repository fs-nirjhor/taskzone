"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { UseAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [board, setBoard] = useState<Board>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = UseAction(updateBoard, {
    onSuccess: (result) => {
      setBoard(result);
      toast.success(`Board '${result.title}' updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => {
      if (fieldErrors) {
        toast.error(fieldErrors.title);
      }
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
    formRef.current?.reset();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = board.id;
    await execute({ title, id });
    disableEditing();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          defaultValue={board.title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
          onBlur={onBlur}
          ref={inputRef}
        />
      </form>
    );
  }

  return (
    <div>
      <Button
        variant="transparent"
        className="size-auto p-1 px-2 text-lg font-bold"
        onClick={enableEditing}
      >
        {board.title}
      </Button>
    </div>
  );
};
