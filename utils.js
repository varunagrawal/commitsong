function request(url, type, data, onSuccess, onError, contentType){

    var contentType = contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
    
    if(contentType == 'application/json'){
	data = JSON.stringify(data);
    }

    $.ajax({
	type: type,
	url: url,
	headers: { 'Accept': 'application/vnd.github.v3+json', 
		   'Origin': 'http://www.varunagrawal.github.io'
		 },
	crossDomain: true,
	contentType: contentType,
	data: data,
	dataType: 'json',
	statusCode: {
	    404: function(){alert("Not found")},
	},
	error: onError,
	success: onSuccess
    });

}

function getQueryStringParameters(){

    var result = {};
    var searchIndex = document.URL.indexOf("?");
    if (searchIndex == -1 ) return result;
    var sPageURL = document.URL.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {       
        var sParameterName = sURLVariables[i].split('=');      
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

function loadMIDI(){

    MIDI.loadPlugin({
	soundfontUrl: "./MIDI.js/soundfont/",
	instrument: "distortion_guitar",
	callback: function(){
	}
    });

}
