"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { UseAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { forwardRef, KeyboardEventHandler, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "./../../../../../../components/form/form-textarea";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);

    const { execute, fieldErrors } = UseAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} created`);
        formRef.current?.reset();
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      // submit on enter
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          action={onSubmit}
          ref={formRef}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            ref={ref}
            placeholder="Enter a title for this card..."
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
          />
          <input type="hidden" id="listId" name="listId" value={listId} />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            value={params.boardId}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          size-="sm"
          variant="ghost"
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
        >
          <Plus className="me-2 size-4" />
          Add a card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
