// Global var to hold data returned from JSON package
var data;

$(document).ready(function() {
  var xmlhttp = new XMLHttpRequest();
  var url = "data.txt";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var config = JSON.parse(this.responseText);
      data = config;
      createSoundboard(config, 0, 'full');
    }
    else if (this.status == 404) {
      console.log(this.status + ': ' + this.statusText);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
});

function switchTheme(css_theme) {
  var numLinkI, strLinkTag;

  objLinkTag = document.getElementsByTagName("link");
    
  for (numLinkI=0; numLinkI<objLinkTag.length; numLinkI++){
    if(objLinkTag[numLinkI].rel.indexOf("stylesheet") != -1 && objLinkTag[numLinkI].title) {

      objLinkTag[numLinkI].disabled = true;
    }
        
    if(objLinkTag[numLinkI].title == css_theme) {
      objLinkTag[numLinkI].disabled = false;
    }
  }
}

function createSoundboard(config, theme, compORrich) {
	// Clear all previous HTML, if any.
	jQuery('#soundBoard div').html('');
	
	document.getElementsByTagName("h1")[0].innerHTML = config[theme].boardName;

	var strSB1 = "<div class=\"col-md-4 col-sm-6 soundThumb\"><img src=\"../img/";
	var strSB2 = "\"height=\"150\" width=\"150\" alt=\"";
	var strSB3 = "\"><h3>";
	var strSB4 = "</h3><audio controls><source src=\"../sounds/";
	var strSB5 = "\" type=\"";
	var strSB6 = "></audio></div>";
	var strWAV = "audio/wav\"";
	var strMP3 = "audio/mpeg\"";
	var substrWAV = "wav";
	var substrMP3 = "mp3";
	var strSB = "";
	var strSBfinal =  "";

	if(compORrich === 'compact'){
    makeCompactSB(config, theme, strSB4, strSB5, strSB6, substrWAV, strWAV, substrMP3, strMP3);
    return;
  }

  else if (compORrich === 'full') {
  	for(i = 0; i < 12; i++) {
			strSB = "";
			strSBfinal = "";

  		if (config[theme].sounds[i].indexOf(substrWAV) !== -1){
  			strSB = strSB1 + config[theme].imgs[i]
      	+ strSB2 + config[theme].names[i]
       	+ strSB3 + config[theme].names[i]
				+ strSB4 + config[theme].sounds[i]
				+ strSB5 + strWAV + strSB6;
   		}
      
      else if (config[theme].sounds[i].indexOf(substrMP3) !== -1){
      	strSB = strSB1 + config[theme].imgs[i]
       	+ strSB2 + config[theme].names[i]
        + strSB3 + config[theme].names[i]
        + strSB4 + config[theme].sounds[i]
				+ strSB5 + strMP3+strSB6;
			}
        
      else {
      	console.log("Error: this sound doesn't exist.");
      }
      
      console.log(i);
      strSBfinal = strSBfinal + strSB;
      $('#soundBoard').append(strSBfinal);
    }
	}
}

/* makeCompactSB(config) takes a theme data structure and parses it to generate a column of sounds withouth the images */
function makeCompactSB(config, theme, str4, str5, str6, subWAV, strWAV, subMP3, strMP3){
  var strCSB1 = "<center><h3>";
  var strCSB  ="";
  var strCSBfinal = "";
  var numCI;
  for (numCI = 0; numCI < 12; numCI++){
      if (config[theme].sounds[numCI].indexOf(subWAV) !== -1){
          strCSB = strCSB1+config[theme].names[numCI]
                 + str4   +config[theme].sounds[numCI]
                 + str5   +strWAV +str6;
      }
      else if (config[theme].sounds[numCI].indexOf(subMP3) !== -1){
          strCSB = strCSB1+config[theme].names[numCI]
                 + str4   +config[theme].sounds[numCI]
                 + str5   +strMP3 +str6;
      }
      else {
          console.log("Error: this sound doesn't exist.");
      }
      strCSBfinal = strCSBfinal + strCSB + "</center>";
  }
  $('#soundBoard').append(strCSBfinal);   
}

// Helper function to change soundboard data
function makeSoundboard(theme, format) {

  createSoundboard(data, theme, format);
}	