(function (ns) {

    var Player1 = ns.Player1 = Hilo.Class.create({
        Extends: Hilo.Sprite,
        constructor: function (properties) {
            Player1.superclass.constructor.call(this, properties);

            this.properties = properties;
            this.addFrame(this.properties.atlas.getSprite('up')).stop();
        },

        startX: 0, //起始x坐标
        startY: 0, //起始y坐标
        velocity: 1, //速度

        isRun: false,
        isDead: true, //是否已死亡
        direction: 'up', //方向 up down left right

        bullerCount: 0,
        bullerCurrentCount: 0,

        getReady: function () {
            this.isDead = false;
            this.isRun = false;
            //设置起始坐标
            this.x = this.startX;
            this.y = this.startY;
            this.interval = 6;

            this.initAudio();
        },

        initAudio: function () {
            this.runAudio = Hilo.WebSound.getAudio({
                src: 'misc/自己移动.mp3',
                loop: false,
                volume: 1
            }).on('load', function (e) {}).on('end', function (e) {});

            this.attackAudio = Hilo.WebSound.getAudio({
                src: 'misc/开始攻击.mp3',
                loop: false,
                volume: 1
            }).on('load', function (e) {}).on('end', function (e) {});
        },

        start: function (direction) {
            this.isRun = true;

            if (this.direction !== direction) {
                this.direction = direction;
                this.setFrame(this.properties.atlas.getSprite(this.direction));
            }

            this.play();
            this.runAudio.play();
        },

        end: function (direction) {
            if (this.direction === direction) {
                this.isRun = false;
                this.runAudio.stop();
            }
        },

        onAttack: function () {
            if (this.bullerCurrentCount < 2) {
                this.bullerCount++;
                this.bullerCurrentCount++;
                this.buller = new window.game.Bullet({
                    id: 'buller_' + this.bullerCount,
                    atlas: window.game.asset.bulletAtlas,
                    startX: this.x,
                    startY: this.y,
                    direction: this.direction,
                    tank: this
                }).addTo(window.game.stage);
                this.attackAudio.play();
            }
        },

        onDead: function () {
            this.isRun = false;
            this.isDead = true;

            this.setFrame(this.properties.explode.getSprite('boom')).play();
        },

        onUpdate: function () {
            if (this.isDead || !this.isRun) {
                this.stop();
                return;
            }

            if (isContain[this.direction](this, this.velocity, window.game.background) ||
                isHit[this.direction](this, this.velocity, window.game.player2)) {
                return;
            }

            directionMove[this.direction](this, this.velocity);
        }
    });

})(window.game);