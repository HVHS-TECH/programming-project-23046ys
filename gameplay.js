/*******************************************************/
// P5.play: gameplay
// Main Gameplay
/// Written by 
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/

const TIMER_SPEED= 1/50;

var score= 0;
var enemyStage= 1;

let doorClosed= false;


function setup() {
	console.log("setup: ");
	cnv = new Canvas(((windowWidth/6)*4), windowHeight);
	timer= new Sprite(0,0,10,10)
    timer.color= 'ccc';
    timer.vel.y= TIMER_SPEED;
    enemyMovement= new Sprite(0,0,10,10)
    enemyMovement.vel.x= 1;
}



function enemyMove(){

    if(enemyMovement.position.x>=100){
        if(enemyStage==3){
            console.log("Enemy Attacking");
             if(doorclosed== true){                
                enemyMovement.position.x= 0;
                enemyStage= 1;
             }else{
                endGame()
             }

       }else{
            enemyStage= enemyStage+1;
            enemyMovement.position.x= 0;
       }

    }
}



function doorControl(){
    if(kb.pressing('spacebar')){
        doorClosed= true;
    }else{
        doorClosed= false;
    }
}



function endGame(){
    timer.vel.y=0;
    enemyMovement.vel.x=0;
    console.log("Game Ended");
}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#007bff'); 
	



    score= Math.round(timer.position.y);
    text(score, 50, 50)
    text(enemyStage, 100, 100)
    text(doorClosed, 200, 200)

    doorControl()

    enemyMove()



}

/*******************************************************/
//  END OF APP
/*******************************************************/