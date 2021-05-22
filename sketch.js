var ball;
var database, position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    var dbRef = database.ref("ball/position");
    dbRef.on("value", readData);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function readData(data) {

    position = data.val();

}

function draw(){
    background("white");

    if (position !== undefined) {

        ball.x = position.x;
        ball.y = position.y;

    }

    if(keyDown(LEFT_ARROW)){
        updatePos(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePos(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updatePos(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePos(0,+1);
    }
    drawSprites();
}

function updatePos(x,y){
    database.ref("ball/position").update({

        'x': position.x + x,
        'y': position.y + y

    });
}
