var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

function newSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html('Game Over, Press Any Key to Restart<br>or<br><span class="click-here">Reload!</span>');
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started = true;
    }
});

$(".click-here").click(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started = true;
    }
});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}