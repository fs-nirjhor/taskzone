"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { UseAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: ListWithCards;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = UseAction(updateList, {
    onSuccess: (result) => {
      toast.success(`Renamed to ${result.title}`);
      setTitle(result.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }
    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form action={handleSubmit} ref={formRef} className="flex-1 px-0.5">
          <input type="hidden" id="id" name="id" value={data.id} />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            value={data.boardId}
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {data.title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
