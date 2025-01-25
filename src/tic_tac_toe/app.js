let grid_container_Element = document.querySelector(".grid-container");
let reset_btn_Element = document.querySelector(".reset");
let p1_Element = document.querySelector(".p1");
let p2_Element = document.querySelector(".p2");
let rows = 3;
let cols = 3;
let Player = "X";
let inputArray = new Array(9).fill(null);
let idCounter = 0;
let winCount={

    X:0,
    0:0,
}

let drawCount={

    draw:0
}
const makeGrid = () => {
    grid_container_Element.innerHTML=""
  for (let row = 0; row < rows; row++) {
    let create_row = document.createElement("div");
    create_row.setAttribute("class", "row");
    create_row.className = " flex border  gap-2  w-fit";
    let create_col;
    for (let col = 0; col < cols; col++) {
      create_col = document.createElement("div");
      create_col.classList.add("col");
      create_col.dataset.id = idCounter;
      create_col.className =
        "w-16 h-16 sm:w-24 sm:h-24 cursor-pointer text-center text-[#00008B] sm:font-bold font-semibold text-5xl sm:text-7xl bg-white/20 shadow-lg rounded-lg  space-x-1 sm:space-x-4 border  border-red-800";
      create_row.append(create_col);
      idCounter++;
    }
    grid_container_Element.append(create_row);
  }
};
makeGrid();

let togglePlayerMarker=()=>
    {
    
    p1_Element.classList.toggle('current')
    p2_Element.classList.toggle('current')
    
    }
let updateWinCount=(Player)=>{
Player=='X'?winCount['X']+=1:winCount['0']+=1;

document.querySelector(".p1_wins").textContent = winCount["X"];
document.querySelector(".p2_wins").textContent = winCount["0"];

}

const clickHandler = (e) => {
  if (!e.target.dataset.id) return;
  if (e.target.textContent) return;
  let playerId = e.target.dataset.id;
  Player = Player == "X" ? "0" : "X";
  e.target.textContent = Player;
  inputArray[Number(playerId)] = Player;
    togglePlayerMarker()
  let isWinner = checkWin(Player);
  if (isWinner) {
    
    updateWinCount(Player)

    grid_container_Element.innerHTML = `
                   <div class="text-center">
                <h1 class="sm:font-bold font-semibold text-base sm:text-7xl text-white ">Congratulations,${Player} Wins</h1>
                                        </div>
                 `;

                 document.querySelector('.p1_wins').textContent=winCount['X'];
                   document.querySelector('.p2_wins').textContent=winCount['0'];
                 setTimeout(() => {
                    resetGameHandler()
                 }, 1000);
  }


  let isDraw = checkDraw();
  if (isDraw) {
    drawCount['draw']+=1;
    document.querySelector('.draws').textContent=drawCount['draw']
    grid_container_Element.innerHTML = `
    <div class="text-center">
 <h1 class="font-bold text-7xl text-white ">Draws</h1>
                         </div>
  `;
  setTimeout(() => {
    resetGameHandler();
  }, 2000);
  }
};

const checkDraw = () => inputArray.every((each) => each != null);
const resetGameHandler = () => {
  inputArray.fill(null);
  grid_container_Element.innerHTML = "";
  Player="X";
  idCounter=0;
  makeGrid();
};
const checkWin = (Player) => {
  console.log(Player);

  let Wins = [
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return Wins.some((win) => {
    return win.every((winIndex) => inputArray[winIndex] === Player);
  });
};
grid_container_Element.addEventListener("click", clickHandler);
reset_btn_Element.addEventListener("click", resetGameHandler);
