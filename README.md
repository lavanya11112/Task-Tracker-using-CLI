# Task-Tracker-using-CLI
A simple command-line interface (CLI) application for managing tasks. This Task Tracker allows users to add, update, delete, and list tasks with statuses like "todo," "in-progress," or "done," all stored in a JSON file.The application is built using Node.js with asynchronous file handling and command-line argument parsing through Yargs.

Features:

Add tasks: Create new tasks with a description and automatically set their status to "todo."

Update tasks: Modify existing task descriptions or change their status (todo, in-progress, done).

Delete tasks: Remove tasks from the list.

List tasks: View all tasks or filter them by status (e.g., list only completed tasks).

Persistent storage: Tasks are saved in a tasks.json file, allowing data to persist across sessions.


Technologies Used:

Node.js: Handles file I/O operations and asynchronous programming.

Yargs: A powerful library for building command-line tools with argument parsing.

JSON: Tasks are stored in a structured, human-readable format.


Getting Started:

Clone the repository:

git clone https://github.com/your-username/task-tracker-cli.git

cd task-tracker-cli

Install dependencies:

bash

npm install

Run the CLI:

bash

node index.js add --description="Your task here"

Example Commands:

Add a task:

bash

node index.js add --description="Complete the report"

List all tasks:

bash

node index.js list

Mark a task as in-progress:

bash

node index.js update --id=1 --status="in-progress"

Delete a task:

bash

node index.js remove --id=1


![image](https://github.com/user-attachments/assets/74b1c0be-a516-4854-b4d5-339f73d6d3b0)
