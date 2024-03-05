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

function shuffleIds(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i].id, array[j].id] = [array[j].id, array[i].id];
    }
}

shuffleIds(cards);

const cardsElements = document.querySelectorAll('.cardVerso');

let flippedCards = []; // Array para armazenar as cartas viradas

// Função para exibir as cartas viradas e depois de 5 segundos ocultá-las novamente
function showCardsForFiveSeconds() {
    cardsElements.forEach((cardElement, index) => {
        const currentCard = cards[index];
        cardElement.classList.add(currentCard.hero);
        currentCard.flipped = true;
    });

    setTimeout(() => {
        cardsElements.forEach((cardElement, index) => {
            const currentCard = cards[index];
            cardElement.classList.remove(currentCard.hero);
            currentCard.flipped = false;
        });
    }, 5000);
}

cardsElements.forEach((cardElement, index) => {
    cardElement.addEventListener('click', function() {
        const cardId = cardElement.id;
        const clickedCard = cards.find(card => card.id === cardId);

        // Verificar se a carta já foi virada
        if (!clickedCard.flipped && flippedCards.length < 2) {
            // Virar a carta
            cardElement.classList.add(clickedCard.hero);
            clickedCard.flipped = true;

            // Adicionar carta virada ao array
            flippedCards.push(clickedCard);

            // Verificar se foram viradas duas cartas
            if (flippedCards.length === 2) {
                // Verificar se as duas cartas são iguais
                if (flippedCards[0].hero !== flippedCards[1].hero) {
                    // Se não forem iguais, virar as cartas de volta após um curto intervalo
                    setTimeout(() => {
                        flippedCards.forEach(flippedCard => {
                            const flippedCardElement = document.getElementById(flippedCard.id);
                            flippedCardElement.classList.remove(flippedCard.hero);
                            flippedCard.flipped = false;
                        });
                        flippedCards = []; // Limpar array de cartas viradas
                    }, 1000);
                } else {
                    flippedCards = []; // Limpar array de cartas viradas
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
let secondsLeft = 60; // Defina o tempo inicial em segundos

// Função para atualizar o contador de tempo
function updateTimer() {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    containerName.innerHTML = `
        <p>${username.value}</p>
        <p>Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</p>
    `;
}

// Função para iniciar o contador
function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        updateTimer();
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            // Adicione qualquer ação adicional após o término do contador, se necessário
        }
    }, 1000); // A cada segundo
}

// Função para exibir as cartas viradas e depois de 5 segundos ocultá-las novamente
function showCardsForFiveSeconds() {
    cardsElements.forEach((cardElement, index) => {
        const currentCard = cards[index];
        cardElement.classList.add(currentCard.hero);
        currentCard.flipped = true;
    });

    // Iniciar o contador após 5 segundos
    setTimeout(() => {
        startTimer(); // Inicia o contador
        cardsElements.forEach((cardElement, index) => {
            const currentCard = cards[index];
            cardElement.classList.remove(currentCard.hero);
            currentCard.flipped = false;
        });
    }, 5000);
}

// Evento de clique no botão "play"
play.addEventListener('click', function() {
    page.style.display = 'block';
    pageDois.style.display = 'none';
    showCardsForFiveSeconds();
});