const apiKey='Put your api key here';
let inputElement=document.querySelector('.input-element');
let wheatherBtn=document.querySelector('.wheather-btn');
let wheatherContainer=document.querySelector('.wheather-container');
let countryFlag=document.querySelector('#countryFlag');
let iconWheather=document.querySelector('.icon-wheather');
let errorElement=document.querySelector('.error');
let dataContainerElement=document.querySelector('.data-container');
let bodyElement=document.body;
const  getWheatherData= async (cityName)=>
{

  try {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    const response=await axios.get(apiUrl,{timeout:10000});
    const data=response.data;
    let countryCode=response.data.sys.country;
    // getCountryFlag(countryCode);
    showData(data,countryCode);
    updateBackground(data.weather[0].main);

    
  } catch (error) {
    showError();
  }

}
function showError() {

  errorElement.classList.remove('-translate-y-full');
  errorElement.classList.remove('opacity-0');

 setTimeout(() => {
      errorElement.classList.add('-translate-y-full');
      errorElement.classList.add('opacity-1');
  }, 2000);
  inputElement.value="";
  let previousWeather = document.querySelector('.wheather-container');
  if (previousWeather) {
    previousWeather.remove();
  }
}


const getInputHandler=(e)=>
{
    let cityName=inputElement.value.trim();
    if(!cityName) return;
    getWheatherData(cityName);
}


const showData= (data,countryCode)=>
{
  let previousWeather = document.querySelector('.wheather-container');
  if (previousWeather) {
    previousWeather.remove();
  }
  
  console.log(data);
  
 
  let icon=data.weather[0].icon;

  let wheatherData=
                   `
                   <section class="wheather-container text-center  shadow-sm  p-6 mt-6">
            
            <div class="name-flag flex items-center justify-center gap-2">
                <h1 class="text-xl font-bold">${data.name}</h1>
                <img id="countryFlag" alt="Country Flag" class="w-8" src="https://flagsapi.com/${countryCode}/flat/64.png">
            </div>

    
            <div class="icon flex justify-center my-3">
                <img alt="" class="icon-wheather w-20 object-cover" src="https://openweathermap.org/img/wn/${icon}@2x.png">
            </div>
            <div class="temp text-center">
                <h1 class="text-4xl font-extrabold text-gray-800">${Math.round(data.main['temp'])}°C</h1>
                <p class="text-lg text-gray-600">${data.weather[0].main}</p>
            </div>
            <div class="conditions grid grid-cols-3 gap-4 mt-5">
                <div class="card bg-red-100  p-8 rounded-lg shadow-md flex  flex-col items-center">
                    <h3 class="text-sm font-medium text-gray-700">Feels</h3>
                    <i class="fas fa-thermometer-half text-xl text-blue-500"></i> 
                    <h4 class="feels_like text-lg font-semibold">${Math.round(data.main.feels_like)}°C</h4>
                </div>
                <div class="card bg-yellow-100 p-8 rounded-lg shadow-md flex flex-col items-center">
                    <h3 class="text-sm font-medium text-gray-700">Humidity</h3>
                    <i class="fas fa-tint text-xl text-blue-500"></i> 
                    <h4 class="humidity text-lg font-semibold">${data.main.humidity}%</h4>
                </div>
                <div class="card bg-blue-100 p-8 rounded-lg shadow-md flex flex-col items-center">
                    <h3 class="text-sm font-medium text-gray-700">Clouds</h3>
                    <i class="fas fa-cloud text-xl text-blue-500"></i>
                    <h4 class="clouds text-lg font-semibold">${data.clouds.all}%</h4>
                </div>
            </div>
        </section>
                   `;
inputElement.value=""
           dataContainerElement.insertAdjacentHTML('beforeend',wheatherData);
    
 
}

const updateBackground = (weatherCondition) => {
  let backgroundImage = '';

  switch (weatherCondition.toLowerCase()) {
      case 'clear':
          backgroundImage = './clear.png';
          break;
      case 'clouds':
          backgroundImage = './clouds.png';
          break;
      case 'haze':
          backgroundImage = './haze.png';
          break;
      case 'rain':
          backgroundImage = './rain.png';
          break;
      case 'thunderstorm':
          backgroundImage = './thunder.png';
          break;
      case 'snow':
          backgroundImage = './snow.png.jpg';
          break;
      case 'mist':
        backgroundImage = './mist.png';
        break;
      case 'fog':
          backgroundImage = './fog.png';
          break;
      default:
          backgroundImage = './bg.png';
  }

  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.transition = 'background 0.5s ease-in-out';
};
wheatherBtn.addEventListener('click',getInputHandler)

inputElement.addEventListener('keydown',(e)=>
{
if (e.key=="Enter") {
  getInputHandler();
}
})




