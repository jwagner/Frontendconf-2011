// 29a.ch/@
// 29a.ch/+

var particles = [],
    color = 'rgb(8, 2, 2)';

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
    var new_particles = [];
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
        ctx.strokeStyle = color;
        ctx.stroke();
        if(p.age < 1000){
            new_particles.push(p);
        }
    }
    particles = new_particles;
}

function download(){
    _gaq.push(['_trackEvent', 'fc11', 'download']);

    try {
        var img = canvas.toDataURL('image/jpeg', 0.9);
    } catch(e) {
        var img = canvas.toDataURL();
    }

    window.open(img);
}


function share(){
    _gaq.push(['_trackEvent', 'fc11', 'share']);


    try {
        var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
    } catch(e) {
        var img = canvas.toDataURL().split(',')[1];
    }
    var w = window.open();
    w.document.write('Uploading...');
    $.ajax({
        url: 'http://api.imgur.com/2/upload.json',
        type: 'POST',
        data: {
            type: 'base64',
            key: '48c16073663cb7d3befd1c2c064dfa0d',
            name: 'neon.jpg',
            title: 'test title',
            caption: 'test caption',
            image: img
        },
        dataType: 'json'
    }).success(function(data) {
        w.location.href = data['upload']['links']['imgur_page'];
    }).error(function() {
        alert('Could not reach api.imgur.com. Sorry :(');
        w.close();
    });
}

function clear(){
    _gaq.push(['_trackEvent', 'fc11', 'clear']);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



$('#colors li').click(function() {
    $('#colors li').removeClass('active');
    $(this).addClass('active');
});
