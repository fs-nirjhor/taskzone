"use client";
import { CreateButton } from "./create-button";
import { TitleInput } from "./title-input";
import { UseAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

export const Form = () => {
  // const initialState: State = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(createBoard, initialState);
  const {fieldErrors, isLoading, execute } = UseAction(createBoard, {
    onSuccess: (data) => {console.log("Success: ", data); },
    onError: (error) => {console.log(error)}
  })
  const onSubmit = (formData : FormData) => {
    const title = formData.get("title") as string;
    execute({title})
  }
  return (
    <form action={onSubmit} className="flex">
      <div className="flex flex-col gap-y-1">
        <TitleInput errors={fieldErrors?.title} isLoading={isLoading}/>
      </div>
      <CreateButton isLoading={isLoading} />
    </form>
  );
};
