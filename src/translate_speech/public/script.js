let voice_Element = document.getElementById("voices");
let lang_Element = document.getElementById("langs");
let text_input_Element = document.getElementById("text_input");
let volume_Element = document.getElementById("volume");
let current_value_Element = document.getElementById("current-value");
let speak_Element = document.querySelector(".speak");
let selectedLanguage, selectedVoice, textToSpeak;
let volumeValue=0;
let voices;

const languages = [
  { code: "en", name: "English" },
  { code: "ja", name: "Japanese" },
  { code: "de", name: "German" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ur", name: "Urdu" },
  { code: "ps", name: "Pashto (Afghanistan)" },  // Pashto (Afghan national language)
  { code: "tr", name: "Turkish" }
];
const populateLanguages = () => {
  if (languages.length <= 0) return;

  languages.forEach((language) => {
    let lang_Option = document.createElement("option");
    lang_Option.value = language["code"];
    lang_Option.textContent = language["name"];
    lang_Element.appendChild(lang_Option);
  });
};
const loadVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice, index) => {
    let options_Voice = document.createElement("option");
    options_Voice.value = voice.name;
    options_Voice.textContent = `${voice.lang} ${voice.name}`;
    voice_Element.appendChild(options_Voice);
  });
};
const speak_handler = (translatedText) => {
  console.log(translatedText);
  if (translatedText) {
    clearTextInput();
    text_input_Element.value = translatedText;
  }
  selectedVoice = voice_Element.value;

  if (!translatedText) return;
  const utterance = new SpeechSynthesisUtterance(translatedText);
  voices.forEach((voice, index) => {
    if (voice.name == selectedVoice) {
      utterance.voice = voice; //voice property take obj
    }
  });
  utterance.volume=parseFloat((volumeValue/100).toFixed(1));
  speechSynthesis.speak(utterance);
};

//translate text
const translateText = async () => {
  selectedLanguage = lang_Element.value;
  textToSpeak = text_input_Element.value;
  if (!textToSpeak) return;

  try {
    const response = await fetch(`/api/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textToSpeak,
        targetLanguage: selectedLanguage,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status} : ${await response.text()}`);
    }

    const data = await response.json(); //convert json response into js format

    let translatedText = await data[0][0][0];

    speak_handler(translatedText);
  } catch (error) {
    alert(error);
  }
};

const clearTextInput = () => {
  text_input_Element.value = "";
};

const volumeHandler = (e) => {
  volumeValue = e.target.value;
  console.log(volumeValue);
  
  if (volumeValue) {
    current_value_Element.textContent = volumeValue;
  }
};

clearTextInput();
loadVoices();
populateLanguages();
volume_Element.addEventListener("change", volumeHandler);
speechSynthesis.onvoiceschanged = loadVoices; //when loaded
speak_Element.addEventListener("click", translateText);
