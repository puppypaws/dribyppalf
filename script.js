//Draw images to canvas *continuously*
var cvs = document.getElementById('canvas');
//Allows manipulation eg. gravity within canvas
var obj = cvs.getContext('2d');
//Load image
var red = new Image();
var bg = new Image();
var fg = new Image();
var northBlock = new Image();
var southBlock = new Image();
red.src = 'pics/redv2.png'; //29x33
bg.src = 'pics/cyanbg.png'; //288x512
fg.src = 'pics/greenfg.png'; //306x118
northBlock.src = 'pics/northBlock.png '; //52x242
southBlock.src = 'pics/southBlock.png'; //52x378

//***OBJECT PLACEMENT***//
//Gap between pillars
var gap = 73;
var constant;
//Player start position (starts from top left) (y-axis is inverted +/-)
var bX = 30;
var bY = 150;
//Push square down, greater = stronger
var gravity = 1.5;
//Score variable
var score = 0;
//Block co-od
var block = [];
//Restrict blocks to screen dimensions
block[0] = {
    x : cvs.width,
    y : 0
};

//***MOVEMENT***//
//Small hop
function smallHopPress(event) {
  var x = event.keyCode || event.which;
    console.log(x + " was pressed");
        if (x === 87) {
        smallHop();
        }
}
document.addEventListener('keydown',smallHopPress);
function smallHop (){
    bY -= 25; //Distance moved per keypress
}

//Big hop
function bigHopPress(event) {
  var x = event.keyCode || event.which;
    console.log(x + " was pressed");
        if (x === 32) { //Spacebar
        bigHop();
        }
}
document.addEventListener('keydown',bigHopPress);
function bigHop (){
    bY -= 35; //Distance moved per keypress
}

//Kamikaze
function kamikazePress(event) {
  var x = event.keyCode || event.which;
    console.log(x + " was pressed");
        if (x === 68) { //D
        kamikaze();
        }
}
document.addEventListener('keydown',kamikazePress);
function kamikaze (){
    bX += 20;
    bY -= 5; //Distance moved per keypress
}

//Abort Mission
function abortMissionPress(event) {
  var x = event.keyCode || event.which;
    console.log(x + " was pressed");
        if (x === 65) { //A
        abortMission();
        }
}
document.addEventListener('keydown',abortMissionPress);
function abortMission (){
    bX -= 20;
    bY -= 5; //Distance moved per keypress
}


//***GAME LOGIC***//
//Draw Map & blocks | bg:background | cvs:canvas | fg:foreground
function draw(){
    obj.drawImage (bg,0,0); //(background, x-axis, y,axis)
        for(var i = 0; i < block.length; i++){ //Loop to draw pipes. Each i++ will draw N+S blocks

            constant = northBlock.height+gap; //Define constant as north block + gap

            obj.drawImage(northBlock,block[i].x,block[i].y); //Places North block
            obj.drawImage(southBlock,block[i].x,block[i].y+constant); //Places South block based on constant

                block[i].x--; //Makes pipes be drawn within canvas by moving them left(x--)

        if( block[i].x == 70 ){ //Adds more pipes after each pipe, whenever previous pipe reaches defined x-pos
            block.push({ //Begin placing blocks based on rules below
            x : cvs.width, //Restrict block placement to canvas
            y : Math.floor(Math.random()*northBlock.height)-northBlock.height //Randomise vertical gap
            });
}
//***SCORING***//
if( block[i].x == 5) { //If block cood: x=5, add +1 to score
    score++;
}
//***COLLISION DETECTION***//
if( bX + red.width >= block[i].x               //Player x-pos+width  Greater  block x-pos
    &&                                         //AND
    bX <= block[i].x + northBlock.width        //Player x-pos        Lesser   block width
    &&                                         //AND
    (bY <= block[i].y + northBlock.height      //Player y-pos        Lesser   block height
    ||                                         //OR
    bY + red.height >= block[i].y+constant)    //Player y-pos+height Greater  block y-pos+(height+gap)
    ||                                         //OR
    bY + red.height >= cvs.height - fg.height) //Player y-pos+height Greater  canvas height - foreground height
{
//***RESET***//
location.reload();} //If locations match, reload game
}

//***DRAW PLAYER,FG & SCORE***//
//(Object,x-pos,y-pos using canvas as reference)
obj.drawImage(fg,0,cvs.height-fg.height);
//(object,x-pos,y-pos predetermined on lines 22 & 23)
obj.drawImage(red,bX,bY);
//Score format & location
obj.fillStyle = '#000';
obj.font = "20px Roboto";
obj.fillText("Score : "+score,10,cvs.height-20);

//Apply gravity to player's bY *Must be placed below logic*
bY += gravity;

//Infinite drawing loop begins
requestAnimationFrame(draw);
}
draw();

//***TO-DO***//
//Add more block variety: wider which requires new button (go forward)
//Sound, hi-score, graphics
//Start button, difficulty level
//Online leaderboard