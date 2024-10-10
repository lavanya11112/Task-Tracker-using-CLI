const yargs = require('yargs');
const fs = require('fs');

const tasksFile = 'tasks.json';

// Load tasks from JSON file
function loadTasks() {
  try {
    const dataBuffer = fs.readFileSync(tasksFile);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

// Save tasks to JSON file
function saveTasks(tasks) {
  const dataJSON = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(tasksFile, dataJSON);
}

// Add Task
function addTask(description) {
  const tasks = loadTasks();
  const now = new Date().toISOString();
  tasks.push({
    id: tasks.length + 1,
    description,
    status: 'todo',
    createdAt: now,
    updatedAt: now
  });
  saveTasks(tasks);
  console.log('Task added successfully.');
}

// Update Task
function updateTask(id, description) {
  const tasks = loadTasks();
  const task = tasks.find(task => task.id == id);
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log('Task updated successfully.');
  } else {
    console.log('Task not found.');
  }
}

// Delete Task
function deleteTask(id) {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id != id);
  if (updatedTasks.length < tasks.length) {
    saveTasks(updatedTasks);
    console.log('Task deleted.');
  } else {
    console.log('Task not found.');
  }
}

// Mark Task Status
function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find(task => task.id == id);
  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as ${status}.`);
  } else {
    console.log('Task not found.');
  }
}

// List Tasks
function listTasks(filter = null) {
  const tasks = loadTasks();
  const filteredTasks = filter ? tasks.filter(task => task.status === filter) : tasks;
  console.log(filteredTasks);
}

// Command Definitions
yargs.command({
  command: 'add',
  describe: 'Add a new task',
  builder: {
    description: {
      describe: 'Task description',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    addTask(argv.description);
  }
});

yargs.command({
  command: 'update',
  describe: 'Update an existing task',
  builder: {
    id: { describe: 'Task ID', demandOption: true, type: 'number' },
    description: { describe: 'New task description', demandOption: true, type: 'string' }
  },
  handler(argv) {
    updateTask(argv.id, argv.description);
  }
});

yargs.command({
  command: 'delete',
  describe: 'Delete a task',
  builder: {
    id: { describe: 'Task ID', demandOption: true, type: 'number' }
  },
  handler(argv) {
    deleteTask(argv.id);
  }
});

yargs.command({
  command: 'mark',
  describe: 'Mark a task as in-progress or done',
  builder: {
    id: { describe: 'Task ID', demandOption: true, type: 'number' },
    status: { describe: 'Task status', demandOption: true, choices: ['in-progress', 'done'] }
  },
  handler(argv) {
    markTask(argv.id, argv.status);
  }
});

yargs.command({
  command: 'list',
  describe: 'List all tasks or filtered by status',
  builder: {
    status: { describe: 'Task status to filter by', type: 'string', choices: ['todo', 'in-progress', 'done'] }
  },
  handler(argv) {
    listTasks(argv.status);
  }
});

yargs.parse();
