import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";

export const moveItemsInList = (list, fromIndex, toIndex) => {
  return reorder({
    list: list,
    startIndex: fromIndex,
    finishIndex: toIndex,
  });
};
