class Game {
    constructor(){
        this.gameIntro = document.getElementById("game-intro");
        this.gameContainer = document.getElementById("game-container");
        this.gameEnd = document.getElementById("game-end");
        
        this.player = new Player(
            this.gameContainer,
            100,
            300,
            150,
            150,
            "images/student-2.jpeg"
        );

        this.obstacles = [];
        this.gameIsOver = false;
    }
    start(){
        this.gameIntro.style.display = "none";
        this.gameContainer.style.display = "block";
    }
}


class Player {
    constructor(gameContainer, left, top, width, height){
        this.gameContainer = gameContainer; //with this we can appendChild and put the player inside of the gameContainer div
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.positionX = 0;
        this.positionY = 0;

        this.element = document.createElement('img');
        this.element.style.position = "absolute"
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.gameContainer.appendChild(this.element)

    }

    moveRight(){
        this.left += this.directionX
        this.element.style.left = 

        //code here should make sure the player stays within the game board


        this.updatePosition()
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

}