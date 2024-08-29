document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const taskHistoryContainer = document.createElement('div');
    const taskHistoryList = document.createElement('ul');

    taskHistoryContainer.classList.add('task-history');
    taskHistoryContainer.innerHTML = '<h2>Task History</h2>';
    taskHistoryContainer.appendChild(taskHistoryList);
    document.querySelector('.container').appendChild(taskHistoryContainer);

    addBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <div>
                    <button class="completeBtn">Complete</button>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </div>
                <div class="order-buttons">
                    <button class="upBtn">▲</button>
                    <button class="downBtn">▼</button>
                </div>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
        }
    }

    function handleTaskActions(e) {
        const li = e.target.parentElement.parentElement;

        if (e.target.classList.contains('completeBtn')) {
            li.classList.toggle('complete');
            moveTaskToHistory(li);
        } else if (e.target.classList.contains('editBtn')) {
            const span = li.querySelector('span');
            const newText = prompt('Edit your task:', span.textContent);
            if (newText !== null) {
                span.textContent = newText;
            }
        } else if (e.target.classList.contains('deleteBtn')) {
            taskList.removeChild(li);
        } else if (e.target.classList.contains('upBtn')) {
            if (li.previousElementSibling) {
                taskList.insertBefore(li, li.previousElementSibling);
            }
        } else if (e.target.classList.contains('downBtn')) {
            if (li.nextElementSibling) {
                taskList.insertBefore(li.nextElementSibling, li);
            }
        }
    }

    function moveTaskToHistory(taskItem) {
        if (taskItem.classList.contains('complete')) {
            taskHistoryList.appendChild(taskItem.cloneNode(true));
            taskList.removeChild(taskItem);
        }
    }
});
