// Grid size
const gridSize = 7;

// Define shelves (obstacles)
let shelves = [
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 5 }
];

// Multiple robots
let robots = [
  { x: 0, y: 0, taskIndex: null },
  { x: 6, y: 6, taskIndex: null }
];

// Tasks
let tasks = [];

// Get grid container
const gridContainer = document.getElementById('simulation');
gridContainer.style.display = 'inline-block';
gridContainer.style.border = '2px solid #333';

// Draw grid function
function drawGrid() {
  gridContainer.innerHTML = '';

  for (let y = 0; y < gridSize; y++) {
    const row = document.createElement('div');
    row.style.display = 'flex';

    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.style.width = '40px';
      cell.style.height = '40px';
      cell.style.border = '1px solid #ccc';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';

      // Check shelves
      if (shelves.some(s => s.x === x && s.y === y)) {
        cell.style.backgroundColor = 'gray';
        cell.textContent = 'S';
      } 
      // Check robots
      else {
        const robotIndex = robots.findIndex(r => r.x === x && r.y === y);
        if (robotIndex !== -1) {
          cell.style.backgroundColor = robotIndex === 0 ? 'orange' : 'red';
          cell.textContent = 'R' + robotIndex;
        }
        // Check tasks
        else if (tasks.some(t => !t.completed && t.x === x && t.y === y)) {
          cell.style.backgroundColor = 'lightblue';
          cell.textContent = 'T';
        } else {
          cell.style.backgroundColor = 'white';
        }
      }

      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }

  // Show task count above grid
  let info = document.getElementById('info');
  if (!info) {
    info = document.createElement('div');
    info.id = 'info';
    gridContainer.parentNode.insertBefore(info, gridContainer);
  }
  info.innerText = `Tasks remaining: ${tasks.filter(t => !t.completed).length}`;
}

// Spawn random task
function spawnTask() {
  let x, y;
  do {
    x = Math.floor(Math.random() * gridSize);
    y = Math.floor(Math.random() * gridSize);
  } while (shelves.some(s => s.x === x && s.y === y));

  tasks.push({ x, y, completed: false });
}

// Assign tasks to robots
function assignTasks() {
  robots.forEach(robot => {
    if (robot.taskIndex !== null) return;

    const availableTaskIndex = tasks.findIndex(t => !t.completed);
    if (availableTaskIndex !== -1) robot.taskIndex = availableTaskIndex;
  });
}

// Check if a position is occupied by a robot
function isOccupied(x, y) {
  return robots.some(r => r.x === x && r.y === y);
}

// Move robots toward their task
function moveRobots() {
  robots.forEach(robot => {
    if (robot.taskIndex === null) return;

    const task = tasks[robot.taskIndex];
    if (!task || task.completed) {
      robot.taskIndex = null;
      return;
    }

    let nextX = robot.x;
    let nextY = robot.y;

    if (robot.x < task.x) nextX++;
    else if (robot.x > task.x) nextX--;
    else if (robot.y < task.y) nextY++;
    else if (robot.y > task.y) nextY--;

    // Check collision with other robots and shelves
    if (!isOccupied(nextX, nextY) && !shelves.some(s => s.x === nextX && s.y === nextY)) {
      robot.x = nextX;
      robot.y = nextY;
    }

    // Complete task if reached
    if (robot.x === task.x && robot.y === task.y) {
      task.completed = true;
      robot.taskIndex = null;
    }
  });
}

// Simulation loop
function updateSimulation() {
  assignTasks();
  moveRobots();
  drawGrid();
}

// Start simulation
setInterval(updateSimulation, 500);
setInterval(spawnTask, 4000); // new task every 4 seconds

// Initial draw
drawGrid();
