"use client";
import { UseAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const Form = () => {
  const { fieldErrors, isLoading, execute } = UseAction(createBoard, {
    onSuccess: (data) => {
      console.log("Success: ", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <form action={onSubmit} className="space-y-5">
      <div className="flex flex-col gap-y-1">
        <FormInput
          id="title"
          label="Board Title"
          placeholder="Title"
          errors={fieldErrors}
          disabled={isLoading}
        />
      </div>
      <FormSubmit disabled={isLoading}>Save</FormSubmit>
    </form>
  );
};
