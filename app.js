document.addEventListener('DOMContentLoaded',()=>{
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startButton = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //So first div in our grid
    let appleIndex = 0 //So first div in our grid
    let currentSnake = [2,1,0] //So the div in our grid being 2 for the HEAD and 0 being the end TAIL with all 1
	let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

	
    //To start and restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

	
    //Function that deals with ALL the ove outcomes of the Snake
    function moveOutcomes(){
    
    //Deals with snake hitting
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //If snake hits bottom
            (currentSnake[0] % width === width -1 && direction ===1) || //If snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //If snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //If snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //If snake goes into itself
        ){
            return clearInterval(interval) //This will clear the interval if any of the above happen
        }

        const tail =  currentSnake.pop() //Removes last ite of the array and shows it
        squares[tail].classList.remove('snake') //Removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) //Gives direction to the HEAD of the array
        
        //Deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes,intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

	
	//Generate new apple once apple is eaten
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }


    //Assign functions to keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake') //We are removing the class of 

        if(e.KeyCode === 39){
            direction = 1 //If we press the right arrow on our keyboard, the snake goes to right
        } else if (e.KeyCode === 38) {
            direction = -width //If we press up arrow, the snake will go to up
        } else if (e.KeyCode === 37) {
            direction = -1 //If we press left, the snake will go left one div
        } else if (e.KeyCode === 40) {
            direction = +width //If we press down, the snake head will instantly appear in div
        }
    }

    document.addEventListener('keyup', control)
    startButton.addEventListener('click', startGame)
})