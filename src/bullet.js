(function (ns) {

  var Bullet = ns.Bullet = Hilo.Class.create({
    Extends: Hilo.Bitmap,
    directionToIndex: {
      up: 0,
      right: 1,
      down: 2,
      left: 3
    },
    directionToXY: {
      up: (box, startX, startY) => {
        box.x = startX + (window.game.sw - 6) / 2;
        box.y = startY - 6 - 1;
      },
      right: (box, startX, startY) => {
        box.x = startX + window.game.sw + 1;
        box.y = startY + (window.game.sw - 6) / 2;
      },
      down: (box, startX, startY) => {
        box.x = startX + (window.game.sw - 6) / 2;
        box.y = startY + window.game.sw + 1;
      },
      left: (box, startX, startY) => {
        box.x = startX - 6 - 1;
        box.y = startY + (window.game.sw - 6) / 2;
      }
    },
    constructor: function (properties) {
      Bullet.superclass.constructor.call(this, properties);

      this.properties = properties;
      this.width = 6;
      this.height = 6;

      this.directionToXY[this.direction](this, this.startX, this.startY)

      var frame = this.properties.atlas.getFrame(this.directionToIndex[this.direction]);
      this.setImage(frame.image, frame.rect);
    },

    startX: 0, //起始x坐标
    startY: 0, //起始y坐标
    velocity: 2, //速度

    isDead: false, //是否已死亡
    direction: 'up', //方向 up down left right

    getReady: function () {

    },

    onDead: function () {
      this.isDead = true;

      if (this.properties.tank) {
        this.properties.tank.bullerCurrentCount--;
      }

      this.removeFromParent();
    },

    onUpdate: function () {
      if (this.isDead) {
        return;
      }

      if (this.hitTestObject(window.game.player1, true)) {
        this.onDead();
        window.game.player1.onDead();
        return;
      }

      if (this.hitTestObject(window.game.player2, true)) {
        this.onDead();
        return;
      }

      if (isContain[this.direction](this, this.velocity, window.game.background)) {
        this.onDead();
        return;
      }

      directionMove[this.direction](this, this.velocity);
    }
  });

})(window.game);