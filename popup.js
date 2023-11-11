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
             const todoText = inputField.value;
          
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
      } else {
        const textNode = document.createTextNode(todoText);
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
              todoList.removeChild(listItem);
              deleteTodo(todoText);
            }
          });
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
  