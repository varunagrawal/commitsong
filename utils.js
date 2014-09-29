function request(url, type, data, async, onSuccess, onError, contentType){

    var contentType = contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
    if(contentType == 'application/json'){
	data = JSON.stringify(data);
    }

    if(async){
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
		403: function(){ notification("Rate limit exceeded!\nPlease wait for a while and try again."); },
		404: function(){alert("Not found")}
	    },
	    error: onError,
	    success: onSuccess
	});
    }
    else{
	return $.ajax({
	    type: type,
	    url: url,
	    async: false,
	    headers: { 'Accept': 'application/vnd.github.v3+json', 
		       'Origin': 'http://www.varunagrawal.github.io'
		     },
	    crossDomain: true,
	    contentType: contentType,
	    data: data,
	    dataType: 'json',
	    statusCode: {
		403: function(){ notification("Rate limit exceeded!\nPlease wait for a while and try again."); },
		404: function(){alert("Not found")}
	    },
	    error: onError,
	    success: onSuccess
	}).responseText;
    }

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


function scale(data){

    var min = data[0], max = data[0];
    for(var i=0; i<data.length; i++){
	if(min > data[i])
	    min = data[i];
	if(max < data[i])
	    max = data[i];
    }

    if(max == min)
    {
	max = min + 1;
    }

    var notes = new Array(data.length);
    for(var i=0; i<notes.length; i++){

	// 108 - 21 is the range of MIDI notes.
	notes[i] = ((108-21) * (data[i] - min) / (max - min)) + 21;

	notes[i] = notes[i] | 0;    // Shortcut to get int from double
    }

    return notes;
}

function getYearArray(size){
    var arr = []
    for(var i=0; i<size; i++) arr[i] = 0;

    return arr;
}

function notification(value){
    $('#data').text(value);
}


function forbidden(){
    //alert("forbidden");
    notification("Rate limit exceeded!\nPlease wait for a while and try again.");
}
