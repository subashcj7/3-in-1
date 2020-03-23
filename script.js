//challenge 1:your age in days
function ageInDays(){
    var birthyear= prompt('what year were you born...good friend!!');
    var ageInDays=(2020-birthyear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode("You are "+ ageInDays + ' days old');
    h1.setAttribute("id", 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}



//challenge 2:rock,paper,scissors

function rpsGame(YourChoice){
    console.log(YourChoice)
    
    var HumanChoice, BotChoice;
    HumanChoice=YourChoice.id;
    
    BotChoice=numberToChoice(randToRpsInt());
    console.log('Bot choice:',BotChoice);
   
    results= decideWinner(HumanChoice, BotChoice); //[0,1] HUMAN LOST TO BOT
    console.log(results)
   
    message=finalMessage(results); // {'message':you won','color':'green'}
    console.log(message)
    rpsfrontend(YourChoice.id,BotChoice,message);

}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(YourChoice,BotChoice) {
    var rpsDatabase = {
        'rock': {'scissors':1 ,'rock':0.5 ,'paper':0},
        'paper': {'rock':1 ,'paper':0.5 ,'scissors':0},
        'scissors': {'paper':1 ,'scissors':0.5 ,'rock':0},

    }
    var Yourscore=rpsDatabase[YourChoice][BotChoice];
    var BotScore=rpsDatabase[BotChoice][YourChoice];

    return [Yourscore,BotScore];
}



function finalMessage([Yourscore,BotScore]){
    if (Yourscore == 0){
        return {'message': 'Uhhh,You lost!!','color' : 'red'};
    }
    else if (Yourscore == 0.5){
        return {'message': 'Haha,You tied','color' : 'blue'};
    }else{
        return {'message': 'Hurray!,You won','color' : 'green'};
    }
}

function rpsfrontend(HumanImageChoice,BotImageChoice,finalMessage){
    var imagesDatabase= {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src

    }
    //remove all the  images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var HumanDiv = document.createElement('div');
    var BotDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    
    HumanDiv.innerHTML ="<img src='" + imagesDatabase[HumanImageChoice]+  "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color: " + finalMessage['color'] + "; font-size; 60px;  padding: 30px; '>" + finalMessage['message'] + "</h1>"

    document.getElementById('flex-box-rps-div').appendChild(HumanDiv);
    
    BotDiv.innerHTML ="<img src='" + imagesDatabase[BotImageChoice]+  "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    
    document.getElementById('flex-box-rps-div').appendChild(BotDiv);

    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

}

let blackjackGame= {
    
    "you": {"scoreSpan": "#your-blackjack-result","div" :"#your-box","score":0},
    "dealer": {"scoreSpan": "#dealer-blackjack-result","div" :"#dealer-box","score":0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2, '3': 3, '4':4, '5': 5 ,'6':6, '7':7 ,'8':8 , '9':9 ,'10':10 ,'K':10, 'J':10 ,'Q':10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand': false,
    'turnsOver': false,

};

const YOU = blackjackGame["you"]
const DEALER=blackjackGame["dealer"]

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if (blackjackGame['isStand'] == false) {
    let card = randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
    }
}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if (activePlayer['score'] <=21){
        let cardImage = document.createElement('img');
        cardImage.src=`static/images/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnsOver'] == true){
        blackjackGame['isStand'] = false;
        
        let YourImages=document.querySelector("#your-box").querySelectorAll('img');
        let dealerImages=document.querySelector("#dealer-box").querySelectorAll('img');

        for(i=0; i < YourImages.length; i++){
            YourImages[i].remove();
        }

        for (i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score']= 0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent =0;
        document.querySelector('#dealer-blackjack-result').textContent =0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color ='#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true;
    }
}


function updateScore(card, activePlayer) {
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21) {
          activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else{
          activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card];
    
    } 

}


function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

 async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] == true) {

    
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }


    blackjackGame['turnsOver'] = true;
    let winner = computerWinner();
    showResult(winner);
    
}


function computerWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }


    } else if (YOU['score'] > 21  && DEALER['score'] <=21) {
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21  && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] == true) {

    

        if (winner == YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You won!";
            messageColor = "green";
            winSound.play();

        } else if (winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You lost!!";
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "You drew";
            messageColor = "black";
        }

        document.querySelector('#blackjack-result').textContent =message;
        document.querySelector("#blackjack-result").style.color = messageColor;
    }

}