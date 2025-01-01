//change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", (e) => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const title = button.getAttribute("data-title");
      let statusChange = statusCurrent == "off" ? "on" : "off";
      const action = path + `/${statusChange}/${id}/${title}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
//end change status

//delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure you delete the device?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;

        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//end delete item
