const gridSize = 5;

// Single robot and task
let robot = { x: 1, y: 1 };
let task = { x: 2, y: 2 };

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
      cell.style.fontWeight = 'bold';

      if (robot.x === x && robot.y === y) {
        cell.style.backgroundColor = 'orange';
        cell.textContent = 'R';
      } else if (task.x === x && task.y === y) {
        cell.style.backgroundColor = 'lightblue';
        cell.textContent = 'T';
      } else {
        cell.style.backgroundColor = 'white';
      }

      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }
}

// Move robot one step toward task
function moveRobot() {
  if (robot.x < task.x) robot.x++;
  else if (robot.x > task.x) robot.x--;
  else if (robot.y < task.y) robot.y++;
  else if (robot.y > task.y) robot.y--;

  drawGrid();
}

// Initial grid
drawGrid();

// Move robot every 500ms until it reaches the task
const interval = setInterval(() => {
  if (robot.x === task.x && robot.y === task.y) {
    clearInterval(interval);
    alert('Task completed!');
  } else {
    moveRobot();
  }
}, 500);
