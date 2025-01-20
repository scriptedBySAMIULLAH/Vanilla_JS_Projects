//selctors
let liquidBar = document.querySelector("#liquid-bar");
let languagesButton = document.querySelector("#languages-button");
let overlayElement = document.querySelector("#overlay");
let exteriorButtonsDiv = document.querySelector(".exterior-buttonDiv");
let interiorButtonsDiv = document.querySelector(".interior-buttonDiv");
let exterior = document.querySelector(".exterior");
let interior = document.querySelector(".interior");
let wheelsDiv = document.querySelector(".wheels-btns");
let wheelBtns = document.querySelectorAll(".wheels-btns button");
let performanceButton = document.querySelector("#performance-Button");
let performanceUpgrade = document.querySelector(".performance-Upgrade");
let totalPriceElement = document.querySelector("#total-price");
let selfDrivingCheckBox = document.querySelector("#self-Driving-checkBox");
let accessoriesCheckboxes = document.querySelectorAll(".accessories-Checkbox");
let downPaymentElement = document.querySelector("#down-payment");
let monthlyPaymentElement = document.querySelector("#monthly-payment");
let selectedColor = "solid-black";
let wheelCheck;
let basePrice = 52000; //default price
let currentPrice = basePrice; //if no option selected
let downPayment;
let ExteriorcarMap = {
  "deep-blue-metallic": "../images/model-y-deep-blue-metallic.jpg",
  "stealth-grey": "../images/model-y-stealth-grey.jpg",
  "pearl-white": "../images/model-y-pearl-white.jpg",
  "quick-silver": "../images/model-y-quicksilver.jpg",
  "solid-black": "../images/model-y-solid-black.jpg",
  "ultra-red": "../images/model-y-ultra-red.jpg",
};

let InteriorcarMap = {
  "button-dark": "../images/model-y-interior-dark.jpg",
  "button-light": "../images/model-y-interior-light.jpg",
};

let ExteriorPerformanceCarMap = {
  "deep-blue-metallic": "../images/model-y-deep-blue-metallic-performance.jpg",
  "stealth-grey": "../images/model-y-stealth-grey-performance.jpg",
  "pearl-white": "../images/model-y-pearl-white-performance.jpg",
  "quick-silver": "../images/model-y-quicksilver-performance.jpg",
  "solid-black": "../images/model-y-solid-black-performance.jpg",
  "ultra-red": "../images/model-y-ultra-red-performance.jpg",
};

//pricing formula
let pricing = {
  "Performance-wheels": 2500,
  "Performance-upgrade": 5000,
  "Full Self-driving": 8500,
  Accerroies: {
    "Center Console Tray": 35,
    SunShade: 105,
    "All-wheather Interior Liners": 225,
  },
};

let featureOptions = {
  IsperformanceUpgrade: false,
  IsFullSelfDriving: false,
};

//handlers
const sidebarHandler = (e) => {
  overlayElement.classList.toggle("hidden");
  document.body.classList.toggle("overflow-hidden");

  setTimeout(() => {
    overlayElement.firstElementChild.classList.toggle("translate-x-0");
  }, 500);
};

const crosssidebarHandler = (e) => {
  if (e.currentTarget === e.target) {
    setTimeout(() => {
      overlayElement.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden");
    }, 500);
    overlayElement.firstElementChild.classList.toggle("translate-x-0");
  }
  if (e.target.tagName === "BUTTON") {
    setTimeout(() => {
      overlayElement.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden");
    }, 500);
    overlayElement.firstElementChild.classList.toggle("translate-x-0");
  }
};

const totalPriceUpdateHandler = (e) => {
  currentPrice = basePrice; //if user revert seleceted options

  //if performance wheel
  if (wheelCheck) {
    currentPrice += pricing["Performance-wheels"];
  }

  //if performance upgrade

  if (featureOptions["IsperformanceUpgrade"]) {
    currentPrice += pricing["Performance-upgrade"];
  }

  //if full self driving

  if (featureOptions["IsFullSelfDriving"]) {
    currentPrice += pricing["Full Self-driving"];
  }

  //accessories checkboxes

  accessoriesCheckboxes.forEach((eachCheckBox) => {
    if (eachCheckBox.checked) {
      currentPrice += pricing["Accerroies"][eachCheckBox.name];
    }
  });

  //update
  totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;
  paymentBreakdown();
};

