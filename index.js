const tasks = [];
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item${task.completed ? ' completed' : ''}`;

  li.innerHTML = `
    <div class="task-info">
      <h3>${task.name}</h3>
      <div class="task-meta">
        <span class="tag">${task.tag}</span>
        <span>Criado em: ${task.date}</span>
      </div>
    </div>
    <button>${task.completed ? '✓' : 'Concluir'}</button>
  `;

  li.querySelector('button').onclick = () => {
    task.completed = !task.completed;
    updateTasksUI();
  };

  return li;
}

function updateTasksUI() {
  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(createTaskElement(task)));
  const completedCount = tasks.filter(t => t.completed).length;
  taskCount.textContent = `${completedCount} tarefa${completedCount !== 1 ? 's' : ''} concluída${completedCount !== 1 ? 's' : ''}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('task-name').value;
  const tag = document.getElementById('task-tag').value;
  const date = new Date().toLocaleDateString('pt-BR');

  const newTask = {
    id: Date.now(),
    name,
    tag,
    date,
    completed: false
  };

  tasks.push(newTask);
  updateTasksUI();

  form.reset();
});