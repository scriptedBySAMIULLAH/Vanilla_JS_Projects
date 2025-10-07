let seatsGridElement = document.querySelector(".seats");
let priceElement = document.querySelector(".price");
let selectedSeatsElement = document.querySelector(".selectedSeats");
let screenElement = document.querySelector(".screen");
let moviesElement = document.querySelector(".movies");
let seatCount = 0;
let currentPrice = 0;
let selectedMovie="toyStory";
let rowDiv;
let seat_rows = {
  rows: 4,
  seatPerRow: 4,
};

let seatStatus = {
  "fa-chair": false,
  "fa-crown": false,
};

let pricing = {
  "fa-chair": 100,
  "fa-crown": 500,
};


let movies={

    "panda":
    {
        url:'https://media.giphy.com/media/t0RP71bVKSASR4TypY/giphy.gif?cid=ecf05e47ujq1nqz5hbx1mz3c7xux573hes0grlscpk3v3lqi&ep=v1_gifs_search&rid=giphy.gif&ct=g',
       vipSeats:
       {
        row_1: [1, 2],
        row_2: [3],
       },
       soldSeats:
       {
        row_3: [0, 3]
       }
    },
    "minions":
    {
        url:'https://media.giphy.com/media/10S4rk0J10AKlO/giphy.gif?cid=790b76119ri8shdwyqouuvuxvb1r8dils4e6nxjeetjotzgg&ep=v1_gifs_search&rid=giphy.gif&ct=g',

        vipSeats:
        {

            row_1:[0,1]
        },
        soldSeats:
        {
            row_3:[3,1]
        }

    },
    "babyBoss":
    {
        url:'https://media.giphy.com/media/vsZk2FOYU7uz9nii6w/giphy.gif?cid=790b7611ubrppcn2t63dvxfr8a5u52ci2j2nqujwaugiful7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
        
        vipSeats:
        {

            row_2:[1],
            row_1:[2],
            row_3:[3]
        },
        soldSeats:[1]
    },
    "toyStory":
    {
        url:"https://media.giphy.com/media/7V8vnH1ujyvyE/giphy.gif?cid=790b76114can7xeehl0sjis8vntdjd23duqck9ba0cn10u83&ep=v1_gifs_search&rid=giphy.gif&ct=g",

        vipSeats:
        {
            row_1:[1],
            row_2:[0]
        },

        soldSeats:
        {
            row_1:[1,0]
        }

    }
}
const priceHandler = (selectedElement) => {
  let iTAg = selectedElement.firstElementChild;

  if (!selectedElement.classList.contains("selected")) {
    iTAg.classList.contains("fa-chair")
      ? (currentPrice -= pricing["fa-chair"])
      : (currentPrice -= pricing["fa-crown"]);
  } else {
    iTAg.classList.contains("fa-chair")
      ? (currentPrice += pricing["fa-chair"])
      : (currentPrice += pricing["fa-crown"]);
  }
  priceElement.textContent = currentPrice;
};

const createSeatHandler = function (rows, seatPerRow,selectedMovie) {
    
    
  for (let row = 0; row < rows; row++) {
     rowDiv = document.createElement("div");
    rowDiv.classList.add("rowDiv");

    for (let seat = 0; seat < seatPerRow; seat++) {
      let seatButton = document.createElement("button");

      seatButton.classList.add("seatButton");
      

      if (movies[selectedMovie].vipSeats[`row_${row}`] &&movies[selectedMovie].vipSeats[`row_${row}`].includes(seat) ) {
        seatButton.innerHTML =
          '<i class="fas fa-crown text-yellow-800 text-xs bg-gradient-to-r from-yellow-200 to-yellow-400 p-2"></i>';
      } else if (
        movies[selectedMovie].soldSeats[`row_${row}`]  &&
        movies[selectedMovie].soldSeats[`row_${row}`].includes(seat))
         {
        seatButton.classList.add("cursor-not-allowed");
        seatButton.innerHTML =
          '<i class="fas fa-chair text-red-500 text-center border p-2 border-gray-400 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white"></i>';
      } else {
        seatButton.innerHTML =
          '<i class="fas fa-chair text-white text-center border  border-green-600 p-2 shadow-lg bg-gradient-to-r from-green-500 to-green-600"></i>';
      }
      rowDiv.append(seatButton);
    }

    seatsGridElement.append(rowDiv);
  }
};

const selectedSeatsHandler = (e) => {
  if (e.target.tagName == "I" || e.target.tagName == "BUTTON") {
    let selectedElement =
      e.target.tagName == "I" ? e.target.parentElement : e.target;

    toggleClassHandler(selectedElement);
  }
};

const toggleClassHandler = (selectedElement) => {
  if (!selectedElement.classList.contains("cursor-not-allowed")) {
    let trackSelection = selectedElement.classList.toggle("selected");

    seatUpdate(trackSelection);

    priceHandler(selectedElement);
  }
};

const seatUpdate = (trackSelection) => {
  trackSelection == true ? seatCount++ : seatCount--;

  selectedSeatsElement.textContent = seatCount;
};


const movieSelectionUpdater=(e)=>
{
  
    
    selectedMovie=e.target.value;
    screenElement.style.background=`url(${movies[selectedMovie]['url']})`;
    screenElement.style.backgroundSize = "cover";
    screenElement.style.backgroundRepeat = "no-repeat";
    screenElement.style.backgroundPosition = "center";
    //clear prev one
    seatsGridElement.innerHTML=""
    priceElement.innerHTML=0;
    selectedSeatsElement.innerHTML=0;
    seatCount=0;
    currentPrice=0;
    createSeatHandler(seat_rows["rows"], seat_rows["seatPerRow"],selectedMovie)

    
}

createSeatHandler(seat_rows["rows"], seat_rows["seatPerRow"],selectedMovie);
seatsGridElement.addEventListener("click", selectedSeatsHandler);

moviesElement.addEventListener("change",movieSelectionUpdater)
