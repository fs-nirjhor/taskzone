//"use client";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";

interface InputProps {
  errors?: string[];
  isLoading?: boolean;
};

export const TitleInput = ({ errors, isLoading }: InputProps) => {
  //const { pending } = useFormStatus();
  return (
    <label>
      <Input
        type="text"
        name="title"
        placeholder="Board Title"
        disabled={isLoading}
        required
      />
      {errors && (
        <div className="">
          {errors.map((error: string) => (
            <p key={error} className="text-rose-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
    </label>
  );
};
