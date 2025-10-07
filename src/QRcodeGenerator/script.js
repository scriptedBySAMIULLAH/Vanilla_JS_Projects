let url_Element = document.querySelector(".url");
let size_Element = document.querySelector(".size");
let formElement = document.getElementById("form");
let spinner_Element = document.getElementById("spinner");
let qrcode_Element = document.querySelector("#qrcode");
let qrModal_Element = document.querySelector(".qrModal");
let closeBtn_Element = document.querySelector(".closeBtn");
let qrCodeBg_Element = document.querySelector(".qrCodeBg");

const formHandler = (e) => {
  e.preventDefault();
  qrcode_Element.innerHTML = "";
  const url = url_Element.value;
  const size = size_Element.value;
  if (url_Element.value != "") {
    showModalHandler();
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
    }, 300);
  } else {
    alert("Please enter URL");
  }
};

const showModalHandler = () => {
  qrModal_Element.classList.toggle("hidden");
};
const showSpinner = () => {
  spinner_Element.style.display = "block";
};
const hideSpinner = () => {
  spinner_Element.style.display = "none";
};

const generateQRCode = (url, size) => {
  const qr = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
  setTimeout(() => {
    const qrImgLink = qrcode_Element.querySelector("img");
    if (qrImgLink) {
      createSaveBtn(qrImgLink.src); //it takes time to genrate img then access it
    }
  }, 50);
};

const createSaveBtn = (saveLink) => {
  let check_a_tag = qrCodeBg_Element.querySelector("a");
  if (!check_a_tag) {
    let saveBtn = document.createElement("a");
    saveBtn.href = saveLink;
    saveBtn.className =
      "mt-4 w-full font-bold duration-150 bg-green-500 text-white py-2 rounded hover:bg-green-600 block text-center";
    saveBtn.innerText = "Save Image";
    saveBtn.download = "QRCode";
    saveBtn.setAttribute("download", "");
    saveBtn.setAttribute("rel", "noopener noreferrer");
    qrCodeBg_Element.append(saveBtn);
  }
};

hideSpinner();
closeBtn_Element.addEventListener("click", showModalHandler);
formElement.addEventListener("submit", formHandler);
