const todoForm = document.getElementById("form");
const todoInput = document.getElementById("input");
const todoList = document.getElementById("list");
const themeToggle = document.querySelector('#theme-toggle');
const htmlElement = document.documentElement;

// --- 1. DARK MODE LOGIKASI ---

// Sahifa yuklanganda saqlangan mavzuni tekshirish
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

// Tugma bosilganda o'zgartirish
themeToggle.addEventListener('change', (e) => {
    const theme = e.target.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// --- 2. TODO LOGIKASI ---

function addTodo(e) {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    if (inputValue === "") {
        alert("Iltimos, ma'lumot kiriting!");
        return;
    }

    const newLi = document.createElement("li");
    // Klasslarni "bg-black" o'rniga "bg-base-100" qildim (Dark mode-da avtomat o'zgarishi uchun)
    newLi.className = "p-4 rounded-xl bg-base-100 shadow-md flex items-center justify-between border border-base-300";

    newLi.innerHTML = `
        <div class="flex items-center gap-3">
            <input class="check checkbox checkbox-primary" type="checkbox"/>
            <span class="text-lg font-medium todo-text">${inputValue}</span>
        </div>
        <div class="flex gap-2">
            <button class="edit btn btn-sm btn-warning">Edit</button>
            <button class="delete btn btn-sm btn-error">Delete</button>
        </div>
    `;

    const checkbox = newLi.querySelector(".check");
    const todoText = newLi.querySelector(".todo-text");
    const deleteBtn = newLi.querySelector(".delete");
    const editBtn = newLi.querySelector(".edit");

    // O'chirish
    deleteBtn.addEventListener("click", () => newLi.remove());

    // Tahrirlash (Edit)
    editBtn.addEventListener("click", () => {
        const currentVal = todoText.innerText;
        const newVal = prompt("Vazifani tahrirlang:", currentVal);
        if (newVal !== null && newVal.trim() !== "") {
            todoText.innerText = newVal.trim();
        }
    });

    // Bajarilganini belgilash
    checkbox.addEventListener("change", () => {
        todoText.classList.toggle("line-through");
        todoText.classList.toggle("opacity-50");
    });

    todoList.append(newLi);
    todoInput.value = "";
}

todoForm.addEventListener("submit", addTodo);