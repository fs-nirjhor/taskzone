"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function DeleteButton() {
    const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" size="sm" variant="destructive">
        Delete
      </Button>
  )
}