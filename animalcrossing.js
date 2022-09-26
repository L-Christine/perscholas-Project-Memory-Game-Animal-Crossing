document.addEventListener('DOMContentLoaded', () =>{
    
    const section = document.querySelector('section')
    const attemptCount = document.querySelector('#attemptCount')
    
    let attempt = 40; //can be changed
    attemptCount.textContent = attempt

    //====array: card data
    const cardArray = [
        {name: 'blathers', img: './images/blathers.png'},
        {name: 'brewster', img: './images/brewster.png'},
        {name: 'celeste', img: './images/celeste.png'},
        {name: 'cj', img: './images/cj.png'},
        {name: 'cyrus', img: './images/cyrus.png'},
        {name: 'daisymae', img: './images/daisymae.png'},
        {name: 'flick', img: './images/flick.png'},
        {name: 'gulliver', img: './images/gulliver.png'},
        {name: 'harvey', img: './images/harvey.png'},
        {name: 'isabelle', img: './images/isabelle.png'},
        {name: 'katrina', img: './images/katrina.png'},
        {name: 'kk', img: './images/kk.png'},
        {name: 'label', img: './images/label.png'},
        {name: 'leif', img: './images/leif.png'},
        {name: 'lottie', img: './images/lottie.png'},
        {name: 'luna', img: './images/luna.png'},
        {name: 'mabel', img: './images/mabel.png'},
        {name: 'pascal', img: './images/pascal.png'},
        {name: 'redd', img: './images/redd.png'},
        {name: 'reese', img: './images/reese.png'},
        {name: 'saharah', img: './images/saharah.png'},
        {name: 'timmytommy', img: './images/timmytommy.png'},
        {name: 'tomnook', img: './images/tomnook.png'},
        {name: 'wilbur', img: './images/wilbur.png'},
        {name: 'wisp', img: './images/wisp.png'},
        //another identical set
        {name: 'blathers', img: './images/blathers.png'},
        {name: 'brewster', img: './images/brewster.png'},
        {name: 'celeste', img: './images/celeste.png'},
        {name: 'cj', img: './images/cj.png'},
        {name: 'cyrus', img: './images/cyrus.png'},
        {name: 'daisymae', img: './images/daisymae.png'},
        {name: 'flick', img: './images/flick.png'},
        {name: 'gulliver', img: './images/gulliver.png'},
        {name: 'harvey', img: './images/harvey.png'},
        {name: 'isabelle', img: './images/isabelle.png'},
        {name: 'katrina', img: './images/katrina.png'},
        {name: 'kk', img: './images/kk.png'},
        {name: 'label', img: './images/label.png'},
        {name: 'leif', img: './images/leif.png'},
        {name: 'lottie', img: './images/lottie.png'},
        {name: 'luna', img: './images/luna.png'},
        {name: 'mabel', img: './images/mabel.png'},
        {name: 'pascal', img: './images/pascal.png'},
        {name: 'redd', img: './images/redd.png'},
        {name: 'reese', img: './images/reese.png'},
        {name: 'saharah', img: './images/saharah.png'},
        {name: 'timmytommy', img: './images/timmytommy.png'},
        {name: 'tomnook', img: './images/tomnook.png'},
        {name: 'wilbur', img: './images/wilbur.png'},
        {name: 'wisp', img: './images/wisp.png'}
    ] 
    
    //====function: randomize & sort
    const randSort = () => {
        cardArray.sort(() => 0.5-Math.random())
        return cardArray
    }
    
    //====function: game start & set cards on the board
    const playGame = () => {
        //create element, attach class
        cardArray.forEach((item) => {
            const card = document.createElement('div')
            card.classList.add('card')
    
            const front = document.createElement('img')
            front.classList.add('front')
            
            const back = document.createElement('img')      
            back.src ='./images/backside.jpg'
            back.classList.add('back')
            
            //attach img file to the cards
            front.src = item.img
    
            //add img name to card div
            card.setAttribute('name', item.name)
    
            //attach the cards to the section + attach front & back to the card
            section.appendChild(card)
            card.appendChild(front)
            card.appendChild(back)
    
            card.addEventListener('click', (e) =>{
                card.classList.toggle('toggle')
                checkCards(e)
            })
        })
    }
    
    //====function: check if two cards are matching
    const checkCards = (e) => {
        const click = e.target //click -> capture target==cards clicked
        flipSound.play()
        click.classList.add('flipped') //click -> add 'flipped' to the class
        const flip = document.querySelectorAll('.flipped') //save flipped cards into flip variable
        const toggle = document.querySelectorAll('.toggle')
        
        //compare & match after clicking two cards
        if (flip.length === 2) {
            if(flip[0].getAttribute('name') === flip[1].getAttribute('name')){
                flip.forEach((card) => {
                    card.classList.remove('flipped') //remove 'flipped' from the class
                    card.style.pointerEvents = 'none' //make flipped matching cards unclickable
                })
            } else {
                flip.forEach((card) => {
                    card.classList.remove('flipped') //remove 'flipped' from the class
    
                    setTimeout(() => card.classList.remove('toggle'), 1000) //cancel 'toggle' after # ms when cards are not matching
                })
    
                attempt-- //for each wrong set, take 1 off
                attemptCount.textContent = attempt
    
                //LOSE if theres no more attempts
                if (attempt === 0){
                    loseSound.play()
                    setTimeout(() => window.alert('Game Over!'), 1000)
                    section.style.pointerEvents = 'none'
                }
            }
        }
        //WIN if toggled cards === total num of cards
        if (toggle.length === 50) {
            winSound.play()
            setTimeout(() => window.alert('You Won!'), 1000)
            section.style.pointerEvents = 'none'
        }
    }
    
    //====function: reset the game
    const reset = () => {
        let cardArray = randSort() //shuffle
        let fronts = document.querySelectorAll('.front')
        let cards = document.querySelectorAll('.card')
        
        section.style.pointerEvents = 'none' //make cards unclickable until game resets
    
        //==random & sort again
        cardArray.forEach((item, i) => {
            cards[i].classList.remove('toggle') //undo flip
            cards[i].style.pointerEvents = 'all' //make matching sets from a previous game clickable again
            fronts[i].src = item.img //update image
            cards[i].setAttribute('name', item.name) //update name
            section.style.pointerEvents = 'all' //clickable again after reset
        })
    
        //==reset # of attempt
        attempt = 40
        attemptCount.textContent = attempt
    }

    //====audio files
    const flipSound= new Audio('./sounds/flip.mp3')
    flipSound.volume = 0.1
    const winSound= new Audio('./sounds/Win.mp3')
    const loseSound= new Audio('./sounds/Lose.mp3')
    const mainSound= new Audio('./sounds/Main Theme.mp3')
    mainSound.loop= true

    //====function: music play/pause
    const music = () => {
        mainSound.paused ? mainSound.play() : mainSound.pause()
    }

    //====button
    const resetBtn = document.querySelector('#resetBtn')
    resetBtn.addEventListener('click', reset)

    const musicBtn = document.querySelector('#musicBtn')
    musicBtn.addEventListener('click', music)
    
    //====test
    playGame()

})
