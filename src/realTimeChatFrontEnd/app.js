let chatContainerElement = document.querySelector(".chat-container");
let sendBtn = document.querySelector(".send-btn");
let inputELement = document.querySelector(".input");
let clrELement = document.querySelector(".clr");
let toggleBotBtn = document.querySelector("#toggle-bot");
let turn = "user_1";
let color;
let avatar
let userName;
let chatHistory = JSON.parse(localStorage.getItem("chats") || "[]");

const botResponses = {
  "hello": "Hi there! How can I assist you? 😊",
  "how are you": "I'm just a bot, but I'm doing great! How about you?",
  "what is your name": "I'm Mr.bot 🤖, your friendly assistant.",
  "bye": "Goodbye! Have a great day! 👋",
  "default": "I'm not sure how to respond to that. Try asking something else!"
};
let imgs = {
  user_1: "./user-1.png",
  user_2: "./user-2.png",
  bot:"./robo.png"
};
let colors = {
  user_1: "bg-purple-500",
  user_2: "bg-green-500",
  bot:"bg-slate-400"
};

let enbleBot=false;
const putInLocaleStorage = (turn, text) => {
  let chat = {
    user: turn,
    msg: text,
  };

  chatHistory.push(chat);

  localStorage.setItem("chats", JSON.stringify(chatHistory));
};

const appendMessage = (text,user) => {
      if (user) {
        turn=user
    }
  const now = new Date();
  const time = now.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (turn=="user_1") {
    color = colors["user_1"];
    avatar= imgs["user_1"];
    userName="Jimmy"
    console.log(turn);
    
    
  } else if(turn=="user_2"){
    color = colors["user_2"];
    avatar= imgs["user_2"];
    userName="John"
  }
    else if(turn=="bot")
    {
      console.log('bot');
      
      color = colors["bot"];
      avatar= imgs["bot"];
      userName="Mr.Bot"
      text=botResponses[text]
      ??
      botResponses['default'];

    }

  let message = `
    <div
          class="${color} text-white rounded-xl w-full sm:max-w-[50%] p-1 sm:p-3 shadow-lg chat-message"
        >
      
          <div class="flex items-center justify-between px-2 mb-2">
          
            <img
              src="${avatar}"
              class="w-8 h-8 object-cover rounded-full border border-white bg-gray-200"
              alt="user-1"
            />
            <h1 class="font-semibold text-white text-sm">${
             userName
            }</h1>
          </div>

         
          <p class="text-white text-sm leading-relaxed">
            ${text}
          </p>

          
          <h3 class="text-gray-300 text-xs text-right mt-2">${time}</h3>
        </div>`;

  chatContainerElement.insertAdjacentHTML("beforeend", message);
};
const getMessageHandler = (e) => {
  let text = inputELement.value.trim();

  if (!text) return;
  appendMessage(text,turn);
  inputELement.value = "";
  putInLocaleStorage(turn, text);
  turn == "user_1" ? (turn = "user_2") : (turn = "user_1");

  if (chatHistory) {
    clrELement.classList.remove('hidden')
    
  }
};

const getFromLocalStorage = () => {
  chatHistory.forEach((chat) => {
    console.log(chat);
    
    appendMessage(chat.msg,chat.user);
  });
console.log(chatHistory);

  if (chatHistory.length==0) {
    clrELement.classList.add('hidden')
  }
  inputELement.value=""
};
const clearStorageHandler = () => {
 localStorage.clear()
 chatContainerElement.innerHTML=""
 clrELement.classList.add('hidden')
};
const enbleBotHandler = (e) => {


 e.target.innerText=="Disable Bot🤖"
 ?
  e.target.innerText="Enable Bot🤖"
  :
 e.target.innerText="Disable Bot🤖"

enbleBot==false
?
enbleBot=true
:
enbleBot=false
if (enbleBot==false) {
  turn="user_1";
}

inputELement.value=""
};
const botResponseHandler = (e) => {

 let text = inputELement.value.trim();
 if (!text) return;
turn="user_1"
 appendMessage(text,turn);
 turn="bot"
 appendMessage(text,turn);
 inputELement.innerText=""
 
 };
const checkBotOrUserHandler = (e) => {
if (!enbleBot) {
  getMessageHandler();
} else {
  botResponseHandler();
}
  };


getFromLocalStorage()
sendBtn.addEventListener("click",checkBotOrUserHandler);
clrELement.addEventListener("click", clearStorageHandler);
toggleBotBtn.addEventListener("click", enbleBotHandler);
