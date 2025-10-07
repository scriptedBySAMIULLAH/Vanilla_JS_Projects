let top_anime_container_Element = document.querySelector(
  ".top-anime-container"
);
let searchElement = document.querySelector(".search");
let filter_Element = document.querySelector("#filter");
let clearFilter_Element = document.querySelector(".clearFilter");
let heartIcon_Element;
let event;
let allAnimes=[];
let fav_Animes=JSON.parse(localStorage.getItem('favAnimes')||'[]');
let spinner_Element=document.querySelector('.spinner');

let favBtn_Element=document.getElementById('fav')
const topAnimeFetch = async (event = null) => {    
  let topAnimeUrl;
  spinner_Element.style.display="flex"
  if (event != null) {
    top_anime_container_Element.innerHTML = "";
  }
  event == null
    ? (topAnimeUrl = "https://api.jikan.moe/v4/top/anime")
    : (topAnimeUrl = `https://api.jikan.moe/v4/anime?type=${event.target.value}`);

  try {
    const result = await fetch(topAnimeUrl);

    const data = await result.json();
    allAnimes=data["data"];
    getTopAnime(data["data"]);
  } catch (error) {
    top_anime_container_Element.textContent = error;
  }

  finally{
    spinner_Element.style.display="none";
    top_anime_container_Element.style.display="grid";
  }
};

const getTopAnime = (dataArray) => {
  dataArray.forEach((anime) => {
    let title = anime["title_english"] ?? "Not Availabel";
    let images = anime["images"]?.["jpg"]?.["image_url"] ?? "Not Availabel";
    let score = anime["score"];
    let id = anime["mal_id"];
    displayTopAnime(title, images, score, id);
  });
};

const displayTopAnime = (title, images, score, id) => {
  let card = document.createElement("div");
  card.className = `cursor-pointer card item-center bg-transparent border transition transform hover:scale-105 hover:border-red-800 duration-200 hover:shadow-lg ease-in-out rounded-md shadow-md text-white p-2 text-center m-1 w-48`;
  card.setAttribute("id", id);
  card.innerHTML=
  `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 -960 960 960"
    class="heartIcon-empty heartIcon"
    
  >
    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
  </svg>

`

  let h1 = document.createElement("h1");
  h1.className = "font-semibold text-lg my-2 truncate";
  h1.textContent = `${title}`;

  let img = document.createElement("img");
  img.className = "rounded-md w-full flex-grow h-auto mb-2 object-cover";
  img.setAttribute("src", images);
  let innerDiv = document.createElement("div");
  innerDiv.className = "relative outer inline-block";
  innerDiv.innerHTML = `
        <div class="absolute top-0 left-0 inner "style="width:${Math.round(
          score * 10
        )}%;">

        </div>`;

  card.append(h1);
  card.append(img);
  card.append(innerDiv);

  top_anime_container_Element.append(card);
  heartIcon_Element= document.querySelector(".heartIcon");
  localStorageElementsApplyClass(id)
};

const animeSearchHandler = (e) => {
  if (e.target.tagName === "svg") {
    let getInput = e.target.previousElementSibling;
    const searchValue = getInput.value;
    if (searchValue) {
      getSearchedAnime(searchValue);
    }
  }
};

const getSearchedAnime = async (searchValue) => {
  try {
    const searchAnimeUrl = `https://api.jikan.moe/v4/anime?q=${searchValue}`;
    const result = await fetch(searchAnimeUrl);
    const data = await result.json();
    top_anime_container_Element.innerHTML = "";
    getTopAnime(data["data"]);
  } catch (error) {
    console.error(error);
  }
};
const getDetailsAnimeHandler = (e) => {
    //put in local storage
  if (e.target.tagName=="svg") {
    let chheckIconclass=e.target.classList.contains('heartIcon-empty')
    e.target.classList.toggle('heartIcon-filled',chheckIconclass)
    e.target.classList.toggle('heartIcon-empty',!chheckIconclass);
    // console.log(e.target.closest('.card').children[3][0]);
    
    let favAnimeId=e.target.closest('.card').id;
    let checkAgainIconClass=e.target.classList.contains('heartIcon-empty');
    if (checkAgainIconClass) {
        clearLocalStorageHandler(favAnimeId)
    }
    else{
 putInLocalStorageHandler(favAnimeId)
    }
    
   
   return;
  }  
  let cardId = e.target.closest(".card").id;
  let queryUrl = new URLSearchParams();
  queryUrl.set("id", cardId);
  queryUrl.toString(); //uitable for use in a URL.
  let detailPageUrl = `detailAnime.html`;
  if (cardId) {
    window.location.href = `${detailPageUrl}?${queryUrl}`;
  }
};

const clearFilterHandler=()=>{
    if (searchElement) {
        searchElement.textContentL=''
    }
    top_anime_container_Element.innerHTML=""
    topAnimeFetch()
}

topAnimeFetch();
const clearLocalStorageHandler=(favAnimeId)=>{

    fav_Animes=fav_Animes.filter((ele)=>{
       return ele.id!=favAnimeId;
    });
    localStorage.setItem('favAnimes',JSON.stringify(fav_Animes));
}

const putInLocalStorageHandler=(favAnimeId)=>{

let findFavAnime=allAnimes.find((ele)=>(ele['mal_id']==favAnimeId))


let fav_anime_Obj={
    id:findFavAnime['mal_id'],
    title:findFavAnime['title'],
    image:findFavAnime["images"]?.["jpg"]?.["image_url"] ?? "Not Availabel",
    score:findFavAnime['score']
};
fav_Animes.push(fav_anime_Obj)
 
localStorage.setItem('favAnimes',JSON.stringify(fav_Animes));

}

const localStorageElementsApplyClass = (id) => {
    fav_Animes.forEach((ele) => {
      if (ele['id'] === id) {
        let element = document.getElementById(id);
        let svgElement = element.querySelector('.heartIcon-empty');
        if (svgElement) {
          svgElement.classList.remove("heartIcon-empty");
          svgElement.classList.add("heartIcon-filled");
        }
      }  
    });
  };
const displayFavsHandler=()=>
    {
        top_anime_container_Element.innerHTML=""
        fav_Animes.forEach((ele)=>{
            console.log(ele);
            let id=ele.id;
            let title=ele.title;
            let images=ele.image;
            let score=ele.score;
             
            displayTopAnime(title, images, score, id)
            
        })
       
       
    } 
favBtn_Element.addEventListener('click',displayFavsHandler)
clearFilter_Element.addEventListener('click',clearFilterHandler);
top_anime_container_Element.addEventListener("click", getDetailsAnimeHandler);
filter_Element.addEventListener("change", topAnimeFetch);
searchElement.addEventListener("click", animeSearchHandler);

