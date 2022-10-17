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
})