const toDoForm = document.querySelector('.toDoList');
const toDoText = toDoForm.querySelector('input');
let toDoBox = document.querySelector('.toDoBox');
let peddingBox = document.querySelector('.peddingBox')

const BtnShow = 'btnshow'
const LIST = 'list'
let arrList = []
let newId = 0;

/*save in localStorage*/
function savetoDoList(value){
  localStorage.setItem(LIST, JSON.stringify(arrList))
}

/*delete the list in localStorage*/

function deleteToDo(event){
  let delvalue =  event.target;
  let delparent = delvalue.parentNode;
  let lastparent = delparent.parentNode;

  toDoBox.removeChild(lastparent);

  const cleanToDos = arrList.filter(function(toDo){
    return toDo.id !== parseInt(lastparent.id);
  })

  arrList = cleanToDos;
  savetoDoList();
}

function redColor(){
  event.target.classList.toggle('redColor');
}

function textThrough(event){
  const checkValue = event.target;
  const checkSibling = checkValue.nextSibling;
  checkSibling.classList.toggle('textLine');
}

function addToPendding(value){
  peddingBox.appendChild(value);
}

function penddingBoxBtn(value){
  console.log(value);
  const pendBtnValue = value.nextSibling;
  console.log(pendBtnValue);
  pendBtnValue.addEventListener('click', e => parentupdate(e));
}

function parentupdate(e){
  let valueFirst = e.target;
  let value1 = valueFirst.parentNode;
  let value2 = value1.parentNode;
//  console.log(value2)
  insertBox(value2)
  valueFirst.classList.remove(BtnShow);
  valueFirst.previousSibling.classList.add(BtnShow);
}

function penddingToDo(){
  const value = event.target;
  const pendValue = value.parentNode;
  const pendParents = pendValue.parentNode;
  const upBtnValue = value.nextSibling;

  value.classList.remove(BtnShow);
  upBtnValue.classList.add(BtnShow);
  addToPendding(pendParents);
  penddingBoxBtn(value);
}

function insertBox(text){
  toDoBox.insertBefore(text,toDoBox.childNodes[0]);
}

/*show the list in the listBox*/
function paintList(text){
  const ul = document.createElement('ul');
  const delBtn = document.createElement('button');
  const check = document.createElement('input');
  const li = document.createElement('li');
  const pendBtn = document.createElement('button');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');

  const upBtn = document.createElement('button');
  upBtn.innerText = '⬆'
  upBtn.className = 'Nonpend'

  newId += 1;
  pendBtn.className = "pend"
  div1.className = 'div1'
  div2.className = 'div2'
  pendBtn.innerText = '⬇'
  check.type = 'checkbox';
  ul.className = "todoSave";
  delBtn.className = "del";
  li.className = "something";
  delBtn.innerText = '✖';
  li.innerText = text;
  check.className = "checkBox";

  div1.appendChild(check);
  div1.appendChild(li);
  div2.appendChild(delBtn);
  div2.appendChild(pendBtn);
  div2.appendChild(upBtn);

  pendBtn.classList.add(BtnShow);
  upBtn.classList.remove(BtnShow);

  insertBox(ul);
  ul.appendChild(div1);
  ul.appendChild(div2);

  check.addEventListener('click',(e) => textThrough(e))
  li.addEventListener('click',redColor);
  delBtn.addEventListener('click', deleteToDo);
  pendBtn.addEventListener('click',penddingToDo);

  upBtn.addEventListener('click',() => console.log());
  ul.id = newId;

  let arrObj = {
    text: text,
    id: newId
  }

  arrList.push(arrObj);
  savetoDoList();
}

/*default the form & toss the input value*/

function toDoFormSubmit(event){
  let listText = toDoText.value;
  event.preventDefault();
  if(listText === ""){
    return;
  }
  paintList(listText);
  toDoText.value = ""
}

/*loadList -> localstorage load to screen*/

function loadList(){
  const listValue = localStorage.getItem(LIST);
  if(listValue !== null){
    const listLode = JSON.parse(listValue);
    listLode.forEach(todo => paintList(todo.text));
  }
}

function init(){
  loadList()
  toDoForm.addEventListener('submit',toDoFormSubmit);
}

init()
