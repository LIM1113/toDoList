const clock = document.querySelector('.clock')
const dateShow = document.querySelector('.dateShow')

function dateStart(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dates = date.getDate();

  dateShow.innerText =
  `${year >= 10 ? `${year}` : `0${year}`}.${month >= 10 ? `${month}` : `0${month}`}.${dates >= 10 ? `${dates}` : `0${dates}`}`
}

function timeStart(){
  let date = new Date();
  let ampm = date.getHours() >= 12 ? "pm" : "am";
  let hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
    

  clock.innerText = `${hours >= 10 ? `${hours}` : `0${hours}`}:${minutes >= 10 ? `${minutes}` : `0${minutes}`}:${seconds >= 10 ? `${seconds}` : `0${seconds}`} ${ampm}`
}


function init(){
  dateStart()
  timeStart()
  interval = setInterval(timeStart, 1000);
}

init()
