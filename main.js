//factory for player creation
const player = (token) => {

    const getToken = () => token 

    return {getToken}
}

//module defining gameboard layout and behavior?
const gameBoard = (() => {
    const player1 = player('x')
    const player2 = player('o')

    //board tiles from top left to bottom right
    let board = Array(9)

    let currentPlayer = player1

    const changePlayer = () => {currentPlayer = currentPlayer === player1 ? player2 : player1}

    const selectTile = (tile) => {
        if (board[tile - 1] === undefined) {
            board[tile - 1] = currentPlayer.getToken()
            changePlayer()
        }
    }

    const displayBoard = () => console.log(board)

    const winConditions = [  [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6], // diagonal top-right to bottom-left
    ];

    const winCheck = () => {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i]
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                console.log(`${board[a]} wins`)
            }
        }
    }
    

    return {selectTile, displayBoard, currentPlayer, changePlayer, board, winCheck}
})()



//module for display/gameplay handling
const displayController = (() => {
    

    let tiles = document.querySelectorAll(".board-tile")
    

    const addToken = (e) => {
        let tileObject = e.target
        let tileNumber = tileObject.getAttribute('data-index')
        gameBoard.selectTile(tileNumber)
        tileObject.textContent = gameBoard.board[tileNumber - 1]
        gameBoard.winCheck()
    }

    tiles.forEach(tile => tile.addEventListener('click', addToken))


})()


