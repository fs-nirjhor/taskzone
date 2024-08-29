import { cn } from "@/lib/utils";
import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <li
      className={cn(
        "rounded-md bg-white p-1 shadow-md",
        index === 0 ? "rounded-t-md" : "",
      )}
    >
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <span className="text-xs text-gray-500">Card</span>
          <span className="text-xs text-gray-500">#{index + 1}</span>
        </div>
        <p className="text-sm">{data.title}</p>
      </div>
    </li>
  );
};
export default CardItem;
