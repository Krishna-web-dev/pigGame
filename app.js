// alert("GAME_CREATER KRISHNA VERMA");

/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
// THE MOST IMPORTANT var declared here is gamePlaying that enables us to execute the game only when the winner is
// is not announced so that further gameplay does not disturb the flow of program
var scores,activePlayer,dice,roundScore,gamePlaying,finalScore,previousDice;
initial();
//when player meets 1
 //using math object to generate a random value nested to get floor value
//  dice = Math.floor(Math.random()*6) + 1;
 //DOM
 //text content used to overwrite new value
//  document.querySelector('#current-0').textContent = dice;//SETTER//
 //using type coercion it converts the 
 //expression inside the querySelector as current-0 or current -1
 // using innerHTML also the same functionlaity can be achieved the only catch is it converts the 
 //HTML whereas the former changes plain text only
 //document.querySelector('#score-'+ activePlayer).textContent= '<em style="color:teal">' + dice + '</em>';
 //above line prints the same text with semicolon removed but else stored but on writting innerHTML javascript 
 //parser will asumme that there is some HTMl code then changes will be carried out
//  document.querySelector('#score-'+ activePlayer).innerHTML= '<em style="color:teal ">' + dice + '</em>';
// var valueUsingDom = document.querySelector('#current-'+ activePlayer).innerHTML; GETTER
// console.log(valueUsingDom);
// modifying css by using.style and then css properties

finalScore = prompt("enter the winning score (HINT:start with 20)");
//resetting to 0 
document.querySelector("#current-0").textContent = 0;
document.querySelector("#current-1").textContent = 0;
document.querySelector("#score-0").textContent = 0;
document.querySelector("#score-1").textContent = 0;


document.querySelector(".dice").style.display= 'none';
document.querySelector(".secondDice").style.display= 'none';
// document.querySelector(".winning").style.display = "none";


// document.querySelector("#score-0").style.fontSize = "6rem";




//for adding events listener 
//addEventListener takes 2 arguments first the events eventreference MDN and second the function which gets executed 
// as soon as the event is fired

//
//function btnFunction(){
  //  alert("lucifer into your system");
//}
// //
// function playDiceMusic(){
//   // console.log("krishn verma");

//   musicRoll.play();
// }
// document.querySelector('.btn-roll').addEventListener('click',btnFunction)//here no () parenthesis as we want
//event listener to execute not the js engine to call the function only btn clikc
//Named as callback function which gets executed when we call function and pass function as argument
// if directly wrote the function inside the eventlistener then it means that it is ANONYMOUS FUNCTION
// CATCH; ANONYMOUS FUNCITON can not be accessed by any other events listener other then it's parent 
document.querySelector(".btn-roll").addEventListener('click',function(){
  rollDicePlay();
if(gamePlaying){
         
        // playDiceMusic();
        // 1. random number
          //  alert("inside the game playing");
        var dice = Math.floor(Math.random()*6) + 1;
        var diceSecond = Math.ceil(Math.random()*6);///;for making second dice different then the previous
        if(previousDice === 6 && dice === 6)//comparison makes it 6===6 type coercion not done
        {
          nextPlayer();
        }
        
          previousDice = dice;
        //2. display the result in the images also first update the above none display thing
        var diceDOM = document.querySelector('.dice');
        // second dice dom
        var secondDiceDOM = document.querySelector('.secondDice');
      //both dices resetted to first one
        secondDiceDOM.style.display = "block";
      
         diceDOM.style.display = 'block';
        secondDiceDOM.src = "dice-" + diceSecond + ".png";
        diceDOM.src ="dice-" + dice + ".png";// update the completer src value with format
        //3.update roundScore if only not 1 on dice
          if(dice !== 1 && diceSecond !== 1 ){
        roundScore = roundScore +  dice + diceSecond;
        document.querySelector('#current-' + activePlayer).textContent= roundScore;
          }
          else { 
            nextPlayer();
          }
        }
else{
  alert("GAME ENDED PRESS ENTER TO REPLAY");
  initial();
}

} )

// btn-hold functionality
document.querySelector(".btn-hold").addEventListener("click",function(){
hold();
 if(gamePlaying){
    ///  add CURRENT Score to the GLOBAL score of the current active player
 scores[activePlayer] += roundScore;
 document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
 document.querySelector("#current-" + activePlayer).textContent = 0;
//  roundScore = 0;
document.querySelector(".dice").style.display = "none";
document.querySelector(".secondDice").style.display= "none";

if(scores[activePlayer]>finalScore)
{ winning();
// document.querySelector(".winning").play();

  document.querySelector("#name-" + activePlayer).innerHTML ="winner!";
  document.querySelector(".dice").style.display= "none";
  document.querySelector(".secondDice").style.display= "none";

  //player gets more design 
  document.querySelector(".player-"+ activePlayer + "-panel").classList.add("winner");
  document.querySelector(".player-"+ activePlayer + "-panel").classList.remove("active");
  gamePlaying = false;
  
}
else{
 nextPlayer();

}

 }
 else{
   alert("GAME ENDED PRESS ENTER TO START");
   initial();
 }

})
function nextPlayer ()
{
  roundScore = 0 ;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //resettting the active player score to 0
  document.querySelector("#current-0").textContent = '0';
  document.querySelector("#current-1").textContent = '0';

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");//means if then will add else not
 

}


document.querySelector(".btn-new").addEventListener("click",function(){
  alert("RESTART THE GAME PRESS ENTER");
initial();





})
function initial (){
// document.querySelector(".winning").pause();

 
  // console.log(finalScore);

  gamePlaying = true;
  scores = [0,0];
  activePlayer =0;
  roundScore =0; 

document.querySelector("#current-0").textContent = 0;
document.querySelector("#current-1").textContent = 0;
document.querySelector("#score-0").textContent = 0;
document.querySelector("#score-1").textContent = 0;

document.querySelector("#name-0").innerHTML ="player 1";

document.querySelector("#name-1").innerHTML ="player 2";
document.querySelector(".player-0-panel").classList.add("active");
document.querySelector(".player-1-panel").classList.remove("active");
 document.querySelector(".dice").style.display = "none"; 
}
var roll = new Audio("rollDice.m4a");//for continouse sound repeat playing you have do it this way
//else on direct calling it by elements in DOM the object once get called doesnot plays again
var holdSound = new Audio("hold.mp3");
var winningSound = new Audio("won.mp3")
function rollDicePlay(){
  roll.play();
}
function hold(){
  holdSound.play();
}
function winning(){
  winningSound.play();
}
