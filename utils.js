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


function scale(commitData){

    var min = commitData[0], max = commitData[0];
    for(var i=0; i<commitData.length; i++){
	if(min > commitData[i])
	    min = commitData[i];
	if(max < commitData[i])
	    max = commitData[i];
    }

    if(max == min)
    {
	max = min + 1;
    }

    var notes = commitData;
    for(var i=0; i<notes.length; i++){

	// 108 - 21 is the range of MIDI notes.
	notes[i] = ((108-21) * (commitData[i] - min) / (max - min)) + 21;

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
