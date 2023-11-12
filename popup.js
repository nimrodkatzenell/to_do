

document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');
  
  // Load stored todos on extension popup open
  chrome.storage.sync.get(['todos'], function(result) {
    if (result.todos) {
      result.todos.forEach(todo => addTodoToList(todo));
    }
  });

 
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
           let myToDo = new ToDo(inputField.value);//CHANGE TO THE OBJECT WHEN AVAILABLE
           let todoText = inputField.value;//
           let myDiv = document.getElementById('myDiv');//
           myDiv.setAttribute('title', myToDo.time);
      if (todoText) {
        addTodoToList(todoText);
        saveTodo(todoText);
        inputField.value = '';
      }
    }
  });

  
  
  function addTodoToList(todoText) {
     
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    
    if (todoText.toLowerCase().includes('mail')) {
      const mailLink = document.createElement('a');
      mailLink.href = 'https://mail.google.com/';
      mailLink.target = '_blank';
      mailLink.textContent = todoText;
      listItem.appendChild(checkbox);
      listItem.appendChild(mailLink);
    }
     else if (todoText.toLowerCase().includes('whatsapp')) {
        const whatsapp = document.createElement('a');
        whatsapp.href = 'https://web.whatsapp.com/';
        whatsapp.target = '_blank';
        whatsapp.textContent = todoText;
        listItem.appendChild(checkbox);
        listItem.appendChild(whatsapp);

    } 
    else {
      checkbox.addEventListener('change', function() {
          if (checkbox.checked) {
            todoList.removeChild(listItem);
            deleteTodo(todoText);
          }
        });
      const textNode = document.createTextNode(todoText);

      listItem.appendChild(checkbox);
      listItem.appendChild(textNode);
    }
    
    
    todoList.appendChild(listItem);
  
  
  
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        todoList.removeChild(listItem);
        deleteTodo(todoText);
      }
    });
  }



  function saveTodo(todo) {
    chrome.storage.sync.get(['todos'], function(result) {
      const todos = result.todos || [];
      todos.push(todo);
      chrome.storage.sync.set({ 'todos': todos });
    });
  }




  function deleteTodo(todo) {
    chrome.storage.sync.get(['todos'], function(result) {
      const todos = result.todos || [];
      const updatedTodos = todos.filter(item => item !== todo);
      chrome.storage.sync.set({ 'todos': updatedTodos });
    });
  }
});




 
function time(){
  let d = new Date();
  let now = d.getTime();
  let date = new Date(now);
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // Month starts from 0, so adding 1 to match the human-readable format
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const formattedDateTime = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}-${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedDateTime;
}
class ToDo {
  constructor(todoTxt) {
    this._todoTxt = todoTxt;
    this._time = time();
  }

  // Getters and setters
  get todoTxt() {
    return this._todoTxt;
  }

  set todoTxt(newTodoTxt) {
    this._todoTxt = newTodoTxt;
  }

  get time() {
    return this._time;
  }

  set time(newTime) {
    this._time = newTime;
  }
}




