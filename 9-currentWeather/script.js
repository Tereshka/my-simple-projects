const proxyurl = "https://cors-anywhere.herokuapp.com/";
var url = "https://fcc-weather-api.glitch.me/api/current?";
var divWeather = document.getElementById("data_main");
var icon = document.getElementById("icon");
var temperature = document.getElementById("temperature");
var wind = document.getElementById("wind");
var place = document.getElementById("place");

var latitude;
var longitude;

getPosition();

function getPosition(){
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {

		getWeather(position.coords.latitude, position.coords.longitude);
	  	console.log("1= " + position.coords.latitude + " " + position.coords.longitude);

	  });
	}
}


function getWeather(lat, long){

	console.log("2= " + latitude + " " + longitude);

	var res = fetch(proxyurl + url + "lat=" + lat + "&lon=" + long)
		.then( response => response.json())
		.then( s => {
			console.log(s);
			place.textContent = s.name + ", " + s.sys.country;
			icon.setAttribute("src", s.weather[0].icon);
			divWeather.textContent = s.weather[0].main;
			temperature.textContent = s.main.temp + "° C";
			wind.textContent = s.wind.speed + "m/s";

		})
		.catch(() => console.log("Can't access " + url + " response. Blocked by browser?"));
} 

