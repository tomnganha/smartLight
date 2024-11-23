module.exports = (objectPagination, query, countDevices) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;
  const totalPages = Math.ceil(countDevices / objectPagination.limitItems);
  objectPagination.totalPages = totalPages;
  return objectPagination;
};
