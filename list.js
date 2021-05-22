const toDoForm = document.querySelector('.toDoList');
const toDoText = toDoForm.querySelector('input');
let toDoBox = document.querySelector('.toDoBox');
let peddingBox = document.querySelector('.peddingBox')

const BtnShow = 'btnshow';
const LIST = 'list';
const PENDLIST = 'pendlist';
const RED = 'red';

/*array는 변하는 값이기 때문에, const로 주면 안된다!*/
let arrList = [];
let pendarr = [];
let newId = 0;

/*todo리스트 로컬스토리지 저장*/
function savetoDoList(value){
  localStorage.setItem(LIST, JSON.stringify(arrList))
}

/*펜딩리스트 로컬스토리지 저장*/
function savePendList(value){
  localStorage.setItem(PENDLIST, JSON.stringify(pendarr))
}

/*todolist 로컬스토리지 삭제*/
function deleteToDo(event){
  const delvalue =  event.target;
  const delparent = delvalue.parentNode;
  const delUl = delparent.parentNode;
  toDoBox.removeChild(delUl);
  const cleanToDoList = arrList.filter(function(toDo){
    return toDo.id !== parseInt(delUl.id);
  })

  arrList = cleanToDoList;
  savetoDoList();
}

/*펜딩리스트 로컬스토리지 삭제*/
function deletePendToDo(event){
  const delvalue =  event.target;
  const delparent = delvalue.parentNode;
  const delUl = delparent.parentNode;
  peddingBox.removeChild(delUl);
  const cleanPend = pendarr.filter(function(toDo){
    return toDo.id !== parseInt(delUl.id);
  })

  pendarr = cleanPend;
  savePendList();
}

/*체크박스 status 변경*/
function checkBoxEvent(event){
  const checkValue = event.target;
  const checkId = checkValue.id
  const checkSibling = checkValue.nextSibling;
  const parsedCheckId = parseInt(checkId)

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
  //console.log(colorValue);
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

/*펜딩으로 변경*/
function penddingBoxMove(event){
  const pendValue = event.target;
  const pendId = pendValue.id;
  const pendIdNum = parseInt(pendId);
  const pendListPush = arrList.filter(todo =>
    todo.id === pendIdNum
  )
  const pendText = pendListPush[0].text;
  const pendColor = pendListPush[0].color;
  const pendStatus = pendListPush[0].status;
  //console.log(pendText);
  pendpaintList(pendText,pendColor,pendStatus);
  deleteToDo(event);
}

/*todo로 이동*/
function todoBoxMove(event){
  const todoValue = event.target;
  const todoId = todoValue.id;
  const todoIdNum = parseInt(todoId);
  const todoListPush = pendarr.filter(todo =>
    todo.id === todoIdNum
  )

//  console.log(todoValue)
  const todoText = todoListPush[0].text;
  const todoColor = todoListPush[0].color;
  const todoStatus = todoListPush[0].status;

//  console.log(todoText);
  paintList(todoText,todoColor,todoStatus);
  deletePendToDo(event);
}

/*todo리스트 앞으로 추가*/
function insertBox(text, box){
  box.insertBefore(text,box.childNodes[0]);
}

/*todolist 화면 로드 및 버튼 클릭 이벤트*/
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
  pendBtn.setAttribute('id',newId);
  delBtn.className = "del";
  delBtn.innerText = '✖';
  upBtn.innerText = '⬆'
  upBtn.className = 'Nonpend'

  div1.append(check, li);
  div2.append(delBtn, pendBtn);
  pendBtn.classList.add(BtnShow);

  insertBox(ul, toDoBox);
  ul.append(div1, div2);
  ul.id = newId;


/*버튼 클릭 이벤트*/
  delBtn.addEventListener('click', deleteToDo);
  li.addEventListener('click',redColor);
  check.addEventListener('click',checkBoxEvent)
  pendBtn.addEventListener('click',penddingBoxMove)

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

/*팬딩 리스트 화면 로드 및 버튼 클릭 이벤트*/
function pendpaintList(text, status, color){
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
  pendBtn.setAttribute('id',newId);
  delBtn.className = "del";
  delBtn.innerText = '✖';
  upBtn.innerText = '⬆'
  upBtn.className = 'Nonpend'
  upBtn.setAttribute('id',newId);

  div1.append(check, li);
  div2.append(delBtn, upBtn);

  upBtn.classList.add(BtnShow);

  insertBox(ul, peddingBox);
  ul.append(div1, div2);
  ul.id = newId;

/*버튼 클릭 이벤트*/
  delBtn.addEventListener('click', deletePendToDo);
  li.addEventListener('click',redColor);
  check.addEventListener('click',checkBoxEvent)
  upBtn.addEventListener('click',todoBoxMove)

  let pendObj = {
    text: text,
    id: newId,
    status: status,
    color: color
  }

  if (pendObj.status === 'on'){
    check.checked = false;
    li.classList.remove('textLine')
  } else if(pendObj.status ==='off'){
    check.checked = true;
    li.classList.add('textLine')
  }

  if (pendObj.color === 'black'){
    li.classList.remove('redColor')
  } else if(pendObj.color === "red"){
    li.classList.add('redColor')
  }
  pendarr.push(pendObj);
  savePendList();
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

/*첫 화면 로드*/
function loadList(){
  const listValue = localStorage.getItem(LIST);
  const pendListValue = localStorage.getItem(PENDLIST);
  if(listValue !== null){
    const listLode = JSON.parse(listValue);
    listLode.forEach(todo => paintList(todo.text,todo.status,todo.color));
  }
  if(pendListValue !== null){
    const pendlistLode = JSON.parse(pendListValue);
    pendlistLode.forEach(todo => pendpaintList(todo.text,todo.status,todo.color));
  }
}

function init(){
  loadList()
  toDoForm.addEventListener('submit',toDoFormSubmit);
}

init()
