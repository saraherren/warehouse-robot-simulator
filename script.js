// Grid size
const gridSize = 5;

// Multiple robots and tasks
let robots = [
  { x: 1, y: 1 },
  { x: 0, y: 4 }
];

let tasks = [
  { x: 3, y: 3 },
  { x: 4, y: 2 }
];

// Find grid container
const gridContainer = document.getElementById('simulation');
gridContainer.style.display = 'inline-block';
gridContainer.style.border = '2px solid #333';

// Function to draw the grid
function drawGrid() {
  gridContainer.innerHTML = ''; // clear previous grid

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

      // Check robots
      if (robots.some(r => r.x === x && r.y === y)) {
        cell.style.backgroundColor = 'orange';
        cell.textContent = 'R';
      }
      // Check tasks
      else if (tasks.some(t => t.x === x && t.y === y)) {
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

// Initial draw
drawGrid();
