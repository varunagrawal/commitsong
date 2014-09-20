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

function loadMIDI(commitData, instruments){
    $('#data').text("loading MIDI with instrument " + instr);

    MIDI.loader = new widgets.Loader("Setting up the mix!!");
       
    MIDI.loadPlugin({
	soundfontUrl: "./MIDI.js/soundfont/",
	instrument: instr,
	callback: startPlaying(commitData)
    });

}

function startPlaying(commitData){
    return function(){
	$('#data').text("loaded MIDI");
	var notes = scaleData(commitData);
	MIDI.loader.stop();
	play(notes);

    }
}

function scale(commitData){
    alert(commitData);

    var min = commitData[0], max = commitData[0];
    for(var i=0; i<commitData.length; i++){
	if(min > commitData[i])
	    min = commitData[i];
	if(max < commitData[i])
	    max = commitData[i];
    }

    var notes = commitData;
    for(var i=0; i<notes.length; i++){
	// 108 - 21 is the range of MIDI notes.
	notes[i] = parseInt( (108-21) * commitData / (max - min) );
    }

    return notes;
}

function play(notes){

    //MIDI.programChange(0, 0);
    MIDI.setVolume(0, 127);
    var velocity = 127;
    var delay = 1.0;

    for(let note of notes){    // foreach loop in JS
	MIDI.noteOn(0, note, velocity, 0);
	MIDI.noteOff(0, note, delay);
    }

    /*setTimeout(function(){
	MIDI.noteOff(0, 74, 0);
	alert("done");
    }, 250);*/
}
