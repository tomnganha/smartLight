module.exports = (query) => {
  let filterStatus = [
    {
      name: "All",
      status: "",
      class: "",
    },
    {
      name: "Status On",
      status: "on",
      class: "",
    },
    {
      name: "Status Off",
      status: "off",
      class: "",
    },
  ];
  if (query.status) {
    const index = filterStatus.findIndex((item) => item.status == query.status);
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }
  return filterStatus;
};
