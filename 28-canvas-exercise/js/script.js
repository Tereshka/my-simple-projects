const colors = [ '#f93b3b', '#3f51b5', '#4caf50', '#ffeb3b', '#000000'];
let canvasStars = null;
let canvasColor = null;
let ctxStars = null;
let ctxColor = null;
let text = null;

function main() {
  text = document.querySelector('#text');
  canvasStars = document.getElementById("stars");
  canvasColor = document.getElementById("color");
  ctxStars = canvasStars.getContext("2d");
  ctxColor = canvasColor.getContext("2d");

  // fill big canvas with white color
  ctxStars.fillStyle = '#ffffff';
  ctxStars.fillRect(0, 0, 600, 600);

  // draw 5 stars
  for (let i = 0; i < colors.length; i++) {
    drawStar(colors[i], 50 + 100 * i, 50, 5, 30, 15);
  }

  // add click listener for canvas with stars
  canvasStars.addEventListener('click', (e) => {
    const mousePos = {
      x: e.clientX - canvasStars.offsetLeft,
      y: e.clientY - canvasStars.offsetTop
    };

    const pixel = ctxStars.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    ctxColor.fillStyle = color;
    ctxColor.fillRect(0, 0, 600, 50);
    text.textContent = `You clicked on ${color} color`;
   });
}

function drawStar(color, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctxStars.beginPath();
  ctxStars.moveTo(cx, cy - outerRadius)
  for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctxStars.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctxStars.lineTo(x, y)
      rot += step
  }
  ctxStars.lineTo(cx, cy - outerRadius)
  ctxStars.closePath();
  ctxStars.lineWidth = 5;
  ctxStars.fillStyle = color;
  ctxStars.fill();
}