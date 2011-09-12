(function(){
var resource_loader = new loader.Loader('gfx/'),
    gfx = resource_loader.resources,
    canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    input = new inputhandler.InputHandler(canvas),
    timer = new clock.Clock();

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';

resource_loader.onready = function () {
    timer.start();
    if(window.start) window.start();
}
resource_loader.load(['spark.png', 'logo.png']);

window.timer = timer;
window.gfx = gfx;
window.input = input;
window.ctx = ctx;
window.canvas = canvas;

})();
