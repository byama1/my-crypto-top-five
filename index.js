function getCoinMarketApi(){
	const coinmarketApiUrl="https://api.coinmarketcap.com/v2/ticker/";

	$.getJSON(coinmarketApiUrl,{
		start:"1",
		sort:"rank",
		limit:"5"


	}).done(function(data){
		console.log(data);
		//let newobject = [];
		//let newvalue = [];
		let newdata= data.data;
		//console.log(newdata);
		generateCryptoHtml(newdata);

		//$.each(newdata, function(index, value){
			
			//newobject.push(newdata[index]);
			//newvalue.push(this);
			//console.log("name : "+this.name);
			
			//getNewsApi(this.name);

		//});
	}).fail(function(){
		console.log("coinmarketApiUrl call failed");
	});
};

function getNewsApi(searchTerm){
	const newsApiUrl="https://newsapi.org/v2/everything";
	console.log('getNewsApi Ran ' + searchTerm);
	$.getJSON(newsApiUrl,{
		//sources:"reddit-r-all",
		q: `crypto AND ${searchTerm}`,
		sortBy:"publishedAt",
		language:"en",
		apiKey: "a8d8e6d69d8d44c99ada67accf928222"
	}).done(function(data){
		console.log(data);
		let newobject = data.articles;
		console.log(newobject);
		//console.log(searchTerm);
		generateNewsHtml(newobject);
	}).fail(function(){
		console.log("news api call failed")
	});	
};

function generateCryptoHtml(data){
	//console.log(data);
	let cryptoHtml;
	console.log("generateCryptoHtml ran");
	$.each(data, function(index, value){
			
			//newobject.push(newdata[index]);
			//newvalue.push(this);
			//console.log("name : "+this.name);

		cryptoHtml += `
			
			<div class="crypto-container">
				<div>
					<p id="cryptoName" >${this.name}</p>
				</div>
			
				<div>
					<p>Crypto Symbol: ${this.symbol}</p>
				</div>
				
				<div>
					<p>Price:$${this.quotes.USD.price}</p>
				</div>
				
				<div>
				<p>rank: ${this.rank}</p>
				</div>
			</div>
		`;		
	});
	//console.log(cryptoHtml);
	renderCryptoHtml(cryptoHtml);
	
}

function renderCryptoHtml(data){
	console.log("renderCryptoHtml ran");
	//console.log(data);
	$('.js-crypto-info').html(data);
}
function generateNewsHtml(data){
	let newsHtml;
	console.log("generateNewsHtml ran");
	console.log(data);
	
	$.each(data, function(index, value){
		newsHtml += `
			<div class="news-container">
				<div>
					<p>${this.description}</p>
					<a href="${this.url}">${this.title}</a>
				</div>
			</div>

		`;
	});

	renderNewsHtml(newsHtml);
}
function renderNewsHtml(data){
	console.log("renderNewsHtml ran");
	console.log(data);
	$('.js-news-info').html(data);
}

function watchClick(){
	getCoinMarketApi();
	$('.js-crypto-info').on('click', '.crypto-container', function(event){
	//let names = this.text();
	let names = ($(this).find("#cryptoName").text());
	console.log(names);
	console.log("watchClick ran");
	getNewsApi(names);
	});
}

$(watchClick);

// $(function(){
// 	const newsApiUrl="https://newsapi.org/v2/top-headlines";
	
// 	$.getJSON(newsApiUrl,{
// 		q: "bitcoin",
// 		apiKey: "a8d8e6d69d8d44c99ada67accf928222"
// 	}).done(function(data){
// 		console.log(data);
// 	}).fail(function(){
// 		console.log("news api call failed")
// 	});	
// });
