const forms = document.querySelector('.forms');
const nameInput = forms.querySelector('input');
const greeting = document.querySelector('.greeting')
const resetNon = document.querySelector('.resetNon')


console.log(greeting)

let USER_LS = 'user'
const SHOWING = 'showing'


function saveUser(value){
  localStorage.setItem(USER_LS, value)
}

function submitEvent(event){
  event.preventDefault();
  const uerInput = nameInput.value;
  if(uerInput === ""){
    return;
  }
  paintUserScreen(uerInput);
  saveUser(uerInput);
}

function nameInputFn(){
  forms.classList.add(SHOWING);
  greeting.classList.remove(SHOWING);
  resetNon.classList.remove(SHOWING);
  forms.addEventListener('submit',submitEvent);
}

function resetUser(){
  nameInputFn();
  localStorage.removeItem(USER_LS)
  nameInput.value = "";
}

function paintUserScreen(text){
  forms.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  resetNon.classList.add(SHOWING);
  greeting.innerText = `hello ${text}`
  resetNon.addEventListener('click',resetUser);
  //console.log(text)
}

function paintName(){
  const nameValue = localStorage.getItem(USER_LS);
  if(nameValue === null){
    nameInputFn();
  } else{
    paintUserScreen(nameValue);
  }
}

function init(){
  paintName()
}

init()
