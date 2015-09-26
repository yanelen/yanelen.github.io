function initialize () {
  $('.square').addClass('inactive');
  $('#message').hide();
  $('#points').hide();
}

var game = {
  count: 1,
  player: "X",
  position : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
  scoreX: 0,
  scoreO: 0,
  gameOver: false,
  increment: function() {
    this.count += 1;
    if (this.count % 2 === 0) {
      this.player = "O";
      $('#message').text("O, it's your turn!");
    }
    else {
      this.player = "X";
      $('#message').text("X, it's your turn!");
    }
    if (this.count >= 5) {
      this.determine();
    }
  },
  square: function() {
    var that = this;
    $('#one').one('click', function(){
      $('#one').text(that.player);
      that.position[0] = that.player;
      that.increment();
    })
    $('#two').one('click', function(){
      $('#two').text(that.player);
      that.position[1] = that.player;
      that.increment();
    })
    $('#three').one('click', function(){
      $('#three').text(that.player);
      that.position[2] = that.player;
      that.increment();
    })
    $('#four').one('click', function(){
      $('#four').text(that.player);
      that.position[3] = that.player;
      that.increment();
    })
    $('#five').one('click', function(){
      $('#five').text(that.player);
      that.position[4] = that.player;
      that.increment();
    })
    $('#six').one('click', function(){
      $('#six').text(that.player);
      that.position[5] = that.player;
      that.increment();
    })
    $('#seven').one('click', function(){
      $('#seven').text(that.player);
      that.position[6] = that.player;
      that.increment();
    })
    $('#eight').one('click', function(){
      $('#eight').text(that.player);
      that.position[7] = that.player;
      that.increment();
    })
    $('#nine').one('click', function(){
      $('#nine').text(that.player);
      that.position[8] = that.player;
      that.increment();
    })
  },
  determine: function() {
    for (var i = 0; i < 7; i = i + 3) {
      if (this.position[i] === this.position[i+1] && this.position[i] === this.position[i+2]) {
        if (this.position[i] === "X") {
          this.xWin();
        }
        else {
          this.oWin();
        }
      }
    }
    for (var i = 0; i < 3; i++) {
      if (this.position[i] === this.position[i+3] && this.position[i] === this.position[i+6]) {
        if (this.position[i] === "X") {
          this.xWin();
        }
        else {
          this.oWin();
        }
      }
    }
    if (this.position[0] === this.position[4] && this.position[0] === this.position[8]) {
      if (this.position[0] === "X") {
        this.xWin();
      }
      else {
        this.oWin();
      }
    }
    if (this.position[2] === this.position[4] && this.position[2] === this.position[6]) {
      if (this.position[2] === "X") {
        this.xWin();
      }
      else {
        this.oWin();
      }
    }
    if (this.count === 10 && this.gameOver === false) {
      $('.square').unbind();
      $('#message').text("Draw!");
      this.rematchButton();
    }
  },
  xWin: function() {
    $('.square').unbind();
    $('#message').text(xName + " Wins!");
    this.gameOver = true;
    this.scoreX += 1;
    $('#scoreX').text(this.scoreX.toString());
    this.rematchButton();
  },
  oWin: function() {
    $('.square').unbind();
    $('#message').text(oName + " Wins!");
    this.gameOver = true;
    this.scoreO += 1;
    $('#scoreO').text(this.scoreO.toString());
    this.rematchButton();
  },
  rematchButton: function() {
    $('#rematch').append('<div class="button">REMATCH</div>')
    var that = this;
    $('.button').on('click', function() {
      $('#rematch').empty();
      that.rematch();
    })
  },
  rematch: function() {
    $('#message').text("X, it's your turn!");
    this.count = 1;
    this.player = "X";
    this.position = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    $('.square').empty();
    $('.square').unbind();
    this.gameOver = false;
    this.square();
  }
}

function Player (name) {
  this.name = name;
}

function PlayerView (player) {
  this.player = player;
  this.$el = this.createEl();
  this.setHandlers();
}

PlayerView.prototype.createEl = function () {
  var $el = $('<div class="player">'),
      name = $('<h3 class="name">');
  name.text( this.player.name );
  $('#player-entry').text('Player O');
  return $el;
}

PlayerView.prototype.setHandlers = function () {
  this.$el.on("click", function (e) {
    $(this).remove();
  })
}

var playerInput = $('#player-input'),
    counter = 0;

playerInput.on('keypress', function (e) {
  if (e.charCode === 13) {
    counter += 1;
  }
  if (e.charCode === 13 && (counter === 1 || counter === 2)) {
    var player = new Player( $(this).val() );
    var playerView = new PlayerView( player );
    var name = $(this).val()
    $('.players').append(playerView.$el);
    $(this).val("");
    if (counter === 1) {
      $('#xName').text(name);
      xName = name;
    }
    else {
      $('#oName').text(name);
      oName = name;
      $('#player-input').remove();
      $('.square').removeClass('inactive');
      $('#player-entry').remove();
      $('#enter').remove();
      $('#message').show();
      $('#points').show();
    }
  }
})

initialize();
game.square();
