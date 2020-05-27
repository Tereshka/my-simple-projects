const proxyurl = "https://cors-anywhere.herokuapp.com/";
var urlEnglish = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
var urlRussian = "https://ru.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
var urlRandomEn = "https://en.wikipedia.org/wiki/Special:Random";
var urlRandomRu = "https://ru.wikipedia.org/wiki/Special:Random";
var urlItemEn = "https://en.wikipedia.org/?curid="
var urlItemRu = "https://ru.wikipedia.org/?curid="

var content = document.getElementById("search");
var divData = document.getElementById("data");
var randomButton = document.getElementById("random");

var url;
var urlItem;
var urlRandom;

function setUrls(){
	if(document.querySelector(".active").textContent === "EN"){
		url = urlEnglish;
		urlItem = urlItemEn;
		urlRandom = urlRandomEn;
	} else {
		url = urlRussian;
		urlItem = urlItemRu;
		urlRandom = urlRandomRu;
	}
}

function randomArticle(){
	setUrls();

	randomButton.setAttribute("href", urlRandom);
	randomButton.setAttribute("target", "_blank");
	window.open(urlRandom,'_blank');
}

function searchContent(){
	divData.innerHTML = "";
	

	setUrls();

	var res = fetch(proxyurl + url  + content.value)
	.then(response => response.json())
	.then(s => {
		var q = s.query.pages;
		console.log(q);

		for (var key in q) {
			var obj = q[key];

			let img = document.createElement("img");
		//	img.setAttribute("class", "card-img-left");
		//	img.setAttribute("width", "150px");
		//	img.setAttribute("src", obj.hasOwnProperty("thumbnail") ? obj.thumbnail.source : "");

			let h2 = document.createElement("h2");
			h2.setAttribute("class", "card-title");
			h2.innerHTML = `<a target="_blank" href="` + urlItem + obj.pageid +`">` + obj.title +`</a>`;
			let p = document.createElement("p");
			p.setAttribute("class", "card-text");
			p.textContent = obj.extract;

			let divB = document.createElement("div");
			divB.setAttribute("class", "card-body");
			divB.append(h2, p);

			let divC = document.createElement("div");
			divC.setAttribute("class", "card m-2 flex-row flex-wrap");

			divC.append(img, divB);
			divData.append(divC);
		}

	})
	.catch((err) => console.log(err + "Can't access " + url  + content.value + " response. Blocked by browser?"));
}

function clearData(){
	if(content.value === ''){
		divData.innerHTML = "";
	}
}