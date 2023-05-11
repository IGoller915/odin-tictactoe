//factory for player creation
const player = (token) => {

    const getToken = token 

    return {getToken}
}

//module defining gameboard layout and behavior?
const gameBoard = (() => {
    const player1 = player('x');
    const player2 = player('o');
    let xScore = 0;
    let oScore = 0;
    let round = 1;

    //board tiles from top left to bottom right
    let board = Array(9);
    
    let currentPlayer = player1

    document.querySelector('.current-player').textContent = currentPlayer.getToken.toUpperCase()
    document.querySelector('.x-points').textContent = xScore
    document.querySelector('.o-points').textContent = oScore


    const changePlayer = () => {
        gameBoard.currentPlayer = gameBoard.currentPlayer === player1 ? player2 : player1
        document.querySelector('.current-player').textContent = gameBoard.currentPlayer.getToken.toUpperCase()
    }

    const selectTile = (tile) => {
        if (gameBoard.board[tile - 1] === undefined) {
            gameBoard.board[tile - 1] = gameBoard.currentPlayer.getToken
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
            if (gameBoard.board[a] && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[b] === gameBoard.board[c]) {
                const winner = gameBoard.board[a]
                endGame(winner)
                winner == 'x' ? xScore++ : oScore++  
                document.querySelector('.x-points').textContent = xScore
                document.querySelector('.o-points').textContent = oScore
                return
            }
        }

        if (!gameBoard.board.includes(undefined)) {
            const winner = 'tie'
            endGame(winner)  
            return
        } 
    }

    const endGame = (winner) => {
        //display win message and new game button
        const winMessage = document.querySelector('.win-message')

        if (winner !== 'tie') {
            winMessage.firstChild.data = `${winner.toUpperCase()} Wins!`  //.firstChild is the text of the div, .textContent was overwriting the inner div
        } else {
            winMessage.firstChild.data = 'Tie'
        }

        winMessage.style.visibility = 'visible'

        //stop player inputs
        displayController.stopTokenAdd()

    }

    const resetBoard = () => {
        gameBoard.board = Array(9)
        displayController.clearTiles()
        displayController.enableTokenAdd()
        
        document.querySelector('.win-message').style.visibility = 'hidden'

        round++
        gameBoard.currentPlayer = round % 2 === 0 ? player2 : player1
        document.querySelector('.current-player').textContent = gameBoard.currentPlayer.getToken.toUpperCase()
        
    }

    const displayBoard = () => {
        console.log(gameBoard.board)
    }
    

    return {selectTile, currentPlayer, changePlayer, board, winCheck, resetBoard, displayBoard}
})()



//module for display/gameplay handling
const displayController = (() => {
    
    const addToken = (e) => {
        let tileObject = e.target
        let tileNumber = tileObject.getAttribute('data-index')
        gameBoard.selectTile(tileNumber)
        tileObject.textContent = gameBoard.board[tileNumber - 1].toUpperCase()
        gameBoard.winCheck()
    }

    let tiles = document.querySelectorAll(".board-tile")
    tiles.forEach(tile => tile.addEventListener('click', addToken))

    const enableTokenAdd = () => {
        tiles.forEach(tile => tile.addEventListener('click', addToken))
    }

    const stopTokenAdd = () => {
        tiles.forEach(tile => tile.removeEventListener('click', addToken))
    }

    const clearTiles = () => {
        tiles.forEach(tile => tile.textContent='')
    }

    const newGameButton = document.querySelector('.new-game-button')
    newGameButton.addEventListener('click', gameBoard.resetBoard)

    return {tiles, addToken, enableTokenAdd, stopTokenAdd, clearTiles}
})()


