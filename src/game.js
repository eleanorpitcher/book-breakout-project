class Game {
    constructor(){
        this.gameIntro = document.getElementById("game-intro");
        this.gameContainer = document.getElementById("game-container");
        this.loserDisplay = document.getElementById("loser");
        this.winnerDisplay = document.getElementById("winner")
        
        this.player = new Player(
            this.gameContainer,
            "images/student-6.png",
            // 100,
            // 300,
            // 150,
            // 150,
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
    }

    createObstacles(){
        let obstacleCount = 0;
        setInterval(() => {
            if (obstacleCount < 3) {
                const obstacle = new Obstacle (
                    this.gameContainer,
                    "images/librarian-3.webp",
                    // 100,
                    // 300,
                    // 100,
                    // 100,
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
        this.positionX = 50;
        this.positionY = 50;

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
        let randomDirection = Math.floor(Math.random() * (360))

        if (randomDirection >= 0 && randomDirection <= 90){
            this.positionY -= 5
            this.positionX += 5
        } else if (randomDirection >= 91 && randomDirection <= 180){
            this.positionY += 2
            this.positionX += 2
        } else if (randomDirection >= 181 && randomDirection <= 270){
            this.positionY -= 2
            this.positionX -= 2
        } else if (randomDirection >= 271 && randomDirection <= 360){
            this.positionY += 2
            this.positionX -= 2
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
        this.positionX = Math.floor(Math.random() * (100 - this.width +1));
        this.positionY = Math.floor(Math.random() * (100 - this.height +1));

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






