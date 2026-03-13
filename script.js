// Simple 5x5 grid simulator for Warehouse Robot Simulator

const gridSize = 5;

// Robot and task positions
const robots = [{ x: 1, y: 1 }];
const tasks = [{ x: 2, y: 2 }];

// Find the grid container
const gridContainer = document.getElementById('simulation');
gridContainer.style.display = 'inline-block';
gridContainer.style.border = '2px solid #333';

// Clear grid (in case of reload)
gridContainer.innerHTML = '';

// Create grid
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

    // Color robot
    if (robots.some(r => r.x === x && r.y === y)) {
      cell.style.backgroundColor = 'orange';
      cell.textContent = 'R';
    }
    // Color task
    else if (tasks.some(t => t.x === x && t.y === y)) {
      cell.style.backgroundColor = 'lightblue';
      cell.textContent = 'T';
    }
    else {
      cell.style.backgroundColor = 'white';
    }

    row.appendChild(cell);
  }
  gridContainer.appendChild(row);
}
