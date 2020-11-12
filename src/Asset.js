(function (ns) {
  var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,
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

    load: function () {
      var resources = [{
          id: "battleCity",
          src: "images/battleCity.png"
        },
        {
          id: "bonus",
          src: "images/bonus.png"
        },
        {
          id: "bore",
          src: "images/bore.png"
        },
        {
          id: "bullet",
          src: "images/bullet.png"
        },
        {
          id: "enemy",
          src: "images/enemy.png"
        },
        {
          id: "explode1",
          src: "images/explode1.png"
        },
        {
          id: "explode2",
          src: "images/explode2.png"
        },
        {
          id: "flag",
          src: "images/flag.png"
        },
        {
          id: "gameover",
          src: "images/gameover.png"
        },
        {
          id: "misc",
          src: "images/misc.png"
        },
        {
          id: "num",
          src: "images/num.png"
        },
        {
          id: "pctanke",
          src: "images/pctanke.png"
        },
        {
          id: "player1",
          src: "images/player1.png"
        },
        {
          id: "player2",
          src: "images/player2.png"
        },
        {
          id: "shield",
          src: "images/shield.png"
        },
        {
          id: "splash",
          src: "images/splash.png"
        },
        {
          id: "tile",
          src: "images/tile.png"
        }
      ];

      this.queue = new Hilo.LoadQueue();
      this.queue.add(resources);
      this.queue.on('complete', this.onComplete.bind(this));
      this.queue.start();
    },

    onComplete: function (e) {
      this.battleCity = this.queue.get("battleCity").content
      this.bonus = this.queue.get("bonus").content
      this.bore = this.queue.get("bore").content
      this.bullet = this.queue.get("bullet").content
      this.enemy = this.queue.get("enemy").content
      this.explode1 = this.queue.get("explode1").content
      this.explode2 = this.queue.get("explode2").content
      this.flag = this.queue.get("flag").content
      this.gameover = this.queue.get("gameover").content
      this.misc = this.queue.get("misc").content
      this.num = this.queue.get("num").content
      this.pctanke = this.queue.get("pctanke").content
      this.player1 = this.queue.get("player1").content
      this.player2 = this.queue.get("player2").content
      this.shield = this.queue.get("shield").content
      this.splash = this.queue.get("splash").content
      this.tile = this.queue.get("tile").content

      this.play1Atlas = new Hilo.TextureAtlas({
        image: this.queue.get('player1').content,
        frames: [
          [0, 0, 16, 16],
          [16, 0, 16, 16],
          [0, 16, 16, 16],
          [16, 16, 16, 16],
          [0, 32, 16, 16],
          [16, 32, 16, 16],
          [0, 48, 16, 16],
          [16, 48, 16, 16]
        ],
        sprites: {
          up: [0, 1],
          right: [2, 3],
          down: [4, 5],
          left: [6, 7]
        }
      });

      this.play2Atlas = new Hilo.TextureAtlas({
        image: this.queue.get('player2').content,
        frames: [
          [0, 0, 16, 16],
          [16, 0, 16, 16],
          [0, 16, 16, 16],
          [16, 16, 16, 16],
          [0, 32, 16, 16],
          [16, 32, 16, 16],
          [0, 48, 16, 16],
          [16, 48, 16, 16]
        ],
        sprites: {
          up: [0, 1],
          right: [2, 3],
          down: [4, 5],
          left: [6, 7]
        }
      });

      this.queue.off('complete');
      this.fire('complete');
    }
  });

})(window.game);