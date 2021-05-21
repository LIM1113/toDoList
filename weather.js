const API_KEY = "0401e2b528135ed925f86d74c045ccf7"

const Location = "location"

const weather = document.querySelector('.weather')
const temps = document.querySelector('.temp')
const place = document.querySelector('.place')


function saveLocation(localSave){
  localStorage.setItem(Location, JSON.stringify(localSave))
}

function locationCoords(lat,long){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(json => {
    //  console.log(json)
      let location = json.name;
      let temper = json.main.temp;
      let weatherIF = json.weather[0].main;
      place.innerText = location;
      weather.innerText = weatherIF;
      temps.innerText = `${temper}°C`;
    })
}

function success(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position)

  let localSave = {
    latitude: latitude,
    longitude: longitude
  }

  saveLocation(localSave);
  locationCoords(latitude, longitude);
}

function error(){
  alert('cant access the location')
}

function searchLocation(){
  navigator.geolocation.getCurrentPosition(success, error);
}

function loadLocation(){
  let locationValue = localStorage.getItem(Location);
  if(locationValue === null){
    searchLocation();
  } else {
    const parseCoords = JSON.parse(locationValue);
    locationCoords(parseCoords.latitude, parseCoords.longitude)
  }
}

function init(){
  loadLocation()
}

init()
