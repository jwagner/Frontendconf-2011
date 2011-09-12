var particles = [];

// base +/- range
function fuzzy(range, base){
    return (base||0) + (Math.random()-0.5)*range*2
}

input.onClick = function(x, y){
    for(var i = 0; i < 1000; i++){
        var angle = fuzzy(Math.PI, Math.PI),
            velocity = fuzzy(50, 50);
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle)*velocity,
            vy: Math.sin(angle)*velocity,
            age: fuzzy(5, 5),
        });
    }
}

timer.ontick = function(td) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.globalCompositeOperation = 'lighter';
    for(var i = 0; i < particles.length; i++){
        var p = particles[i];
        if(p.age > 10) continue;
        p.x += p.vx * td;
        p.y += p.vy * td;
        ctx.globalAlpha = 1.0 - p.age/10;
        ctx.drawImage(gfx['spark.png'], p.x, p.y);
        p.age += td;
    }
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
}
