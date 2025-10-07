let wrapperElement = document.querySelector(".wrapper");
let getId = new URLSearchParams(window.location.search);
let detailAnimeId = getId.has("id") ? getId.get("id") : 0;
const fetchDetailAnime = async (detailAnimeId) => {
  let animeDetailUrl = `https://api.jikan.moe/v4/anime/${detailAnimeId}`;
  // console.log(animeDetailUrl);

  try {
    let result = await fetch(animeDetailUrl);
    let data = await result.json();
    // console.log(data['data']);
    extractDetailAnime(data["data"]);
  } catch (error) {
    wrapperElement.textContent = "No result found";
  }
};
if (detailAnimeId != 0) {
  // console.log(detailAnimeId);

  fetchDetailAnime(detailAnimeId);
}

const extractDetailAnime = (dataObj) => {
  console.log(dataObj);

  let img, title_english, title_japanese, season, episodes, rating, score,duration,airing;
  img = dataObj["images"]["jpg"]["image_url"] ?? "N/A";

  title_english = dataObj["title_english"] ?? "N/A";

  title_japanese = dataObj["title_japanese"] ?? "N/A";

  season = dataObj["season"] ?? "N/A";

  airing = dataObj["airing"] ?? "N/A";

  duration = dataObj["duration"] ?? "N/A";

  episodes = dataObj["episodes"] ?? "N/A";

  rating = dataObj["rating"] ?? "N/A";

  score = dataObj["score"] ?? "N/A";

  displayAnime(
    img,
    title_english,
    title_japanese,
    season,
    episodes,
    rating,
    score,
    duration,
    airing
  );
};

const displayAnime = (
  img,
  title_english,
  title_japanese,
  season,
  episodes,
  rating,
  score,
  duration,
  airing
) => {
    wrapperElement.innerHTML=""
  wrapperElement.innerHTML = `
    <div class="rounded hidden sm:block relative">
                <img src="${img}" alt="Image" class="rounded">
                <span class="inline-block absolute  top-0 right-0 text-lg font-bold bg-opacity-5 animate-pulse">${airing==false?"Not airing":"On Air"}</span>
            </div>

            <!-- details -->
        <section class="  flex  flex-col    p-2">
            
        <!-- details -->  
          

            <!-- Title -->
            <div class="border border-b-white border-b-2 mb-2 flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 py-2 ">
              <span class="font-semibold">Title</span>
              <span class="truncate">${title_english}</span>
            </div>
            
            <!-- Title (Japanese) -->
            <div class="flex flex-col border-b-white border-b-2 mb-2  sm:flex-row sm:justify-between border-b border-gray-700 py-2">
              <span class="font-semibold">Title (Japanese)</span>
              <span class="truncate">${title_japanese}</span>
            </div>
            
            <!-- Season -->
            <div class="flex border-b-white border-b-2 mb-2  flex-col sm:flex-row sm:justify-between border-b border-gray-700 py-2">
              <span class="font-semibold">Season</span>
              <span>${season}</span>
            </div>
            
            <!-- Episodes -->
            <div class="flex border-b-white border-b-2 mb-2  flex-col sm:flex-row sm:justify-between border-b border-gray-700 py-2">
              <span class="font-semibold">Episodes</span>
              <span>${episodes}</span>
            </div>
            <!-- duration -->
            <div class="flex border-b-white border-b-2 mb-2  flex-col sm:flex-row sm:justify-between border-b border-gray-700 py-2">
              <span class="font-semibold">Duration</span>
              <span>${duration}</span>
            </div>
            
            <!-- Rating -->
            <div class="flex flex-col  sm:flex-row sm:justify-between border-b border-gray-700 py-2">
              <span class="font-semibold">Rating</span>
              <span>${rating}</span>
            </div>
            <!-- Score -->
            <div class=" relative w-full  bg-white mt-2 h-6 rounded-full">
              <div class="absolute score   top-0 left-0 bg-yellow-400  h-full rounded-full">
              </div>
            </div>
          
        </section>

    `;

    const scoreElement=document.querySelector('.score');
    if (scoreElement) {

        scoreElement.style.width=`${score*10}%`;
    }
  
};

const tabButtonHandler=(e)=>
{

console.log(e.target);

}