var n = 100;
var r = 0.1;
var s = 0;
var w, h;

var mouseX = 1000,
    mouseY = 1000;

var ctx = Sketch.create({

    container:document.getElementById('warpko-container'),
    retina:true,
    autoclear:false,
    interval : 1,

    draw:function () {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.globalCompositeOperation = 'source-over';
        for (var y = 1; y < n; y++)
            for (var x = 1; x < n; x++) {
                this.line(this.f(x, y), this.f(x - 1, y));
            }
        ctx.stroke();
    },

    setup:function () {
        ctx.translate(ctx.width/2, ctx.height/2);

        w = ctx.width/2;
        h = ctx.height/2;
        ctx.lineWidth = 1;
    },



    line:function (p1, p2) {
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
    },

    f:function (ix, iy) {
        var x = this.map(ix, 0, n - 1, -1, 1) * this.getRandom(1 - r, 1 + r);
        var y = this.map(iy, 0, n - 1, -1, 1) * this.getRandom(1 - r, 1 + r);
        var a = (mouseX*150 - w) / (w + h);
        var b = (mouseY*150 - h) / (w + h);
        var d = x * x + y * y;
        var array = [];
        array[0] = (x * a + y * b) / d;
        array[1] = (x * b - y * a) / d;
        return array;
    },

    mousemove:function (e) {

        mouseX = e.layerX;
        mouseY = e.layerY;
    },

    mousedown: function(){
        ctx.clear();
        ctx.translate(ctx.width/2, ctx.height/2);

    },

    map:function (value, istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
    },

    getRandom:function (min, max) {
        return Math.floor(Math.random() * max) + min;
    }

});

ctx.start();
