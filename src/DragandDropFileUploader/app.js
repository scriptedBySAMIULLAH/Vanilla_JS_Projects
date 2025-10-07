
let clickUploadButton = document.querySelector(".clickUpload");
let uploadImageInput = document.querySelector("#uploaded-image");
let dropZoneElement = document.querySelector(".drop-zone");
let progessBarElement = document.querySelector(".progess-bar");
let imagestoAppendElement = document.querySelector(".images-to-append");
const events = ["dragenter", "dragover", "dragleave", "drop"];
const validImages = ["image/jpeg", "image/png", "image/gif"];
let IsvalidFile;
let imagesArray=JSON.parse(localStorage.getItem('imgs')|| '[]');

const selectImageHandler = (e) => uploadImageInput.click();
const dragoverHandler = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
  dropZoneElement.classList.remove("border", "border-pink-800");
  dropZoneElement.classList.add("active");
};
const dragleaveHandler = (e) => {
  dropZoneElement.classList.add("border", "border-pink-800");
  dropZoneElement.classList.remove("active");
};
const dragenterHandler = (e) => {
  e.preventDefault();
};
const dropHandler = (e) => {
  e.preventDefault();
  dropZoneElement.classList.remove("active");
  dropZoneElement.classList.add("border", "border-pink-800");
  // console.log(e.dataTransfer);

  const { files } = e.dataTransfer;
  console.log(e.dataTransfer);

  uploadImages(files);
};
const dragHandler = (e) => {
  switch (e.type) {
    case "dragover":
      dragoverHandler(e);
      break;
    case "dragleave":
      dragleaveHandler(e);
      break;
    case "dragenter":
      dragenterHandler(e);
      break;
    case "drop":
      dropHandler(e);
      break;
  }
};
const checkValid = (file) => {
  let fileType = file.type;
  console.log(fileType);

  IsvalidFile = validImages.includes(fileType);

  if (!IsvalidFile) {
    alert("Invalid file upload");
    return;
  }
};
const putInLocalStorage=(img)=>{

    imagesArray.push(img);
    localStorage.setItem('imgs',JSON.stringify(imagesArray));
}
const appendImages=(img)=>
{
  let Image = document.createElement("img");
  Image.src = img;
  Image.className = "w-96 h-auto rounded-lg shadow-lg hover:scale-110 transition-transform";

  imagestoAppendElement.appendChild(Image);
  value = 1;
  progessBarElement.classList.add("hidden");

}

const showImages = (img) => {
  putInLocalStorage(img);
  
  let value = 1;

  let id = setInterval(() => {
    progessBarElement.value = value;
    value++;
    console.log(2);
    if (value == 100) {
      appendImages(img)
      clearInterval(id);
    }
  }, 1);
  progessBarElement.classList.remove("hidden");
  progessBarElement.classList.add("block");
};

const uploadImages = (files) => {
  let data;
  checkValid(files[0]);
  if (IsvalidFile) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.addEventListener("load", (e) => {
      showImages(e.target.result);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  events.forEach((event) =>
    dropZoneElement.addEventListener(event, dragHandler)
  );
});
const selectImage = (e) => {
  const { files } = e.target;
  console.log(files);

  uploadImages(files);
};

const getFromLocalStorage=()=>
{
  console.log(imagesArray);
  
  imagesArray.forEach((img)=>{

      appendImages(img);
  })
}
getFromLocalStorage();
uploadImageInput.addEventListener("change", selectImage);
clickUploadButton.addEventListener("click", selectImageHandler);
