$('.ball').click(function(){
  var topY = getRandomY();
  var leftX = $('.ball').css('left') == '0px' ? ($('.football').width() - 100) : 0;

  $('.ball')
    .animate({"top" : topY,
      "left" : leftX
    }, {
      duration: 1800,
      easing: "linear",
      complete: function() {
        
        if(leftX == 0){
          var coords = $('#left').attr('coords').split(',').map(Number);
        } else {
          var coords = $('#right').attr('coords').split(',').map(Number);
        }

        if (intersection(topY, topY + 100, coords[1], coords[3])) {
          alert('Вы забили ГОЛ!');
          restartGame();
        }
      }
    });
});

function getRandomY(){
  var min = Math.ceil(0);
  var max = Math.floor($('.football').height()) - 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersection(a1, a2, b1, b2) {
  return ( a1 < b2 && a2 > b1);
}

function restartGame(){
  $('.ball').css({
    "top" : $('.football').height() / 2 - 50,
    "left" : $('.football').width() / 2 - 50
  });
}