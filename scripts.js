const userAction = async (username) => {
  document.getElementById("error-message").style.opacity = "0";
  document.getElementById("input-container-container").style.transform = "translate(0%, 45vh)";
  document.getElementsByClassName("infoText")[0].style.position = "absolute";
  document.getElementById("displayContainerContainer").style.opacity = "0";
  // document.getElementById("displayContainerContainer").style.display = "none";
  document.getElementById("displayContainer").innerHTML = "<div id='heHim'>						<div class='header'>							He/Him						</div>						<div class='stats'>							21% <br> Total: 30						</div>						<div class='list'>						</div>					</div>					<div id='heThey'>						<div class='header'>							He/They						</div>						<div class='stats'>							21% <br> Total: 30						</div>						<div class='list'>						</div>					</div>					<div id='sheHer'>						<div class='header'>							She/Her						</div>						<div class='stats'>							21% <br> Total: 30						</div>						<div class='list'>						</div>					</div>					<div id='sheThey'>						<div class='header'>							She/They						</div>						<div class='stats'>							21% <br> Total: 30						</div>						<div class='list'>						</div>					</div>					<div id='theyThem'>						<div class='header'>							They/Them						</div>						<div class='stats'>							21% <br> Total: 30						</div>						<div class='list'>						</div>					</div>"
  //^ listen do u think i give a shit anymore? 
  const response = await fetch('https://pronoun-percent.herokuapp.com/api/Thestickman391/api/' + username, {
  // const response = await fetch('http://localhost:8080/api/' + 'Thestickman391' + '.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
  if(myJson.twitterReply != null)
  {
	console.log(myJson.twitterReply.errors[0].message);
	document.getElementById("error-message").innerHTML = myJson.twitterReply.errors[0].message;
	document.getElementById("error-message").style.opacity = "1";
  } else {
	  // do something with myJson
	  // console.log(myJson[0].sheThey.length);
	  
	  var heHim = myJson[0].heHim ?? 0;
	  var heThey = myJson[0].heThey ?? 0;
	  var sheThey = myJson[0].sheThey ?? 0;
	  var sheHer = myJson[0].sheHer ?? 0;
	  var theyThem = myJson[0].theyThem ?? 0;
	  var nothing = myJson[0].nothing ?? 0;  
	  
	  var heHimLength = heHim.length ?? 0;
	  var heTheyLength = heThey.length ?? 0;
	  var sheTheyLength = sheThey.length ?? 0;
	  var sheHerLength = sheHer.length ?? 0;
	  var theyThemLength = theyThem.length ?? 0;
	  var nothingLength = nothing.length ?? 0;
	  
	  var totalFollowed = heHimLength + heTheyLength + sheTheyLength + sheHerLength + theyThemLength + nothingLength;
	  console.log(totalFollowed);
	  if((totalFollowed - nothingLength) <= 0)
	  {
		document.getElementById("error-message").innerHTML = "No data to display!";
		document.getElementById("error-message").style.opacity = "1";
	  } else {
	  
		   var fruits = [heHim, heThey, sheThey, sheHer, theyThem];
		   var fruitStrings = ["heHim", "heThey", "sheThey", "sheHer", "theyThem"];
		   var fruitsLength = [heHimLength, heTheyLength, sheTheyLength, sheHerLength, theyThemLength];
		  
		  
		  for (var i = 0; i < fruits.length; i++) {
			  document.getElementById(fruitStrings[i]).getElementsByClassName("stats")[0].innerHTML = ((fruitsLength[i] / totalFollowed) * 100).toFixed(1) + '%<br>Total: ' + fruitsLength[i];
		  }
		  
		  for (var i = 0; i < fruits.length; i++) {
			  for (var j = 0; j < (fruitsLength[i]); j++) {
				item = document.createElement('div');
				item.className = fruits[i][j].screen_name;
				// item.style.width = "338px";
					
				document.getElementById(fruitStrings[i]).getElementsByClassName("list")[0].appendChild(item);
				
				var usernameClass = document.getElementsByClassName(fruits[i][j].screen_name)[0];
				
				var pfp = document.createElement("div");
				pfp.className = "pfp";
				// usernameClass.appendChild(pfp);
				
				var img = document.createElement("img");
				img.src = fruits[i][j].profile_image_url_https;
				
				usernameClass.appendChild(img);
				
				var div = document.createElement("div");
				div.innerHTML = fruits[i][j].screen_name;
				div.className = "name";
				
				usernameClass.appendChild(div);	
				
				//document.getElementsByClassName('NeilCicOOC')[0].appendChild(name);
			  }
		  }
		  finished();
	  }
  }
}

function finished() {
	document.getElementById("input-container-container").style.transform = "translate(0%, 0%)";
	document.getElementById("displayContainerContainer").style.display = "flex";
	setTimeout(function(){ 
		document.getElementsByClassName("infoText")[0].style.position = "";
		document.getElementById("displayContainerContainer").style.opacity = "1";
	}, 1000);
}

// userAction('Thestickman391');
document.getElementsByClassName("infoText")[0].style.position = "absolute";
document.getElementById("displayContainerContainer").style.display = "none";

