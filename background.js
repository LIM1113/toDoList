const body = document.querySelector('body')
let form = document.querySelector('form')

const ImgNum = 5

function paintImage(imgNum){
  const image = new Image();
  console.log(image);
  image.src = `images/${imgNum + 1}.jpg`;
  image.classList.add('backImag');
  body.insertBefore(image,body.childNodes[0]);
}

function getrandomNum(){
  const num = Math.floor(Math.random()*ImgNum);
  return num;
}

function init(){
  const randomNumber = getrandomNum();
  paintImage(randomNumber);
}

init()
