const cards = [
    { id: 'card1', hero: 'heroUmImg', flipped: false },
    { id: 'card2', hero: 'heroUmImg', flipped: false },
    { id: 'card3', hero: 'heroDoisImg', flipped: false },
    { id: 'card4', hero: 'heroDoisImg', flipped: false },
    { id: 'card5', hero: 'heroTresImg', flipped: false },
    { id: 'card6', hero: 'heroTresImg', flipped: false },
    { id: 'card7', hero: 'heroQuatroImg', flipped: false },
    { id: 'card8', hero: 'heroQuatroImg', flipped: false },
    { id: 'card9', hero: 'heroCincoImg', flipped: false },
    { id: 'card10', hero: 'heroCincoImg', flipped: false },
    { id: 'card11', hero: 'heroSeisImg', flipped: false },
    { id: 'card12', hero: 'heroSeisImg', flipped: false },
    { id: 'card13', hero: 'heroSeteImg', flipped: false },
    { id: 'card14', hero: 'heroSeteImg', flipped: false },
    { id: 'card15', hero: 'heroOitoImg', flipped: false },
    { id: 'card16', hero: 'heroOitoImg', flipped: false },
    { id: 'card17', hero: 'heroNoveImg', flipped: false },
    { id: 'card18', hero: 'heroNoveImg', flipped: false },
    { id: 'card19', hero: 'heroDezImg', flipped: false },
    { id: 'card20', hero: 'heroDezImg', flipped: false }
];

function shuffleCardsByHero(array) {
    const heroes = array.map(card => card.hero);
    for (let i = heroes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [heroes[i], heroes[j]] = [heroes[j], heroes[i]];
    }
    array.forEach((card, index) => {
        card.hero = heroes[index];
    });
}

function showCardsForFiveSeconds() {
    originalOrder = [...cards.map(card => card.id)];
    shuffleCardsByHero(cards);

    cardsElements.forEach((cardElement, index) => {
        const currentCard = cards[index];
        cardElement.classList.add(currentCard.hero);
        currentCard.flipped = true;
    });

    setTimeout(() => {
        startTimer();
        cardsElements.forEach((cardElement, index) => {
            const currentCard = cards.find(card => card.id === originalOrder[index]);
            cardElement.classList.remove(currentCard.hero);
            cardElement.classList.add('cardVerso');
            currentCard.flipped = false;
        });
        checkGameStatus(); // Verifica se o usuário perdeu após 5 segundos
    }, 5000);
}

function checkGameStatus() {
    const allCardsFlipped = cards.every(card => card.flipped);
    if (allCardsFlipped) {
        clearInterval(timerInterval);
        setTimeout(() => {
            document.querySelector('.fade-modal').style.display = 'flex';
            document.querySelector('.fade-modal p').textContent = 'Você ganhou!';
        }, 500);
    } else if (secondsLeft === 0) {
        clearInterval(timerInterval);
        document.querySelector('.fade-modal').style.display = 'flex';
        document.querySelector('.fade-modal p').textContent = 'Você perdeu!';
    }
}

const cardsElements = document.querySelectorAll('.cardVerso');
let flippedCards = [];

let originalOrder = [];

cardsElements.forEach((cardElement, index) => {
    cardElement.addEventListener('click', function() {
        const cardId = cardElement.id;
        const clickedCard = cards.find(card => card.id === cardId);

        if (!clickedCard.flipped && flippedCards.length < 2) {
            cardElement.classList.add(clickedCard.hero);
            clickedCard.flipped = true;
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                if (flippedCards[0].hero !== flippedCards[1].hero) {
                    setTimeout(() => {
                        flippedCards.forEach(flippedCard => {
                            const flippedCardElement = document.getElementById(flippedCard.id);
                            flippedCardElement.classList.remove(flippedCard.hero);
                            flippedCardElement.classList.add('cardVerso');
                            flippedCard.flipped = false;
                        });
                        flippedCards = [];
                    }, 1000);
                } else {
                    flippedCards = [];
                }
            }
        }
    });
});

const play = document.querySelector("#play");
const username = document.querySelector("#username");
const containerName = document.querySelector(".container-name");
const page = document.querySelector(".page");
const pageDois = document.querySelector(".pageDois");

username.addEventListener('input', function(){
    if(username.value === '') {
        play.style.backgroundColor = '#D9D9D9';
        play.style.color = '#898989';
        play.disabled = true;
        play.style.cursor = 'auto';
        play.classList.remove('efeitoHover');
    } else {
        play.style.backgroundColor = '#FFA608';
        play.style.color = '#FF6D00';
        play.style.cursor = 'pointer';
        play.classList.add('efeitoHover');
    }
})

let timerInterval;
let secondsLeft = 60;

function updateTimer() {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    containerName.innerHTML = `
        <p>${username.value}</p>
        <p>Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</p>
    `;
}

function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        updateTimer();
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            checkGameStatus(); // Verifica se o tempo acabou e se o usuário perdeu
        }
    }, 1000);
}

const playAgainButton = document.querySelector('.fade-modal button:nth-of-type(1)');
const returnToHomeButton = document.querySelector('.fade-modal button:nth-of-type(2)');

playAgainButton.addEventListener('click', function() {
    document.querySelector('.fade-modal').style.display = 'none';
    resetGame();
});

returnToHomeButton.addEventListener('click', function() {
    document.querySelector('.fade-modal').style.display = 'none';
    page.style.display = 'none';
    pageDois.style.display = 'block';
});

function resetGame() {
    // Oculta o modal de vitória ou derrota
    document.querySelector('.fade-modal').style.display = 'none';
    
    // Reinicia o temporizador e atualiza a interface do usuário
    clearInterval(timerInterval);
    secondsLeft = 60;
    updateTimer();
    
    // Reinicia o estado dos cartões
    cards.forEach(card => {
        card.flipped = false;
    });

    // Remova todas as classes de herói dos elementos dos cartões
    cardsElements.forEach(cardElement => {
        cardElement.classList.remove(...cards.map(card => card.hero));
        cardElement.classList.add('cardVerso');
    });

    // Limpa o array de cartões virados
    flippedCards = [];

    // Reembaralha os cartões e mostra-os por cinco segundos
    shuffleCardsByHero(cards);
    showCardsForFiveSeconds();
}




play.addEventListener('click', function() {
    page.style.display = 'block';
    pageDois.style.display = 'none';
    showCardsForFiveSeconds();
});