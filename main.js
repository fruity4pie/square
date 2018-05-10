let anim1, anim2, canvas, ctx;

function stop()  {
     clearInterval(anim1);
     clearInterval(anim2);
     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
}

function play() {
  requestAnimationFrame(animate);
}

function animate() {
  let score = document.getElementById('score');
  let count = 1;

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  function Square (x, y, w, h) {
  	this.x = Math.random() * canvas.width;
  	this.y = y;
    this.w = w;
    this.h = h;
    this.rgba = "#" + Math.round(Math.random() * 9) + Math.round(Math.random() * 9) + Math.round(Math.random() * 9);

    this.draw = function() {
      ctx.fillStyle = this.rgba;
      ctx.fillRect(this.x, this.y, 20, 20);
      this.update();
    }

    this.update = function() {
      this.y += Math.random() * 3;
    }
  }

  let squares = [];

  function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    for(i = 0; i < squares.length; i++)
        squares[i].draw();
    update();
  }

  function update() {
    for (var i = 0; i < squares.length; i++) {
      squares[i].update();
    }
  }

  anim1 = setInterval(function(){

    squares.push(new Square(0, 0, 20, 20))
  },1000);

  anim2 = setInterval(draw, 20);

    var isCursorInSquares = function(x, y, squares) {
    return  x > squares.x && x < squares.x + squares.w + 8 &&
            y > squares.y && y < squares.y + squares.h + 20;
    }

  canvas.onclick = function(e) {
    var x = e.pageX;
        y = e.pageY;

    for(var i = squares.length - 1; i >= 0; --i){
      if(isCursorInSquares(x, y, squares[i])) {
        delete squares.splice(i, 1);
        score.innerHTML = count++;
      }
    }
  }

  let clearSquares = (function() {
    score.innerHTML = 0;
    count = 0;
  })();
}

document.body.onload = () => {
  let startBtn = document.getElementById('start');
  let stopBtn = document.getElementById('stop');

  startBtn.addEventListener('click', play);
  stopBtn.addEventListener('click', stop);
}