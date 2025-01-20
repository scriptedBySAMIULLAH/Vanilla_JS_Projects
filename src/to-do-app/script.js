let todo_input_Element = document.querySelector(".todo-input");
let clear_tasks_btn_Element = document.querySelector(".clear-tasks-btn");
let add_task_Element = document.querySelector(".add-task-btn");
let outer_wrapper_Element = document.querySelector(".outer-wrapper");
let total_Element = document.querySelector(".total");
let isCompleted_Element = document.querySelector(".isCompleted");
let remaining_Element = document.querySelector(".remainingElement");
let tasks_array = JSON.parse(localStorage.getItem("tasks") ?? "[]");

////handlers
const inputHandler = () => {
  let todo_value = todo_input_Element.value.trim();
  if (todo_value) {
    todo_input_Element.value = "";
    todo_input_Element.focus();
    putInLocalStorageHandler(todo_value);
  }
};
const putInLocalStorageHandler = (todo_value) => {
  let todo_container = {
    id: new Date().getTime(),
    name: todo_value,
    isCompleted: false,
    isEdited: false,
  };

  //store in local storage
  tasks_array.push(todo_container); //push for appending objects in array
  //id wr are not using any array for our tasks and try to put it in local storage directly then it replaces it every time as key in local stotage is same
  localStorage.setItem("tasks", JSON.stringify(tasks_array));
  reteriveLocalStorageTask(tasks_array);
};

const reteriveLocalStorageTask = (tasks_array) => {
  if (tasks_array) {
    outer_wrapper_Element.innerHTML = ""; //clr prev ones
    tasks_array.map((single_task) => {
      createTodo(single_task);
    });
  }
};

const createTodo = (single_task) => {
  let create_todo = document.createElement("div");
  create_todo.setAttribute("id", single_task["id"]);
  create_todo.className = `inner-wrapper flex items-center justify-between px-2  rounded-lg py-6 ${
    single_task["isCompleted"] ? "bg-sky-200" : "bg-white"
  }
                    
                    `;
  create_todo.innerHTML = `
                            <div class="flex items-center gap-1 relative">
                         
                            <input ${
                              single_task["isCompleted"] ? "checked" : ""
                            } type="checkbox" class="bb block checkboxElement appearance-none h-4 w-4 checked:bg-sky-300 checked:ring-gray-100 checked:ring-1 border border-gray-100 rounded-full ml-1 peer">
                           <p class="flex-grow peer-checked:line-through decoration-gray-400 decoration-4"
                        ${
                          !single_task["isCompleted"]
                            ? 'contenteditable="true" spellCheck="false"'
                            : ""
                        }
                            >
                        ${single_task["name"]}
                         </p>
                            
                            </div>
                        
                        <label class="button block transition transform hover:scale-[0.8]  " title="Delete task ${
                          single_task["name"]
                        }">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </label>
                    `;
  //append to outer-wrapprer
  outer_wrapper_Element.append(create_todo);
  count();
};

const deleteHandler = (e) => {
  if (e.target.closest(".button")) {
    let getItemId = e.target.closest(".inner-wrapper").id;
    tasks_array = tasks_array.filter((ele) => {
      return ele.id != getItemId;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks_array));
    document.getElementById(getItemId).remove();
  }
  countRemaining();
  count();
};

const checkTaskHandler = (e) => {
  if (e.target.classList.contains("checkboxElement")) {
    let checkedItemId = e.target.closest(".inner-wrapper").id;

    tasks_array = tasks_array.map((ele) => {
      if (ele.id == checkedItemId) {
        ele.isCompleted = ele.isCompleted ? false : true;
      }
      return ele;
    });
    // e.target.closest('.inner-wrapper')

    localStorage.setItem("tasks", JSON.stringify(tasks_array));
    reteriveLocalStorageTask(tasks_array);
    count();
  }
};

const editContentHandler = (e) => {
  let editContentId = e.target.closest(".inner-wrapper").id;
  let editContent = e.target.textContent.trim();

  if (e.key == "Enter") {
    e.preventDefault();
    let task = tasks_array.find((ele) => {
      return ele.id == editContentId;
    });
    task.name = editContent;
    task.isEdited = true;
    localStorage.setItem("tasks", JSON.stringify(tasks_array));
    reteriveLocalStorageTask(tasks_array);
    countRemaining();
  }
};

const count = () => {
  let total = tasks_array.length;
  total_Element.textContent = total;

  let completedTasks = tasks_array.filter((ele) => {
    return ele.isCompleted == true;
  });
};

const countRemaining = () => {
  let editedTask = tasks_array.filter((ele) => ele.isEdited == true);
  remaining_Element.textContent = editedTask.length;
};

const clearTaskHandler = (e) => {
  localStorage.clear();
  tasks_array = [];
  outer_wrapper_Element.innerHTML = "";
  countRemaining();

  count();
};
countRemaining();
count();

//listners
reteriveLocalStorageTask(tasks_array);
add_task_Element.addEventListener("click", inputHandler);
outer_wrapper_Element.addEventListener("keydown", editContentHandler);
outer_wrapper_Element.addEventListener("click", deleteHandler);
clear_tasks_btn_Element.addEventListener("click", clearTaskHandler);
outer_wrapper_Element.addEventListener("click", checkTaskHandler);
