var COLOURS = [ '#E3EB64', '#A7EBCA', '#FFFFFF', '#D8EBA7', '#868E80' ];
var radius = 0;
var mouseX = 0;
var mouseY = 400;
var deg = Math.PI / 180;

var ctx = Sketch.create({

    container: document.getElementById( 'container' ),
    autoclear: true,
    retina: true    ,
    fullscreen: true,

    draw:function () {
        ctx.translate(ctx.width/2+1, ctx.height-150);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 150)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 0.5;
        ctx.branch(150);
        ctx.stroke();
    },

    setup:function () {



    },

    update:function () {

    },

    mousemove:function (e) {

        mouseX = e.layerX;
        mouseY = e.layerY;
    },

    getRandom: function(min,max){
        return Math.floor(Math.random()*max) + min;
    },


    branch:function (h) {
        h *= 0.6 + (mouseY / 4000);

        if (h > 15) {
            rotation = 30 * deg + (mouseX / 5000);

            ctx.save();
            ctx.rotate(rotation);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -h);
            ctx.translate(0, -h);

            ctx.branch(h);

            ctx.restore();
            ctx.save();

            ctx.rotate(-rotation);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -h);
            ctx.translate(0, -h);
            ctx.branch(h);

            ctx.restore();

        }
    }
});

ctx.start();
