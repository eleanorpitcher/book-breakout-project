window.onload = function () {
    const startButton = document.getElementById("start-button")
    let game

    startButton.addEventListener('click', function() {
        startGame()
    });

    function startGame() {
        // console.log("start game")

        game = new Game()
        game.start()
    }

    window.addEventListener('keydown',(event) => {
        if (event.key === "ArrowUp"){
            // console.log('move up')
            game.player.moveUp()
        }
        else if(event.key === "ArrowDown"){
            // console.log('move down')
            game.player.moveDown()
        }
        else if(event.key === "ArrowLeft"){
            // console.log('move left')
            game.player.moveLeft()
        }
        else if (event.key === "ArrowRight"){
            // console.log('move right')
            game.player.moveRight()
        }
    })
}

let newGame

const reStartButtonWin = document.getElementById('restart-btn-win')
reStartButtonWin.addEventListener('click', ()=> {
    restartGame()
})

const reStartButtonLose = document.getElementById('restart-btn-lose')
reStartButtonLose.addEventListener('click', ()=> {
    restartGame()
})

function restartGame(){
    console.log('restart game')

    let newGame = new Game()
    window.location.reload()
    newGame.start()
}






