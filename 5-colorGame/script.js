var size = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisp = document.querySelector("h1");
var mes = document.querySelector("#message");
var reset = document.querySelector("#reset");
var mode = document.querySelectorAll(".mode");

init();

reset.addEventListener("click", function(){
	resetColors();
});

function init(){
	setMode();
	setSquares();
	resetColors();
}

function changeColor(color){
	for(var i=0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var a = Math.floor(Math.random()*colors.length);
	return colors[a];
}

function generateRandomColors(size){
	var arr = [];
	for(var i=0; i<size; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb(" + r +", " + g + ", " +b + ")";
}

function resetColors(){
	reset.textContent = "New colors";
	mes.textContent = "";
	colors = generateRandomColors(size);
	pickedColor = pickColor();
	colorDisp.textContent = pickedColor;
	document.querySelector("header").style.backgroundColor = document.body.style.backgroundColor;

	for(var i=0; i<squares.length; i++){
		if (colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
}

function setMode(){
	for(var i=0; i<mode.length; i++){
		mode[i].addEventListener("click", function(){
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "EASY" ? size = 3 : size = 6;
			resetColors();
		});
	}
}

function setSquares(){
	for(var i=0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor){
				mes.textContent = "Correct!";
				reset.textContent = "Play Again?";
				changeColor(pickedColor);
				document.querySelector("header").style.backgroundColor = pickedColor;
			} else {
				this.style.backgroundColor = document.body.style.backgroundColor;
				mes.textContent = "It was " + clickedColor + ". Try again!";
			}
		});
	}
}