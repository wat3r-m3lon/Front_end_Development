var array=["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern=[];
var level =0;
var start=false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
     var randomNumber =  Math.floor(Math.random()*3)+1;
     var randomChosenColour = array[randomNumber];
     gamePattern.push(randomChosenColour);
     $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
     animatePress(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var index = userClickedPattern.length-1;
    checkAnswer(index);
});

function playSound(name){
    var audio = new Audio("sounds/"+name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

$(document).keypress(function(){
    if (!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start=true;
    }
});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 100);
          $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;

}