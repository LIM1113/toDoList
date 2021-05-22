const toDoForm = document.querySelector('.toDoList');
const toDoText = toDoForm.querySelector('input');
let toDoBox = document.querySelector('.toDoBox');
let peddingBox = document.querySelector('.peddingBox')

const BtnShow = 'btnshow'
const LIST = 'list'
const RED = 'red'
let arrList = []
let newId = 0;

/*save in localStorage*/
function savetoDoList(value){
  localStorage.setItem(LIST, JSON.stringify(arrList))
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

/*로컬스토리지 삭제*/
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

/*체크박스 status 변경*/
function checkBoxEvent(event){
  const checkValue = event.target;
  const checkId = checkValue.id
  const checkSibling = checkValue.nextSibling;
  const parsedCheckId = parseInt(checkId)
  //checkSibling.classList.toggle('textLine');

  arrList.forEach(todo => {
    if(todo.id === parsedCheckId && todo.status === "on"){
      todo.status = "off";
      checkSibling.classList.add('textLine')
  } else if(todo.id === parsedCheckId && todo.status === "off"){
    todo.status = "on";
    checkSibling.classList.remove('textLine')
  }})
  savetoDoList();
}

/*todo 리스트 색 추가*/
function redColor(){
  const colorValue = event.target;
  console.log(colorValue);
  const colorId = colorValue.id;
  const parsedcolorId = parseInt(colorId);

  arrList.forEach(todo => {
    if(todo.id === parsedcolorId && todo.color === "black"){
      todo.color = "red";
      colorValue.classList.add('redColor')
    } else if(todo.id === parsedcolorId && todo.color === "red"){
      todo.color = "black";
      colorValue.classList.remove('redColor')
  }})

  savetoDoList();
}

/*todo리스트 앞으로 추가*/
function insertBox(text){
  toDoBox.insertBefore(text,toDoBox.childNodes[0]);
}

/*show the list in the listBox*/
function paintList(text,status,color){
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const check = document.createElement('input');
  const upBtn = document.createElement('button');
  const pendBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  newId += 1;
  div1.className = 'div1'
  div2.className = 'div2'

  ul.className = "todoSave";
  li.className = "something";
  li.innerText = text;
  li.setAttribute('id',newId);

  check.type = 'checkbox';
  check.className = "checkBox";
  check.setAttribute('id',newId);

  pendBtn.className = "pend"
  pendBtn.innerText = '⬇'
  delBtn.className = "del";
  delBtn.innerText = '✖';
  upBtn.innerText = '⬆'
  upBtn.className = 'Nonpend'

  div1.appendChild(check);
  div1.appendChild(li);
  div2.appendChild(delBtn);
  div2.appendChild(pendBtn);
//  div2.appendChild(upBtn);

  pendBtn.classList.add(BtnShow);
//  upBtn.classList.remove(BtnShow);

  insertBox(ul);
  ul.appendChild(div1);
  ul.appendChild(div2);
  ul.id = newId;


/*버튼 클릭 이벤트*/
  delBtn.addEventListener('click', deleteToDo);
  li.addEventListener('click',redColor);
  check.addEventListener('click',checkBoxEvent)

  let arrObj = {
    text: text,
    id: newId,
    status: status,
    color: color
  }

  if (arrObj.status === 'on'){
    check.checked = false;
    li.classList.remove('textLine')
  } else if(arrObj.status ==='off'){
    check.checked = true;
    li.classList.add('textLine')
  }

  if (arrObj.color === 'black'){
  //  check.checked = false;
    li.classList.remove('redColor')
  } else if(arrObj.color === "red"){
  //  check.checked = true;
    li.classList.add('redColor')
  }


  arrList.push(arrObj);
  savetoDoList();
}

/*새로운 todo 추가*/
function toDoFormSubmit(event){
  let listText = toDoText.value;
  event.preventDefault();
  if(listText === ""){
    return;
  }
  paintList(listText,'on','black');
  toDoText.value = ""
}

/*화면 로드*/
function loadList(){
  const listValue = localStorage.getItem(LIST);
  if(listValue !== null){
    const listLode = JSON.parse(listValue);
    listLode.forEach(todo => paintList(todo.text,todo.status,todo.color));
  }
}

function init(){
  loadList()
  toDoForm.addEventListener('submit',toDoFormSubmit);
}

init()
