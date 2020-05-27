var h3 = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var generate = document.querySelector(".generate");

color1.addEventListener("input", setColor);
color2.addEventListener("input", setColor);
// generate.addEventListener("click", generateBackground);
generate.onclick = generateBackground;

generateBackground();

function setColor(){
	var style = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
	document.body.style.background = style;
	h3.textContent = style + ";";
}

function generateBackground(){
	var nColor1 = generateColor();
	var nColor2 = generateColor();
	color1.value = nColor1;
	color2.value = nColor2;
	setColor();
}

function generateColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}