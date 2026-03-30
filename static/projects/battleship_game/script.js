document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    const cells = [];
    let battleships = new Set();
    let clickCount = 0;
    let foundShips = 0;

    const images = {
        battleship: 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png',
        water: 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp'
    };

    function saveGameState() {
        const cellStates = cells.map(cell => cell.innerHTML);
        localStorage.setItem('battleships', JSON.stringify(Array.from(battleships)));
        localStorage.setItem('clickCount', clickCount);
        localStorage.setItem('foundShips', foundShips);
        localStorage.setItem('cellStates', JSON.stringify(cellStates));
        localStorage.setItem('message', message.textContent);
    }

    function loadGameState() {
        if (localStorage.getItem('battleships')) {
            battleships = new Set(JSON.parse(localStorage.getItem('battleships')));
            clickCount = parseInt(localStorage.getItem('clickCount'), 10);
            foundShips = parseInt(localStorage.getItem('foundShips'), 10);
            const cellStates = JSON.parse(localStorage.getItem('cellStates'));
            message.textContent = localStorage.getItem('message');

            cellStates.forEach((state, index) => {
                if (state !== '') {
                    cells[index].innerHTML = state;
                }
            });
        }
    }

    function initializeGame() {
        clickCount = 0;
        foundShips = 0;
        battleships.clear();
        message.textContent = '';
        grid.innerHTML = '';

        while (battleships.size < 5) {
            const randomIndex = Math.floor(Math.random() * 16);
            battleships.add(randomIndex);
        }

        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
            cells.push(cell);
        }

        saveGameState();
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index, 10);

        if (cell.innerHTML !== '' || message.textContent !== '') {
            return;
        }

        clickCount++;

        if (battleships.has(index)) {
            cell.innerHTML = `<img src="${images.battleship}" alt="Battleship">`;
            foundShips++;
        } else {
            cell.innerHTML = `<img src="${images.water}" alt="Water">`;
        }

        saveGameState();

        if (foundShips === 5) {
            message.textContent = 'You win!';
            endGame();
        } else if (clickCount === 8) {
            message.textContent = 'You lose!';
            endGame();
        }
    }

    function endGame() {
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    resetButton.addEventListener('click', () => {
        localStorage.clear();
        initializeGame();
    });

    // Initialize game from saved state if available
    initializeGame();
    loadGameState();
});