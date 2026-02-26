function moveListItems(list, fromIndex, toIndex) {
  if (fromIndex > list.length || toIndex > list.length) {
    throw new RangeError("fromIndex or toIndex is out of bounds.");
  }

  const fromIndexValue = list[fromIndex];

  list.splice(fromIndex, 1);
  list.splice(toIndex, 0, fromIndexValue);

  return list;
}

export default moveListItems;
