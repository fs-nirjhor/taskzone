"use client";
import { updateListOrder } from "@/actions/update-list-order";
import { UseAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ListForm from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  // creates a shallow copy
  const result = Array.from(list);
  // remove the element from the startIndex position
  //// const removed = result.splice(startIndex, 1)[0];
  const [removed] = result.splice(startIndex, 1);
  // inserts the removed element back into the endIndex position
  result.splice(endIndex, 0, removed);

  // finally returns the modified array
  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  const { execute: executeUpdateListOrder } = UseAction(updateListOrder, {
    onSuccess: () => {
      toast.success(`List reordered`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    //? if not dragged
    if (!destination) {
      return;
    }

    //? if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    //* if user moves a "list"
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );
      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    //* if user moves a "card"
    if (type === "card") {
      let newOrderData = [...orderedData];

      // find source and destination list
      const sourceList = newOrderData.find(
        (list) => list.id === source.droppableId,
      );
      const destList = newOrderData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }

      //? check if cards exist on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      //?  check if cards exist on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      //* moving the card to same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderedCards;

        setOrderedData(newOrderData);
        // TODO: Trigger Server Action
      }

      //* moving the card to another list
      if (source.droppableId !== destination.droppableId) {
        // remove the card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // update the order for each card
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderData);
        // TODO: Trigger Server Action
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <li className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
