const paginate = <T>(
  arr: Array<T>,
  currentPage: number,
  itemsPerPage: number,
): Array<T> => {
  const startingIndex = (currentPage - 1) * itemsPerPage;
  return arr.slice(startingIndex, startingIndex + itemsPerPage);
};

export default paginate;
