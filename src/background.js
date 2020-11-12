(function (ns) {

  var Background = ns.Background = Hilo.Class.create({
    Extends: Hilo.Graphics,
    constructor: function (properties) {
      Background.superclass.constructor.call(this, properties);

      this.drawRect(0, 0, this.width, this.height).beginFill('#000').endFill();
    }
  });

})(window.game);