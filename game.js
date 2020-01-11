$(document).ready(function(){
  let level = "hard";
  var allColors = [];
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
    allColors = [];
    $("#colorGuess").html(colorCode);
    var answerBox = Math.ceil(Math.random() * 3);
    var ans = `.box${answerBox}`;
    $(ans).css('background-color', colorCode);
    $(ans).css('border-color', colorCode);
    if('easy' == level){
      for(var i=1; i<4; i++){
        console.log('in easy loop', i)
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
        console.log('in hard loop', i, currentColor);
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
})
