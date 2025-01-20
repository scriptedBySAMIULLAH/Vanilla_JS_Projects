#when i m trying to access the elements like card which are programmatically created but in dom the are not present so my fun is asyn (topAnimeFunction) which is responsible for fetching data and then card creation comes in so set the event listener on cards container instead on card (event delegation)

we cant do this <div class="absolute score in  top-0 left-0 bg-yellow-400 w-[${Math.round(score*10)}%] h-full rounded-full">
              </div> 
              because tw classes are static not dynamic


if we do innerHtml then its avaivlbe in dom if createElement then it takes time