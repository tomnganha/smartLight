//change status
const buttonChangePowerSavingMode = document.querySelector(
  "[button-change-powerSavingMode]"
);

console.log(buttonChangePowerSavingMode);
const formChangeMode = document.querySelector("#form-change-mode");
const path = formChangeMode.getAttribute("data-path");

buttonChangePowerSavingMode.addEventListener("click", (e) => {
  const statusCurrent = buttonChangePowerSavingMode.getAttribute(
    "data-powerSavingMode"
  );
  const data_mode = buttonChangePowerSavingMode.getAttribute("data-mode");
  // const title = button.getAttribute("data-title");
  let statusChange = statusCurrent == "off" ? "on" : "off";
  const action = path + `/${statusChange}/${data_mode}?_method=PATCH`;
  formChangeMode.action = action;
  formChangeMode.submit();
});

//end change status
