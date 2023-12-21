window.onload = function () {
    const startButton = document.getElementById("start-button")
    let game

    startButton.addEventListener('click', function() {
        startGame()
    });

    function startGame() {
        console.log("start game")

        game = new Game()
        game.start()
    }

    window.addEventListener('keydown',(event) => {
        if (event.key === "ArrowUp"){
            game.player.directionY = -1;
        }
        else if(event.key === "ArrowDown"){
            game.player.directionY = +1;
        }
        else if(event.key === "ArrowLeft"){
            game.player.directionX = -1;
        }
        else if (event.key === "ArrowRight"){
            game.player.directionX = +1
        }
    })
}



