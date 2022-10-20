const game = {
    xTurn : true,
    xState : [],
    oState : [],
    winningStates: [
        // Rows
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columns
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

document.addEventListener('click', (e) => {
    const target = e.target;
    const isCell = e.target.classList.contains('cell');
    const isDisabled = e.target.classList.contains('disabled');

    if (isCell && !isDisabled){
        game.xTurn? target.classList.add('x'): target.classList.add('o');
        game.xTurn ? game.xState.push(target.dataset.value): game.oState.push(target.dataset.value);
        target.classList.add('disabled');
        game.xTurn = !game.xTurn;
    }

    if (!document.querySelectorAll('.cell:not(.disabled)').length) {
        document.querySelector('.game-over').classList.add('visible');
        document.querySelector('.game-over-text').textContent = 'Draw!';
    }

    // Loop through each winning state. Check whether the xState and oState includes each 
    // of the elements in a winning state

    game.winningStates.forEach(winningState => {
        const xWins = winningState.every(state => game.xState.includes(state));
        const oWins = winningState.every(state => game.oState.includes(state));

        if (xWins || oWins){
            document.querySelectorAll('.cell').forEach(cell => cell.classList.add('.disabled'));
            document.querySelector('.game-over').classList.add('visible');
            document.querySelector('.board').style.display = 'none';
            document.querySelector('.game-over-text').textContent = xWins ? 'X Wins!': 'O Wins';
        }
    })
})

document.querySelector('.restart').addEventListener('click', ()=> {
    document.querySelector('.game-over').classList.remove('visible');
    document.querySelector('.board').style.display = 'grid';
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('disabled', 'o', 'x'));
    game.xState = [];
    game.oState = [];
    game.xTurn = true;
})

