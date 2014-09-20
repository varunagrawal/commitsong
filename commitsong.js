$( document ).ready( function(){
    
    loadMIDI(sampleData, ["acoustic_grand_piano"]);
    
    var size = moment().diff(moment().subtract(1, 'years').subtract(1, 'days'), 'days');
    var commitData = getYearArray(size);

    alert(size);

    //getRepos('varunagrawal', commits(commitData), errorMessage);
    //displayRepos("Varun");

});

function commits(commitData){ 
    return function(repodata){
	//getCommits('varunagrawal', 'commitsong', display(commitData), errorMessage, '2014-09-15T01:09:12+05:30');
	//getCommits('varunagrawal', 'Novella', display(commitData), errorMessage, '2013-09-17T01:09:12+05:30');

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
	
	$('#data').text(commitData);
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
    $('#data').text("loading MIDI with instrument " + instruments);

    MIDI.loader = new widgets.Loader("Setting up the mix!!");
       
    MIDI.loadPlugin({
	soundfontUrl: "./MIDI.js/soundfont/",
	instrument: instruments,
	callback: startPlaying(commitData)
    });

}

function startPlaying(commitData){
    return function(){
	$('#data').text("loaded MIDI");
	var notes = scale(commitData);
	MIDI.loader.stop();
	play(notes);

    }
}


function play(notes){

    $('#data').text("Playing!!!");
    alert(notes[0]);
    //MIDI.programChange(0, 0);
    MIDI.setVolume(0, 127);
    var velocity = 127;
    var delay = 2;

    for(var i=0; i<notes.length; i++){
	MIDI.noteOn(0, notes[i], velocity);
	MIDI.noteOff(0, notes[i], delay);
    }

    alert("done");

    /*setTimeout(function(){
	MIDI.noteOff(0, 74, 0);
	alert("done");
    }, 250);*/
}


var sampleData = [2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,2,0,4,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1,0,5,0,0,0,2,0,2,0,0,8,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,6,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,3,1,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1,0,0,0,21,4,1,4,0];
