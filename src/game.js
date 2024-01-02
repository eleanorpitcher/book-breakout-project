
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {
    constructor(){
        this.gameIntro = document.getElementById("game-intro");
        this.gameContainer = document.getElementById("game-container");
        this.loserDisplay = document.getElementById("loser");
        this.winnerDisplay = document.getElementById("winner")
        
        this.player = new Player(
            this.gameContainer,
            "images/student-6.png",
        );

        this.obstacles = []
        this.books = []
        this.scoreCount = 0
        this.scoreElement = document.getElementById('game-score')
        console.log(this.scoreElement)

        this.gameIsOver = false;
    }

    start(){
        this.gameIntro.style.display = "none";
        this.gameContainer.style.display = "block";
        // console.log(this.gameContainer.getBoundingClientRect())

        this.createObstacles();
        this.moveObstacles()
        this.createBooks()
        this.booksScore()
        // insideBoard()
        insideBoard()
    }

    createObstacles(){
        let obstacleCount = 0;
        setInterval(() => {
            if (obstacleCount < 3) {
                const obstacle = new Obstacle (
                    this.gameContainer,
                    "images/librarian-3.webp",
                );
                this.obstacles.push(obstacle)
                obstacleCount++
            } else {
                clearInterval(setInterval)
            }
        })
    }

    moveObstacles(){
        this.moveInterval = setInterval(() => {
            this.obstacles.forEach((obstacle) => {
                obstacle.moveRandomly()
                this.detectCollision(obstacle.obstacle)
            })
        }, 500)
    }

    createBooks(){
        let bookCount = 0
        setInterval(() => {
            if(bookCount < 10){
                const book = new Book (
                    this.gameContainer,
                    "images/book.png",
                )
                this.books.push(book)
                bookCount++
            } else {
                clearInterval(setInterval)
            }
        })
    }

    booksScore(){
        setInterval(() =>{
            this.books.forEach((oneBook) =>{
                this.collectPoints(oneBook.book)
            })
            if (this.scoreCount == 10){
                this.gameContainer.style.display = 'none'
                this.winnerDisplay.style.display = 'block'
            }
        }, 250)
    }

    collectPoints(book){
        const playerRect = player.getBoundingClientRect()
        const bookRect = book.getBoundingClientRect()

        if (
            playerRect.left < bookRect.right &&
            playerRect.right > bookRect.left &&
            playerRect.top < bookRect.bottom &&
            playerRect.bottom > bookRect.top
        ) {
            this.scoreCount++
            console.log(this.scoreCount)
            this.updateCounter()
            book.style.display = 'none';
        }
    }

    updateCounter(){
        this.scoreElement.innerText = this.scoreCount
    }

    detectCollision(obstacle){
        const playerRect = player.getBoundingClientRect()
        const obstacleRect = obstacle.getBoundingClientRect()

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            this.gameContainer.style.display = "none"
            this.loserDisplay.style.display = "block";
        }
    }
}

class Player {
    constructor(gameContainer, imgSrc){
        this.gameContainer = gameContainer; //with this we can appendChild and put the player inside of the gameContainer div
        this.imgSrc = imgSrc;
        this.width = 5;
        this.height = 20;
        this.positionX = 50 ;
        this.positionY = 50 ;

        this.player = this.createPlayer()
    }

    createPlayer() {
        const player = document.createElement('img');
        player.id = 'player'
        player.src = this.imgSrc;

        player.style.position = "absolute"
        player.style.width = `${this.width}vw`;
        player.style.height = `${this.height}vh`;
        player.style.left = `${this.positionX}vw`;
        player.style.top = `${this.positionY}vh`;

        this.gameContainer.appendChild(player)
        return player
    }

    moveRight(){
        this.positionX +=4
        this.player.style.left = `${this.positionX}vw`
    }

    moveLeft(){ 
        this.positionX -=4
        this.player.style.left = `${this.positionX}vw`
    }

    moveUp(){
        this.positionY -=4
        this.player.style.top = `${this.positionY}vh`
    }

    moveDown(){
        this.positionY +=4
        this.player.style.top = `${this.positionY}vh`
    }

    insideBoard(){
        let boardWidth = canvas.width
        let boardHeight = canvas.height
        

        if(this.positionX < 0) {
            this.positionX = 0;
            console.log('1',boardWidth)
        } else if (this.positionX > boardWidth){
            this.positionX = boardWidth;
            console.log('2',boardWidth)
        
        if(this.positionY < 0) {
            this.positionY = 0;
        } else if (this.positionY > boardHeight) {
            this.positionY = boardHeight
        }
        }
    }
}

class Obstacle {
    constructor(gameContainer, imgSrc){
        this.gameContainer = gameContainer;
        this.imgSrc = imgSrc;
        this.width = 10
        this.height = 15;
        this.positionX = 20;
        this.positionY = 20;

        this.obstacle = this.designObstacle()
    }

    designObstacle() {
        const obstacle = document.createElement('img');
        obstacle.id = 'obstacle'
        obstacle.src = this.imgSrc;

        obstacle.style.position = "absolute"
        obstacle.style.width = `${this.width}vw`;
        obstacle.style.height = `${this.height}vh`;
        obstacle.style.left = `${this.positionX}vw`;
        obstacle.style.top = `${this.positionY}vh`;

        this.gameContainer.appendChild(obstacle)
        return obstacle
    }


    moveRandomly(){
        let randomDirection = Math.floor(Math.random() * 4)

        if (randomDirection >= 0 && randomDirection <= 1){
            this.positionY -= 5
            this.positionX += 5
        } else if (randomDirection >= 1 && randomDirection <= 2){
            this.positionY += 5
            this.positionX += 5
        } else if (randomDirection >= 2 && randomDirection <= 3){
            this.positionY -= 5
            this.positionX -= 5
        } else if (randomDirection >= 3 && randomDirection <= 4){
            this.positionY += 5
            this.positionX -= 5
        }

        this.obstacle.style.left = `${this.positionX}vw`
        this.obstacle.style.top = `${this.positionY}vh`
    }
}


class Book {
    constructor(gameContainer, imgSrc){
        this.gameContainer = gameContainer
        this.imgSrc = imgSrc
        this.width = 3
        this.height = 5
        // this.positionX = Math.floor(Math.random() * (100 - this.width +1));
        this.positionX = Math.floor(Math.random()* (100 - this.width +1))
        // this.positionY = Math.floor(Math.random() * (100 - this.height +1));
        this.positionY = Math.floor(Math.random()* (100 - this.height +1))

        this.book = this.designBooks()
    }

    designBooks(){
        const book = document.createElement('img')
        book.id = 'book'
        book.src = this.imgSrc

        book.style.position = "absolute"
        book.style.width = `${this.width}vw`;
        book.style.height = `${this.height}vh`;
        book.style.left = `${this.positionX}vw`;
        book.style.top = `${this.positionY}vh`;

        this.gameContainer.appendChild(book)
        return book 
    }
}