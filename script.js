 // Get elements from the DOM(Document Object Model)
 const taskInput = document.getElementById("taskInput");
 const detailsInput = document.getElementById("detailsInput");
 const dueDateInput = document.getElementById("dueDateInput");
 const addBtn = document.getElementById("addBtn");
 const statusFilter = document.getElementById("statusFilter");
 const sortOption = document.getElementById("sortOption");
 const taskList = document.getElementById("taskList");

 // Array to store tasks
 let tasks = [];

 // Add event listeners
 addBtn.addEventListener("click", addTask);
 statusFilter.addEventListener("change", filterTasks);
 sortOption.addEventListener("change", sortTasks);

 // Function to add a new task
 function addTask() {
   const taskText = taskInput.value.trim();
   const taskDetails = detailsInput.value.trim();
   const dueDate = dueDateInput.value;

   if (taskText !== "") {
     const newTask = {
       id: Date.now(),
       text: taskText,
       details: taskDetails,
       dueDate: dueDate,
       completed: false,
     };
     tasks.push(newTask);
     renderTasks();
     taskInput.value = "";
     detailsInput.value = "";
     dueDateInput.value = "";
   }
 }

 // Function to render tasks
 function renderTasks() {
   taskList.innerHTML = "";
   const filteredTasks = filterTasksByStatus(tasks, statusFilter.value);
   const sortedTasks = sortTasksByOption(filteredTasks, sortOption.value);
   sortedTasks.forEach((task) => {
     const taskItem = createTaskElement(task);
     taskList.appendChild(taskItem);
   });
 }

 // Function to create a new task element
 function createTaskElement(task) {
   const li = document.createElement("li");
   const checkbox = document.createElement("input");
   const span = document.createElement("span");
   const detailsSpan = document.createElement("span");
   const dueDateSpan = document.createElement("span");
   const deleteBtn = document.createElement("button");

   checkbox.type = "checkbox";
   checkbox.checked = task.completed;
   checkbox.addEventListener("change", () => toggleTask(task.id));

   span.textContent = task.text;
   detailsSpan.textContent = task.details ? `Details: ${task.details}` : "";
   dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : "";

   deleteBtn.textContent = "Delete";
   deleteBtn.className = "delete-btn";
   deleteBtn.addEventListener("click", () => deleteTask(task.id));

   li.appendChild(checkbox);
   li.appendChild(span);
   li.appendChild(detailsSpan);
   li.appendChild(dueDateSpan);
   li.appendChild(deleteBtn);

   if (task.completed) {
     li.classList.add("completed");
   }

   return li;
 }

 // Function to toggle task completion
 function toggleTask(taskId) {
   tasks = tasks.map((task) => {
     if (task.id === taskId) {
       return { ...task, completed: !task.completed };
     }
     return task;
   });
   renderTasks();
 }

 // Function to delete a task
 function deleteTask(taskId) {
   tasks = tasks.filter((task) => task.id !== taskId);
   renderTasks();
 }

 // Function to filter tasks by status
 function filterTasksByStatus(tasks, status) {
   if (status === "completed") {
     return tasks.filter((task) => task.completed);
   } else if (status === "incomplete") {
     return tasks.filter((task) => !task.completed);
   }
   return tasks;
 }

 // Function to sort tasks by option
 function sortTasksByOption(tasks, option) {
   if (option === "dueDate") {
     return tasks.sort((a, b) => {
       const aDueDate = new Date(a.dueDate);
       const bDueDate = new Date(b.dueDate);
       return aDueDate - bDueDate;
     });
   }
   return tasks;
 }

 // Event handler for filtering tasks
 function filterTasks() {
   renderTasks();
 }

 // Event handler for sorting tasks
 function sortTasks() {
   renderTasks();
 }

 // Render initial tasks
 renderTasks();