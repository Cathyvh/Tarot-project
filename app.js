const api_url = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random/';

const htmlCards = document.querySelectorAll(".card")
const button = document.querySelector('#new-card')
const currentQuestion = document.querySelector('#current-question')

const descriptionArea = document.querySelector("#desc-text")
const meaningArea = document.querySelector("#meaning-text")

const questionPhrases = ["You as you are?", "Are you on the correct path?","What is the main obstacle?","What is helping me?","How can progress be made?"]
const cardDeck = []
let currentCardIndex = 0 
currentQuestion.innerHTML = questionPhrases[0]


function showDescription(e) {
    const cardId = e.target.id
    // plockar ut 5e char.
    const cardIndex = cardId.charAt(4)
    
    // kollar om kortet finns i decket
    if (cardDeck.length > cardIndex) {

        // hämta description och meaning för kortet
        const chosenCard = cardDeck[cardIndex]
        const description =  chosenCard.desc
        const meaning = chosenCard.cardMeaning
        
        // visa description och meaning
        meaningArea.innerHTML = meaning 
        descriptionArea.innerHTML = description
        
    }
}

//  click listeners för korten
for (let i = 0; i < htmlCards.length; i++) {
    htmlCards[i].addEventListener("click", showDescription)
}

async function getRandomCard() {
    const response = await fetch(api_url)
    const data = await response.json()
    const randomCard = data.cards[0] // plockar ut kortet från API:et

    // skapar ett "eget kort"
    const newCard = {
        name: randomCard.name,
        nameShort: randomCard.name_short,
        desc: randomCard.desc,
        cardMeaning: randomCard.meaning_up,
    }

    // bygger ihop vårt egna image-path
    const imagePath = `images/${newCard.nameShort}.jpg` 
    // hämtar ett htmlkort 
    const htmlCard = htmlCards[currentCardIndex]

    // ge htmlkortet sin header (namnet på kortet)
    htmlCard.querySelector(".card-heading").innerHTML = newCard.name
    
    // Ger htmlkortet sin bild
    htmlCard.querySelector("img").src = imagePath

    // lägger in kortet i ett deck
    cardDeck.push(newCard)
    
    currentCardIndex++

    if (currentCardIndex > 4) {
        button.disabled = true
    } else {
        const nextQuestion = questionPhrases[currentCardIndex]
        currentQuestion.innerHTML = nextQuestion 
    }
}

button.addEventListener('click', getRandomCard)
