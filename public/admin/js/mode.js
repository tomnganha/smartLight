//change powerSavingMode status
const buttonChangePowerSavingMode = document.querySelector(
  "[button-change-powerSavingMode]"
);

const formChangePowerSavingMode = document.querySelector(
  "#form-change-powerSavingMode"
);
const path = formChangePowerSavingMode.getAttribute("data-path");

buttonChangePowerSavingMode.addEventListener("click", (e) => {
  const statusPowerSavingModeCurrent = buttonChangePowerSavingMode.getAttribute(
    "data-powerSavingMode"
  );
  const data_mode = buttonChangePowerSavingMode.getAttribute("data-mode");
  // const title = button.getAttribute("data-title");
  let statusPowerSavingModeChange =
    statusPowerSavingModeCurrent == "off" ? "on" : "off";
  const action =
    path + `/${statusPowerSavingModeChange}/${data_mode}?_method=PATCH`;
  formChangePowerSavingMode.action = action;
  formChangePowerSavingMode.submit();
});

//end change powerSavingMode status

//change autoLightMode status
const buttonChangeAutoLightMode = document.querySelector(
  "[button-change-autoLightMode]"
);

const formChangeAutoLightMode = document.querySelector(
  "#form-change-autoLightMode"
);

const pathAutoLightMode = formChangeAutoLightMode.getAttribute("data-path");

buttonChangeAutoLightMode.addEventListener("click", (e) => {
  const statusAutoLightModeCurrent =
    buttonChangeAutoLightMode.getAttribute("data-autoLightMode");
  const data_autoLightMode =
    buttonChangeAutoLightMode.getAttribute("data-mode");
  // const title = button.getAttribute("data-title");
  let statusAutoLightModeChange =
    statusAutoLightModeCurrent == "off" ? "on" : "off";
  const action =
    pathAutoLightMode +
    `/${statusAutoLightModeChange}/${data_autoLightMode}?_method=PATCH`;
  formChangeAutoLightMode.action = action;
  formChangeAutoLightMode.submit();
});
//end change autoLightMode status
