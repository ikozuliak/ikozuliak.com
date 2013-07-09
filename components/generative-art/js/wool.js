var n = 4000;
var bd = 70;
var sp = 0.005;
var sl = .92;
var COLOURS = [ '#E3EB64', '#A7EBCA', '#FFFFFF', '#D8EBA7', '#868E80' ];


var mouseX = 0,
    mouseY = 0,
    pmouseX = 0,
    pmouseY = 0,
    w, h;

var cells = [];

var ctx = Sketch.create({

    container:document.getElementById('hairy-container'),
    retina:true,
    autoclear:true,
    interval:1,

    draw:function () {
        ctx.translate(ctx.width / 4, ctx.height / 4);

        ctx.strokeStyle = 'rgba(0, 0, 0, .9)';

        for (var i = 0; i < n; i++)
            cells[i].sense();
        ctx.stroke();

    },

    setup:function () {

        w = ctx.width / 2;
        h = ctx.height / 2;

        ctx.lineWidth = 1;

        for (var i = 0; i < n; i++) {
            var a = i + this.getRandom(0, PI / 5);
            var r = ((i / n) * (w / 2) * (((n - i) / n) * 3)) + this.getRandom(-3, 3) + 100;
            cells[i] = new Cell(parseInt(r * cos(a)) + (w / 2), parseInt(r * sin(a)) + (h / 2));
        }
    },




    touchmove: function( e ) {

        for ( var i = ctx.touches.length - 1, touch; i >= 0; i-- ) {

            touch = ctx.touches[i];


            pmouseX = touch.ox - w/2;
            pmouseY = touch.oy - h/2;

            mouseX = touch.x - w/2;
            mouseY = touch.y- h/2;
        }
    },


    mousedown:function () {

        for (var i = 0; i < n; i++)
            cells[i].c = 0;

    },

    getRandom:function (min, max) {
        return Math.floor(Math.random() * max) + min;
    }
});

function Cell(x, y) {
    this.init(x, y)
}


Cell.prototype = {

    init:function (x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;

        this.s = 0; // spin velocity
        this.c = 0; // current angle
    },
    sense:function () {
        if (pmouseX != 0 || pmouseY != 0)
            this.s += sp * det(this.x, this.y, pmouseX, pmouseY, mouseX, mouseY) / (dist(this.x, this.y, mouseX, mouseY));
        this.s *= sl;
        this.c += this.s;
        var d = bd * this.s + .001;

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + d * Math.cos(this.c), this.y + d * Math.sin(this.c));
    }

}

function det(x1, y1, x2, y2, x3, y3) {
    return ((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

ctx.start();
