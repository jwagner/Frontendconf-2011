// 29a.ch/@
// 29a.ch/+

var particles = [];

input.onClick = function (x, y) {
    for (var i = 0; i < 10; i++) {
        var alpha = Math.random()*Math.PI*2,
            distance = Math.random();
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(alpha)*distance,
            vy: Math.sin(alpha)*distance,
            age: 0
        });
    }
}

function start() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

timer.ontick = function(td) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'white';
    for(var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var alpha = Math.random()*Math.PI*2,
            distance = Math.random();

        p.vx = p.vx*0.9+Math.cos(alpha)*distance;
        p.vy = p.vy*0.9+Math.sin(alpha)*distance;

        p.x += p.vx;
        p.y += p.vy;
        p.age += 1;
        
        var radius = 10/(p.age/100);

        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.strokeStyle = 'rgb(8, 2, 2)';
        ctx.stroke();
    }
}
