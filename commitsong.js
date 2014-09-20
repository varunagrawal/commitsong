$( document ).ready( function(){

    MIDI.loader = new widgets.Loader("Setting up the mix!!");

    //var notes = scale(sampleData);
    //$('#data').text(notes);
    loadMIDI(sampleData, ["acoustic_grand_piano"]);
    
    //getRepos('varunagrawal', commits(commitData), errorMessage);
    //displayRepos("Varun");

});

function commits(commitData){ 
    return function(repodata){

	var user = 'varunagrawal';
	for(var i=0; i< repodata.length; i++){
	    getCommits(user, repodata[i].name, display(commitData), errorMessage, moment().subtract(1, 'years').format());//'2013-09-17T01:09:12+05:30');
	  
	}
    }
}

function display(commitData){
    return function(data){
	
	var now = moment();
	var oneYearAgo = moment().subtract(1, 'years'); 
	
	var size = now.diff(oneYearAgo, 'days');
	
	for(var i=0; i<data.length; i++){
	    
	    var commitDate = moment(data[i].commit.committer.date);
	    if(commitDate.isBefore(now) && commitDate.isAfter(oneYearAgo)){
		commitData[commitDate.diff(oneYearAgo, 'days')] += 1;
	    }
	    
	}
	
	notification(commitData);
    }
}

function errorMessage(){
    alert("Worst error message ever!!");
}

var githubAPI = "https://api.github.com"

function getRepos(username, onSuccess, onError){
    request(githubAPI + "/users/" + username + "/repos", 'GET', {}, onSuccess, onError);
}

function getCommits(username, repo, onSuccess, onError, since){
    request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {author: username, since: since}, onSuccess, onError);
}

function loadMIDI(commitData, instruments){
    notification("loading MIDI with instrument " + instruments);
       
    MIDI.loadPlugin({
	soundfontUrl: "./MIDI.js/soundfont/",
	instrument: instruments,
	callback: startPlaying(commitData)
    });

}

function startPlaying(commitData){
    return function(){

	notification("loaded MIDI");

	var notes = scale(commitData);
	MIDI.loader.stop();
	play(notes);

    }
}


function play(notes){

    notification("Playing!!!");

    //MIDI.programChange(0, 0);
    MIDI.setVolume(0, 127);
    var velocity = 127;

    for(var i=0; i<notes.length; i++){
	var delay = i / 4;

	MIDI.noteOn(0, notes[i], velocity, delay);
	MIDI.noteOff(0, notes[i], delay);
    }

    /*setTimeout(function(){
	MIDI.noteOff(0, 74, 0);
	alert("done");
    }, 250);*/
}


var sampleData = [2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,2,0,4,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1,0,5,0,0,0,2,0,2,0,0,8,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,6,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,3,1,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1,0,0,0,21,4,1,4,0];
