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
                const winner = board[a]
                endGame(winner)
            }
        }
    }

    const endGame = (winner) => {
        //display win message and new game button
        const winMessage = document.querySelector('.win-message')
        winMessage.firstChild.data = `${winner.toUpperCase()} Wins!` //.firstChild is the text of the div, .textContent was overwriting the inner div
        winMessage.style.visibility = 'visible'

        //stop player inputs
        displayController.stopTokenAdd(displayController.tiles)

    }

    const resetBoard = () => {
        gameBoard.board = Array(9)
        const tiles = document.querySelectorAll('.board-tile')
        tiles.forEach(tile => tile.textContent = '')
        tiles.forEach(tile => tile.addEventListener('click', displayController.addToken))
        document.querySelector('.win-message').style.visibility='hidden'
        gameBoard.currentPlayer = player1
    }

    const displayBoard = () => {
        console.log(board)
    }
    

    return {selectTile, currentPlayer, changePlayer, board, winCheck, resetBoard, displayBoard}
})()



//module for display/gameplay handling
const displayController = (() => {
    

    
    

    const addToken = (e) => {
        let tileObject = e.target
        let tileNumber = tileObject.getAttribute('data-index')
        gameBoard.selectTile(tileNumber)
        tileObject.textContent = gameBoard.board[tileNumber - 1]
        gameBoard.winCheck()
    }

    let tiles = document.querySelectorAll(".board-tile")
    tiles.forEach(tile => tile.addEventListener('click', addToken))

    const stopTokenAdd = (tiles) => {
        tiles.forEach(tile => tile.removeEventListener('click', addToken))
    }

    

    const newGameButton = document.querySelector('.new-game-button')
    newGameButton.addEventListener('click', gameBoard.resetBoard)

    return {tiles, addToken, stopTokenAdd}
})()


