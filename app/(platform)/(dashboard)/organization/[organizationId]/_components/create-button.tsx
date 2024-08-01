
import { Button } from "@/components/ui/button";

export const CreateButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button disabled={isLoading} type="submit" className="rounded-l-none">
      {isLoading ? "Creating" : "Create"}
    </Button>
  );
};
