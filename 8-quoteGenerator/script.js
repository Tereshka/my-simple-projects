var setupLine = document.getElementById("text");
var punchlineLine = document.getElementById("author");

function getJoke(){
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

	var res = fetch(proxyurl + url)
		.then( response => response.json())
		.then( s => {
			setupLine.textContent = s.quoteText;
			punchlineLine.textContent = "-"+s.quoteAuthor;
		})
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
}

function updateTweet() {
    var quote = setupLine.textContent;
    var author = punchlineLine.textContent;
    document.getElementById("tweet_btn").setAttribute("href", "https://twitter.com/intent/tweet?text=" + quote + "%0a--- " + author);
}

getJoke();