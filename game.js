$(document).ready(function(){
  let level = "hard";
  var allColors = [];
  var chance = 0;
  var alreadyClicked = [];
  setColor(level);
  // easy click handle
  $("#levelButtonEasy").click(function(){
    level = "easy";
    $("#levelButtonHard").removeClass('selected');
    $("#levelButtonEasy").addClass('selected');
    $("#hard").fadeOut();
    setColor(level);
  });

  //hard click handle
  $("#levelButtonHard").click(function(){
    level = "hard";
    $("#levelButtonEasy").removeClass('selected');
    $("#levelButtonHard").addClass('selected');
    $("#hard").fadeIn();
    setColor(level);
  })

  function setColor(level){
    var colorCode = guessColor();
    setUpColor(colorCode, level);
  }

  function guessColor(){
    var colors = [];
    for(var i = 0; i<3; i++){
      colors[i] = Math.ceil(Math.random() * 255);
    }
    return(`RGB(${colors[0]}, ${colors[1]}, ${colors[2]})`);
  }

  function setUpColor(colorCode, level) {
    alreadyClicked = [];
    chance = 0;
    allColors = [];
    $("#colorGuess").html(colorCode);
    var max = "easy" == level ? 3 : 6
    var answerBox = Math.ceil(Math.random() * max);
    var ans = `.box${answerBox}`;
    $(ans).css('background-color', colorCode);
    $(ans).css('border-color', colorCode);
    if('easy' == level){
      for(var i=1; i<4; i++){
        var currentColor = guessColor();
        if(i != answerBox && currentColor != colorCode && $.inArray(currentColor, allColors) == -1) {
          $(`.box${i}`).css('background-color', currentColor);
          $(`.box${i}`).css('border-color', currentColor);
        }
        if(currentColor == colorCode || $.inArray(currentColor, allColors) != -1) {
          --i;
        }
        allColors.push(currentColor);
      }
    }
    if('hard' == level){
      for(var i=1; i<7; i++){
        var currentColor = guessColor();
        if(i != answerBox && currentColor != colorCode && $.inArray(currentColor, allColors) == -1) {
          $(`.box${i}`).css('background-color', currentColor);
          $(`.box${i}`).css('border-color', currentColor);
        }
        if(currentColor == colorCode || $.inArray(currentColor, allColors) != -1) {
          --i;
        }
        allColors.push(currentColor);
      }
    }
  }

  // handle box click
  $(".colorBox").click(function(){
    if($.inArray(this, alreadyClicked) != -1)
    {
      return;
    }
    var guessColor = $(this).css("background-color").toUpperCase();
    var answerColor = $("#colorGuess").html();
    alreadyClicked.push(this);
    if( guessColor == answerColor) {
      chance = 0;
      alert('hurray, you made it');
      setColor(level);
    }
    else {
      ++chance;
      $(this).css('background-color', 'black');
      $(this).css('border-color', 'black');
      if(chance >= 2) {
        chance = 0;
        alert('oops!! you failed, lets try with other colors');
        setColor(level);
      }
    }
  })

  // new colors Effect
  $("#newColors").click(function(){
    setColor(level);
  })
})
