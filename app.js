var win = Ti.UI.createWindow({
	backgroundColor: "#fff"
});

var button = Ti.UI.createButton({
	title: 'Search!',
	top: 10,
	left: 170,
	height: 40,
	width: 100
});

var input = Ti.UI.createTextField({
	color: '#111',
	height: 40,
	width: 150,
	top: 10,
	left: 10,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

button.addEventListener("click", function(e){
	// get geolocation
	var lat, lon;
	Titanium.Geolocation.getCurrentPosition(function(e){
		lat = e.coords.latitude;
		lon = e.coords.longitude;
	});
	var lat2 = lat+1;
	var lon2 = lon+1;
	var latlon = lat+","+lon+","+lat2+","+lon2;
	var q = "?locations="+latlon+"&replies=all";
	
	// do request to twitter stream
	if(q.length == 0){
		alert("Please enter text to search!");
		return;
	}
	var url = "https://username:password@stream.twitter.com/1/statuses/filter.json"; // please change username:password
	var xhr = Titanium.Network.createHTTPClient({
		onload: function(){
			alert(this.responseText);
		},
		onerror:function(e){
			alert(this.statusText);
		}
	});
	xhr.open("GET",url+q);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // Twitter: not sending X-Requested-With header
	xhr.send();
});

win.add(button);
win.add(input);

win.open();
