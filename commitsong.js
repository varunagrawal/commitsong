$( document ).ready( function(){

    //var notes = scale(sampleData);
    //$('#data').text(notes);
    //loadMIDI(sampleData, ["acoustic_grand_piano"]);

    bindEvents();
    
});

function bindEvents(){
    $('#play').on("click", start);
}

function start(){
    $('#start').css("display", "none");

    var user = $('#username').text(); 
    getRepos(user, repos, errorMessage);
}

function repos(repodata){ 

    var user = $('#username').text(); 

    if(repodata.length == 0 && "message" in repodata)
	notification("Invalid Github Id.");
    else{
	
	var oneYearAgo = moment().subtract(1, 'years');
	oneYearAgo = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);
	
	var commitData = createCommitArray();
	var last = false;
	
	for(var i=0; i<repodata.length; i++){

	    if(i == repodata.length-1)
		last = true;

	    getCommits(user, repodata[i].name, loadCommits(commitData, last), errorMessage, oneYearAgo.format());
	    
	    //getCommits(user, repodata[i].name, display(commitData), errorMessage, oneYearAgo.format());
	    //'2013-09-17T01:09:12+05:30'
	}
	
	//notification(commitData);    
    }
}

function createCommitArray(){
    var oneYearAgo = moment().subtract(1, 'years');
    oneYearAgo = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);  // date one year ago with time as midnight
    
    var now = moment();
    var today = moment([now.year(), now.month(), now.date()]); // today's date with time as midnight
    
    var size = today.diff(oneYearAgo, 'days');
    //var size = moment().diff(moment().subtract(1, 'years').subtract(1, 'days');

    var commitData = getYearArray(size);

    return commitData;
}

function display(commitData){
    return function(data){
	
	var now = moment();    // current moment in datetime
	var oneYearAgo = moment().subtract(1, 'years');    // datetime one year ago
	oneYearAgo = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);    // midnight one year ago. Midnight will be the standard time for comparison
	//var day = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);
	//var previousDay = day;
	//previousDay.subtract(1, 'days'); 

	//var today = moment([now.year(), now.month(), now.date()]);

	//var size = today.diff(oneYearAgo, 'days');

	for(var i=0; i<data.length; i++){
	    
	    var commitDate = moment(data[i].commit.committer.date);
	    commitDate = moment([commitDate.year(), commitDate.month(), commitDate.date()]); // commit date with time as midnight of that date
	
	    // get number of days since commitDate and oneYearAgo with both dates having time as midnight. -1 is for array indexing.
	    commitData[commitDate.diff(oneYearAgo, 'days')-1] += 1;

	    /*
	    if(commitDate.isBefore(day) && commitDate.isAfter(previousDay)){
		commitData[day.diff(oneYearAgo, 'days')] += 1;

		previousDay.add(1, 'days');
		day.add(1, 'days');
	    }*/
	    
	}
	
	//notification(commitData);
    }
}

function showActivity(val){
    $('#activity').text(val);
}

function loadCommits(commitData, last){
    return function(data){

	var now = moment();    // current moment in datetime
	var oneYearAgo = moment().subtract(1, 'years');    // datetime one year ago
	oneYearAgo = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);    // midnight one year ago. Midnight will be the standard time for comparison

	for(var i=0; i<data.length; i++){
	    
	    var commitDate = moment(data[i].commit.committer.date);
	    commitDate = moment([commitDate.year(), commitDate.month(), commitDate.date()]); // commit date with time as midnight of that date
	
	    // get number of days since commitDate and oneYearAgo with both dates having time as midnight. -1 is for array indexing.
	    commitData[commitDate.diff(oneYearAgo, 'days')-1] += 1;
	}
	
	if(last){
	    var instruments = getInstruments();
	    loadMIDI(commitData, instruments);
	}

    }
}

function getInstruments(){
    return ["acoustic_grand_piano"];
}

function startPlaying(data){
    return function(){
	//notification(notes);
	play(data);
    }
}

function loadMIDI(data, instruments){

    //notification("loading MIDI with instrument " + instruments);
    MIDI.loader = new widgets.Loader("Setting up the mix!!");

    MIDI.loadPlugin({
	soundfontUrl: "./MIDI.js/soundfont/",
	instrument: instruments,
	callback: startPlaying(data)
    });

}

function play(data){

    MIDI.loader.stop();

    var notes = scale(data);
    //notification(notes);
    //notification("Playing!!!");

    //MIDI.programChange(0, 0);
    MIDI.setVolume(0, 127);

    var velocity = 127;

    for(var i=0; i<notes.length; i++){
	var delay = i * 250;    // delay is in milliseconds

	//MIDI.noteOn(0, notes[i], velocity, delay);
	//MIDI.noteOff(0, notes[i], delay);
	
	console.log("delay " + delay);

	setTimeout(function(){
	    showActivity(data[i]);
	    MIDI.noteOn(0, notes[i], velocity, 0);
	    console.log("note is " + notes[i]);
	}, delay);
    }

    /*setTimeout(function(){
	MIDI.noteOff(0, 74, 0);
	alert("done");
    }, 250);*/
}

function errorMessage(){
    alert("Worst error message ever!!");
}

var githubAPI = "https://api.github.com"

function getRepos(username, onSuccess, onError){
    request(githubAPI + "/users/" + username + "/repos", 'GET', {}, onSuccess, onError);
}

function getCommits(username, repo, onSuccess, onError, since){
    request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {author: username, since: since, per_page:200}, onSuccess, onError);
}



var sampleData = [2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,2,0,4,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1,0,5,0,0,0,2,0,2,0,0,8,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,6,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,3,1,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1,0,0,0,21,4,1,4,0];
