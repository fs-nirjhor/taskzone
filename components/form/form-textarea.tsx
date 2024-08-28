"use client";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { forwardRef, KeyboardEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { Textarea } from "../ui/textarea";
import { FormErrors } from "./form-errors";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  onBlur?(): void;
  onClick?(): void;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder = "",
      required,
      disabled,
      errors,
      className = "",
      defaultValue = "",
      onKeyDown,
      onBlur,
      onClick,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold capitalize text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            disabled={pending || disabled}
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            className={cn(
              "resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              className,
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";
