let stepsDivElements = document.querySelectorAll(".step");
let nextBtnElement = document.querySelector(".nextBtn");

const indicatorElement = document.querySelector(".step-indicator");

let prevBtnElement = document.querySelector(".prevBtn");
let submitBtnElement = document.querySelector(".submitBtn");

let currentIndex = 0;

const stepIndicator = (e) => {
  if (e.target.classList.contains("nextBtn")) {
    currentIndex == 1
      ? indicatorElement
          .querySelector(".indicator")
          .classList.add("translate-x-[29rem]")
      : indicatorElement
          .querySelector(".indicator")
          .classList.add("translate-x-[52rem]");
  }
  if (e.target.classList.contains("prevBtn")) {
    console.log(currentIndex);

    currentIndex == 1
      ? indicatorElement
          .querySelector(".indicator")
          .classList.remove("translate-x-[52rem]")
      : indicatorElement
          .querySelector(".indicator")
          .classList.remove("translate-x-[29rem]");
  }
};

const stepToggle = () => {
  stepsDivElements.forEach((step, index) => {
    step.classList.toggle("show-step", index === currentIndex);
    step.classList.toggle("hide-step", index !== currentIndex);
  });

  prevBtnElement.classList.toggle("hidden", currentIndex === 0);

}
const nextBtnHandler = (e) => {
  if (currentIndex < stepsDivElements.length - 1) {
    if (validateInputs()) {
      currentIndex++;
      stepToggle();
      stepIndicator(e);
    }
  } else if (currentIndex === stepsDivElements.length - 1 && validateInputs()) {
     stepsDivElements.forEach((step) => {
      step.classList.remove("hide-step");
      step.classList.add("show-step");
    });
    nextBtnElement.classList.add("hidden");
    prevBtnElement.classList.add("hidden");
    submitBtnElement.classList.remove("hidden");
  }
};


const prevBtnHandler = (e) => {
  if (currentIndex > 0) {
    currentIndex--;
    stepToggle();
    stepIndicator(e);
  }
};
const submitBtnHandler = (e) => {
  e.preventDefault();
  if (
    validateStepOne(stepsDivElements[0]) && validateStepTwo(stepsDivElements[1]) && validateStepThree(stepsDivElements[2])
  ) {
    stepsDivElements.forEach((step) => {
      step.classList.remove("hide-step");
      step.classList.add("show-step");
    });

    nextBtnElement.classList.add("hidden");
    prevBtnElement.classList.add("hidden");
    submitBtnElement.classList.add("hidden");

    alert("Form validation successful! Now showing the full form.");
  }
};


const validateStepOne = (currentElement) => {
  let testPassed = true;

  currentElement.querySelectorAll("input, select").forEach((input) => {
    let errorElement = currentElement.querySelector(`.${input.name}-error`);
    if (errorElement) errorElement.textContent = "";

    if (input.name === "name") {
      let nameRegex = /^[a-zA-Z\s]{3,50}$/;
      if (!input.value.trim()) {
        testPassed = false;
        errorElement.textContent = "Name is required";
      } else if (!nameRegex.test(input.value)) {
        testPassed = false;
        errorElement.textContent = "Name must be 3-50 letters only";
      }
    } else if (input.name === "email") {
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,6}$/;
      if (!input.value.trim()) {
        testPassed = false;
        errorElement.textContent = "Email is required";
      } else if (!emailRegex.test(input.value)) {
        testPassed = false;
        errorElement.textContent = "Invalid email format";
      }
    } else if (input.name === "phoneNumber") {
      let phoneRegex = /^\+?\d{1,3}[-.\s]?\d{4,5}[-.\s]?\d{4,7}$/;
      if (!input.value.trim()) {
        testPassed = false;
        errorElement.textContent = "Phone number is required";
      } else if (!phoneRegex.test(input.value)) {
        testPassed = false;
        errorElement.textContent = "Invalid phone format";
      }
    }
  });

  return testPassed;
};
const validateStepTwo = (currentElement) => {
  let testPassed = true;
  currentElement.querySelectorAll("select").forEach((input) => {
    let errorElement = currentElement.querySelector(`.${input.name}-error`);
    if (errorElement) errorElement.textContent = "";

    if (input.name === "preferredContactMethod") {
      if (!input.value) {
        testPassed = false;
        errorElement.textContent = "Field  is required";
      }
    } else if (input.name === "profession") {
      if (!input.value) {
        testPassed = false;
        errorElement.textContent = "Field is required";
      }
    }
  });

  return testPassed;
};

const validateStepThree = (currentElement) => {
  let testPassed = true;

  currentElement.querySelectorAll("input").forEach((input) => {
    let errorElement = currentElement.querySelector(`.${input.name}-error`);
    if (errorElement) errorElement.textContent = "";

    let passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$^&*"!.-])[A-Za-z\d@$^&*"!.-]{9,30}$/
    let personalPinRegex = /^\d{4}$/;

    if (input.name === "password") {
      if (!input.value.trim()) {
        testPassed = false;
        errorElement.textContent = "Password required";
      } else if (!passwordRegex.test(input.value)) {
        testPassed = false;
        errorElement.textContent = "Password must be 9-25 characters";
      }
    } else if (input.name === "confirmPassword") {
      if (!input.value.trim()) {
        testPassed = false;
        errorElement.textContent = "Confirm Password required";
      } else if (!passwordRegex.test(input.value)) {
        testPassed = false;
        errorElement.textContent = "Invalid password format";
      } else if (
        input.value !==
        currentElement.querySelector("input[name='password']").value
      ) {
        testPassed = false;
        errorElement.textContent = "Passwords do not match";
      }
    } else if ((input.name = "pin")) {
      if (!input.value) {
        testPassed = false;
        errorElement.textContent = "Pin Required";
      } else if (!personalPinRegex.test(input.value)) {
        testPassed = false;
        errorElement.textContent = "Invalid Pin";
      }
    }
  });

  return testPassed;
};
const validateInputs = () => {
  let isValid = false;
  let currentStep = Number(currentIndex);

  if (currentStep === 0) {
    isValid = validateStepOne(stepsDivElements[currentIndex]);
  } else if (currentStep === 1) {
    isValid = validateStepTwo(stepsDivElements[currentIndex]);
  } else {
    isValid = validateStepThree(stepsDivElements[currentIndex]);
  }

  return isValid;
};

stepToggle();

if (nextBtnElement) nextBtnElement.addEventListener("click", nextBtnHandler);
if (prevBtnElement) prevBtnElement.addEventListener("click", prevBtnHandler);
if (submitBtnElement)
  submitBtnElement.addEventListener("click", submitBtnHandler);