//Estimated Payment Breakdown

const paymentBreakdown = () => {
  //down payment
  downPayment = currentPrice * 0.1;
  const intrestRate = 0.03;
  const loanTermsMonths = 60;

  downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;

  let monthlyIntrestRate = intrestRate / 12;

  let loanAmount = currentPrice - downPayment;

  //so monthly payment

  const monthlyPayment =
    (loanAmount *
      (monthlyIntrestRate *
        Math.pow(1 + monthlyIntrestRate, loanTermsMonths))) /
    (Math.pow(1 + monthlyIntrestRate, loanTermsMonths) - 1);

  monthlyPaymentElement.textContent = `$${monthlyPayment
    .toFixed(2)
    .toLocaleString()}`;
};

const scrollHandler = () => {
  let scrollCheck = window.scrollY === 0;
  liquidBar.classList.toggle("show-bar", scrollCheck);
  liquidBar.classList.toggle("hide-bar", !scrollCheck);
};

const selectedColorButtonHandler = (e) => {
  let selectedButton;

  if (e.target.tagName === "IMG") {
    //event delgation solver
    selectedButton = e.target.closest("button");
  }

  let AllButtons = e.currentTarget.querySelectorAll("button");

  if (selectedButton) {
    AllButtons.forEach((btn) => btn.classList.remove("btn-selected"));
  }

  //put btn-selected class on button

  if (selectedButton) {
    selectedButton.classList.add("btn-selected");
  }

  //check for exteriorButtonsDiv
  //exterior change
  if (e.currentTarget === exteriorButtonsDiv && selectedButton) {
    selectedColor = selectedButton.firstElementChild.alt; //img selected

    updateExteriorImageHandler();
  }

  //interior change

  if (e.currentTarget === interiorButtonsDiv && selectedButton) {
    interior.firstElementChild.src =
      InteriorcarMap[selectedButton.firstElementChild.alt];
  }
};

//update exterior image based on wheels and exterior buttons

const updateExteriorImageHandler = () => {
  wheelCheck
    ? (exterior.firstElementChild.src =
        ExteriorPerformanceCarMap[selectedColor]) ///first time it will not run
    : (exterior.firstElementChild.src = ExteriorcarMap[selectedColor]);
};

const wheelButtonsHandler = (e) => {
  if (e.target.tagName === "BUTTON") {
    wheelBtns.forEach((btn) => {
      btn.classList.remove("bg-gray-600", "text-white");
    });

    e.target.classList.add("bg-gray-600", "text-white");

    //wheel Selcetion

    wheelCheck = e.target.textContent.includes("Performance");
    updateExteriorImageHandler();
    totalPriceUpdateHandler();
  }
};

const performanceUpgradeHandler = () => {
  featureOptions["IsperformanceUpgrade"] =
    performanceUpgrade.classList.toggle("bg-gray-700");
  performanceUpgrade.classList.toggle("text-white");
  totalPriceUpdateHandler();
};

const fullSelfDrivingHandler = (e) => {
  featureOptions["IsFullSelfDriving"] = e.target.checked;
  totalPriceUpdateHandler();
};

totalPriceUpdateHandler(); //intial price down-payment
//listeners

window.addEventListener("scroll", () => requestAnimationFrame(scrollHandler));
exteriorButtonsDiv.addEventListener("click", selectedColorButtonHandler);
interiorButtonsDiv.addEventListener("click", selectedColorButtonHandler);
wheelsDiv.addEventListener("click", wheelButtonsHandler);
performanceUpgrade.addEventListener("click", performanceUpgradeHandler);
selfDrivingCheckBox.addEventListener("change", fullSelfDrivingHandler);
accessoriesCheckboxes.forEach((eachCheckBox) =>
  eachCheckBox.addEventListener("change", totalPriceUpdateHandler)
);
languagesButton.addEventListener("click", sidebarHandler);
overlayElement.addEventListener("click", crosssidebarHandler);
