"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
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
  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    alert(title);
  }
  const onBlur = () => {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          id="title"
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
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
        className="font-bold text-lg size-auto p-1 px-2"
        onClick={enableEditing}
      >
        {data.title}
      </Button>
    </div>
  );
};
