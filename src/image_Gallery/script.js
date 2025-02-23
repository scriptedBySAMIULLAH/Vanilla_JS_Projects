let current_image = document.getElementById("current");
let images_div = document.querySelector(".images");
let index=0;
let opacity= 0.4;
let intervalId;
const images_container = {
  img_1:
    "https://cdn.pixabay.com/photo/2024/06/22/16/55/ai-generated-8846672_1280.jpg",
  img_2:
    "https://cdn.pixabay.com/photo/2024/02/22/19/46/ai-generated-8590746_1280.png",
  img_3:
    "https://cdn.pixabay.com/photo/2023/03/14/22/20/relationship-7853278_1280.jpg",
  img_4:
    "https://cdn.pixabay.com/photo/2023/03/14/22/11/mahabalipuram-7853259_1280.jpg",
  img_5:
    "https://cdn.pixabay.com/photo/2023/03/14/21/53/sculpture-7853242_1280.jpg",
  img_6:
    "https://cdn.pixabay.com/photo/2024/01/15/11/36/batman-8510024_1280.png",
  img_7:
    "https://cdn.pixabay.com/photo/2024/03/12/17/32/ai-generated-8629230_1280.png",
  img_8:
    "https://cdn.pixabay.com/photo/2024/01/15/11/36/batman-8510022_1280.png",
  img_9:
    "https://cdn.pixabay.com/photo/2023/01/06/02/01/ai-generated-7700259_1280.jpg",
  img_10:
    "https://cdn.pixabay.com/photo/2024/01/15/11/36/batman-8510023_1280.png",
};

const insertImages = () => {
  let fragment = document.createDocumentFragment();
  let id=0;
  for (const srcs in images_container) {
    let img = document.createElement("img");
    img.classList.add(
      "flex-shrink-0",
      "whitespace-nowrap",
      "h-auto",
      "max-h-[100px]",
      "cursor-pointer",
      "transition",
      "hover:scale-[1.2]",
      "snap-center",
      "max-w-600px",
      "rounded-md",
      
    );
    img.setAttribute('id',id);
    id++;
    img.src = images_container[srcs];
    fragment.appendChild(img);
  }
  images_div.append(fragment);
  images_div.firstElementChild.style.opacity=opacity;
  images_div.addEventListener("click", changeImageHandler);

 
};

const changeImageHandler = (e) => {
  if (e.target.tagName === "DIV") return;
 current_image.src = e.target.src;

 index=Number(e.target.id);
 console.log(index);
 
 imageUpdateAuto(index)
 
  Array.from(images_div.children).forEach(image => image.style.opacity = 1);
  e.target.style.opacity = opacity;

};


const imageUpdateAuto=(index)=>
{
  if (intervalId) {
    clearInterval(intervalId)
  }   
    
    let images_Array=Array.from(images_div.children);
    intervalId=setInterval(() => {
      current_image.src=images_Array[index].src;
      images_Array.forEach((img)=>(img.style.opacity=1));
      images_Array[index].style.opacity=opacity
      if (index<images_Array.length-1) {
        index++
      }
      else{
        index=0;
      }
    }, 2000);
    console.log(intervalId);

}


document.addEventListener("DOMContentLoaded", () => {
  insertImages();
  imageUpdateAuto(index)
});
