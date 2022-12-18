

var gamePattern =[];

var userClickedPattern=[];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

function nextSequence() {
    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber= Math.ceil(Math.random()*3);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

}


$(".btn").click(function(event){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
      }, 100);
    
}

$('body').keydown(function(keyA){
    var PressA = ((keyA.key).toLowerCase());
    if (PressA === "a") {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
          }
    }
})

function checkAnswer(currentLevel){
  
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    
    if (userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } 
  else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
    
    level = 0;

    gamePattern =[];

    userClickedPattern=[];

    started = false;
}