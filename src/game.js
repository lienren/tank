(function () {
  window.onload = function () {
    game.init();
  };

  var game = window.game = {
    sw: 16,
    width: 0,
    height: 0,

    asset: null,
    stage: null,
    ticker: null,
    state: null,

    level: 1,
    levelText: null,

    background: null,
    battleCity: null,
    bonus: null,
    bore: null,
    bullet: null,
    enemy: null,
    explode1: null,
    explode2: null,
    flag: null,
    gameover: null,
    misc: null,
    num: null,
    pctanke: null,
    player1: null,
    player2: null,
    shield: null,
    splash: null,
    tile: null,

    player1KeyToDirection: {
      87: 'up',
      83: 'down',
      65: 'left',
      68: 'right'
    },

    player2KeyToDirection: {
      38: 'up',
      40: 'down',
      37: 'left',
      39: 'right'
    },

    init: function () {
      this.asset = new game.Asset();
      this.asset.on('complete', function (e) {
        this.asset.off('complete');
        this.initStage();
      }.bind(this));
      this.asset.load();
    },

    initStage: function () {
      this.width = Math.min(innerWidth, this.sw * 16);
      this.height = Math.min(innerHeight, this.sw * 14);
      this.scale = 2;

      //舞台画布
      var renderType = location.search.indexOf('dom') != -1 ? 'dom' : 'canvas';

      //舞台
      this.stage = new Hilo.Stage({
        renderType: renderType,
        width: this.width,
        height: this.height,
        scaleX: this.scale,
        scaleY: this.scale,
        background: '#74706F'
      });
      document.body.appendChild(this.stage.canvas);

      //启动计时器
      this.ticker = new Hilo.Ticker(60);
      this.ticker.addTick(Hilo.Tween);
      this.ticker.addTick(this.stage);
      this.ticker.start(true);

      //按键控制
      if (document.addEventListener) {
        document.addEventListener('keydown', function (e) {
          this.onUserInput(e)
        }.bind(this));
        document.addEventListener('keyup', function (e) {
          this.onUserOutput(e)
        }.bind(this));
      } else {
        document.attachEvent('onkeydown', function (e) {
          this.onUserInput(e)
        }.bind(this));
        document.addEventListener('onkeyup', function (e) {
          this.onUserOutput(e)
        }.bind(this));
      }

      this.initBackground();
      this.initPlay();
      this.initLevel();

      //准备游戏
      this.gameReady();
    },
    initBackground: function () {
      let w = 13 * this.sw;
      let h = 13 * this.sw;
      this.background = new game.Background({
        id: 'background',
        x: 1 * this.sw,
        y: 0.5 * this.sw,
        width: w,
        height: h
      }).addTo(this.stage);
    },
    initPlay: function () {
      this.player1 = new game.Player1({
        id: 'player1',
        atlas: this.asset.play1Atlas,
        startX: this.background.width >> 1,
        startY: this.background.height >> 1,
      }).addTo(this.stage);

      this.player2 = new game.Player2({
        id: 'player2',
        atlas: this.asset.play2Atlas,
        startX: 100 + this.background.width >> 1,
        startY: this.background.height >> 1,
      }).addTo(this.stage);
    },
    initLevel: function () {
      this.flag = new Hilo.Bitmap({
        id: 'flag',
        image: this.asset.flag,
        x: this.width - 1.5 * this.sw,
        y: this.height - 3 * this.sw,
        width: this.asset.flag.width,
        height: this.asset.flag.height
      }).addTo(this.stage);

      this.levelText = new Hilo.Text({
        id: 'level',
        text: this.level,
        x: this.width - 1.5 * this.sw,
        y: this.height - 2 * this.sw + 2,
        width: this.sw,
        height: this.sw,
        textAlign: 'left',
        textVAlign: 'middle'
      }).addTo(this.stage);
    },
    onUserInput: function (e) {
      if (this.player1KeyToDirection[e.keyCode]) {
        this.player1.start(this.player1KeyToDirection[e.keyCode]);
      }

      if (this.player2KeyToDirection[e.keyCode]) {
        this.player2.start(this.player2KeyToDirection[e.keyCode]);
      }
    },
    onUserOutput: function (e) {
      if (this.player1KeyToDirection[e.keyCode]) {
        this.player1.end(this.player1KeyToDirection[e.keyCode]);
      }

      if (this.player2KeyToDirection[e.keyCode]) {
        this.player2.end(this.player2KeyToDirection[e.keyCode]);
      }
    },
    gameReady: function () {
      this.player1.getReady()
      this.player2.getReady()
    }
  };
})();

const isContain = {
  up: ({
    y
  }, velocity, box) => {
    return y - velocity < box.y;
  },
  down: ({
    y,
    height
  }, velocity, box) => {
    return y + height + velocity > box.y + box.height;
  },
  left: ({
    x
  }, velocity, box) => {
    return x - velocity < box.x;
  },
  right: ({
    x,
    width
  }, velocity, box) => {
    return x + width + velocity > box.x + box.width;
  }
}

const isHit = {
  up: ({
    x,
    y,
    width,
    height
  }, velocity, box) => {
    return x < box.x + box.width && box.x < x + width &&
      y - velocity < box.y + box.height && box.y < y - velocity + height;
  },
  down: ({
    x,
    y,
    width,
    height
  }, velocity, box) => {
    return x < box.x + box.width && box.x < x + width &&
      y + velocity < box.y + box.height && box.y < y + velocity + height;
  },
  left: ({
    x,
    y,
    width,
    height
  }, velocity, box) => {
    return x - velocity < box.x + box.width && box.x < x - velocity + width &&
      y < box.y + box.height && box.y < y + height;
  },
  right: ({
    x,
    y,
    width,
    height
  }, velocity, box) => {
    return x + velocity < box.x + box.width && box.x < x + velocity + width &&
      y < box.y + box.height && box.y < y + height;
  }
}

const directionMove = {
  up: (box, velocity) => {
    box.y -= velocity;
  },
  down: (box, velocity) => {
    box.y += velocity;
  },
  left: (box, velocity) => {
    box.x -= velocity;
  },
  right: (box, velocity) => {
    box.x += velocity;
  }
};