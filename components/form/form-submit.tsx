"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "primary"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export const FormSubmit = ({
  children = "Submit",
  className,
  disabled,
  variant = "primary",
  size = "sm",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={variant}
      disabled={disabled || pending}
      className={cn(className)}
      size={size}
    >
      {children}
    </Button>
  );
};
