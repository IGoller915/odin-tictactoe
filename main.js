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
    

    return {selectTile, displayBoard}
})()



//module for display/gameplay handling
const displayController = (() => {
    

    let tiles = document.querySelectorAll(".board-tile")
    

    const addToken = () => {return}

    // tiles.forEach(addEventListener('click', addToken))


})()


