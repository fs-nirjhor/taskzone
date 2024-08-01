import { deleteBoard } from "@/actions/delete-board";
import DeleteButton from "./delete-button";

interface BoardProps {
  board: {
    title: string;
    id: string;
  };
}

export const Board = ({ board: { title, id } }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id); // `null` is for `this` parameter
  return (
    <form
      className="flex gap-2 items-center justify-between"
      action={deleteBoardWithId}
    >
      <p>{title}</p>
      <DeleteButton />
    </form>
  );
};
