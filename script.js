//Draw images to canvas continuously
var cvs = document.getElementById('canvas');
var obj = cvs.getContext('2d');
//Load image
var red = new Image();
var bg = new Image();
var fg = new Image();
var northBlock = new Image();
var southBlock = new Image();
red.src = 'pics/bob.png'; //50x50
bg.src = 'pics/cyanbg.png'; //288x512
fg.src = 'pics/greenfg.png'; //306x118
northBlock.src = 'pics/northBlock.png '; //52x242
southBlock.src = 'pics/southBlock.png'; //52x378

//***OBJECT PLACEMENT***//
//Gap between pillars
var gap = 90;
var constant;
//Player start position
var bX = 30;
var bY = 200;
//Push square down, greater = stronger
var gravity = 1.5;
//block co-od
var block = [];
//Restrict blocks to screen dimensions
block[0] = {
    x : cvs.width,
    y : 0
};

//***MOVEMENT***//
//Move up on keypress
document.addEventListener('keydown',moveUp);
//Distance moved per keypress
function moveUp (){
    bY -= 15;
}

//***GAME LOGIC***//
//Draw Map & blocks | bg:background | cvs:canvas | fg:foreground
function draw(){
    obj.drawImage (bg,0,0); //(background, x-axis, y,axis)
        for(var i = 0; i < block.length; i++){ //Block length is pre-determined by picture size
            constant = northBlock.height+gap; //Use North as reference & make it a constant
            obj.drawImage(northBlock,block[i].x,block[i].y); //Places North block
            obj.drawImage(southBlock,block[i].x,block[i].y+constant); //Places South block based on constant
                block[i].x--;
        if( block[i].x == 50 ){
            block.push({
            x : cvs.width,
            y : Math.floor(Math.random()*northBlock.height)-northBlock.height
            });
}
//Detect collision
if( bX + red.width >= block[i].x
    &&
    bX <= block[i].x + northBlock.width
    &&
    (bY <= block[i].y + northBlock.height
    ||
    bY+red.height >= block[i].y+constant)
    ||
    bY + red.height >=  cvs.height - fg.height)
//Reload
{location.reload();}
}

obj.drawImage(fg,0,cvs.height-fg.height);
obj.drawImage(red,bX,bY);
//Gravity
bY += gravity;
//Loop draw
requestAnimationFrame(draw);
}
draw();