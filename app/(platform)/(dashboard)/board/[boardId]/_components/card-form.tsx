"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";
import { FormTextarea } from "./../../../../../../components/form/form-textarea";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    if (isEditing) {
      return (
        <form action="" className="m-1 space-y-4 px-1 py-0.5">
          <FormTextarea
            id="title"
            ref={ref}
            placeholder="Enter a title for this card..."
            onKeyDown={() => {}}
          />
          <input type="hidden" id="listId" name="listId" value={listId} />
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
