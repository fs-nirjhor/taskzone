import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }
  
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500 space-y-2"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex flex-center gap-2 font-medium border border-rose-500 bg-rose-500/10 p-2 rounded-sm"
        >
          <XCircle className="size-4" />
          {error}
        </div>
      ))}
    </div>
  );
};
