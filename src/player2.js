(function (ns) {

    var Player2 = ns.Player2 = Hilo.Class.create({
        Extends: Hilo.Sprite,
        constructor: function (properties) {
            Player2.superclass.constructor.call(this, properties);

            this.properties = properties;
            this.addFrame(this.properties.atlas.getSprite('up')).stop();
        },

        startX: 0, //起始x坐标
        startY: 0, //起始y坐标
        velocity: 1, //速度

        isRun: false,
        isDead: true, //是否已死亡
        direction: 'up', //方向 up down left right

        getReady: function () {
            this.isDead = false;
            this.isRun = false;
            //设置起始坐标
            this.x = this.startX;
            this.y = this.startY;
        },

        start: function (direction) {
            this.isRun = true;

            if (this.direction !== direction) {
                this.direction = direction;
                this.setFrame(this.properties.atlas.getSprite(this.direction));
            }

            this.play();
        },
        end: function (direction) {
            if (this.direction === direction) {
                this.isRun = false;
            }
        },
        onUpdate: function () {
            if (this.isDead || !this.isRun) {
                this.stop();
                return;
            }

            if (isContain[this.direction](this, this.velocity, window.game.background) ||
                isHit[this.direction](this, this.velocity, window.game.player1)) {
                return;
            }

            directionMove[this.direction](this, this.velocity);
        }
    });

})(window.game);