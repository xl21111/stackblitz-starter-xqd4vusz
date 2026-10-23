// Початковий масив завдань
let tasks = [
  { id: 1, text: "Вивчити базові селектори DOM", completed: false, priority: "high" },
  { id: 2, text: "Зробити практичну роботу", completed: true, priority: "medium" },
  { id: 3, text: "Пройти тест", completed: false, priority: "low" }
];

// Отримуємо елементи з DOM
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select");
const totalCountEl = document.getElementById("total-count");
const completedCountEl = document.getElementById("completed-count");
const clearCompletedBtn = document.getElementById("clear-completed");

// Функція рендеру списку та оновлення лічильників
function renderTasks() {
  todoList.innerHTML = ""; // Очищуємо список перед рендером

  tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `todo-item priority-${task.priority}`;
      
      if (task.completed) {
          li.classList.add("completed");
      }
      li.dataset.id = task.id;

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = task.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "✕";

      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
  });

  updateCounters();
}

// Функція оновлення лічильників
function updateCounters() {
  totalCountEl.textContent = tasks.length;
  completedCountEl.textContent = tasks.filter(task => task.completed).length;
}

// Додавання нового завдання через форму
todoForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: prioritySelect.value
  };

  tasks.push(newTask);
  renderTasks();

  todoInput.value = ""; // Очищуємо поле введення
});

// Делегування подій для кліку по завданню (перемикання статусу) та видалення
todoList.addEventListener("click", function(e) {
  const li = e.target.closest(".todo-item");
  if (!li) return;

  const taskId = Number(li.dataset.id);

  // Видалення завдання при кліку на хрестик
  if (e.target.classList.contains("delete-btn")) {
      tasks = tasks.filter(task => task.id !== taskId);
      renderTasks();
      return;
  }

  // Перемикання статусу виконано/не виконано
  const task = tasks.find(task => task.id === taskId);
  if (task) {
      task.completed = !task.completed;
      renderTasks();
  }
});