$( document ).ready( function(){

    //var notes = scale(sampleData);
    //$('#activity').text(sampleData);
    //loadMIDI(sampleData, ["acoustic_grand_piano"]);

    bindEvents();

    /*$('.ui.sidebar').sidebar({
	overlay: true
    })
    .sidebar('toggle');*/

});

function bindEvents(){
    $('#play').on("click", start);
}

function start(){
    $('#start').css("display", "none");

    var user = $('#username').text(); 
    
    //MIDI.loader = new widgets.Loader("Setting up the mix!!");
    $('#repoloading').css('display', 'block');
    //notification("Loading repositories!");

    getUser(user);
}

var githubAPI = "https://api.github.com"

function getUser(username){
    request(githubAPI + "/users/" + username, 'GET', {}, true, getAllRepos, errorMessage);
}

function getAllRepos(user){

    var pages = (user.public_repos / 100) + 1 | 0;

    var commitData = createCommitArray();
    
    var last = false;

    for(var i=0; i<pages; i++){
	console.log("page: " + i);
	
	if(i+1 == pages)
	    last = true;
	
	getRepos(user.login, i+1, commitData, last);
    }	
}

function getRepos(username, page, commitData, last){
    request(githubAPI + "/users/" + username + "/repos", 'GET', {page: page, per_page: 100}, true, repos(commitData, last), errorMessage);
}

function repos(commitData, lastPage){
    return function(repodata){

	var user = $('#username').text(); 
	
	var oneYearAgo = moment().subtract(1, 'years');
	oneYearAgo = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);

	var last = false;

	for(var i=0; i<repodata.length; i++){

	    var commits = [];

	    var page = 1;

	    do{
		commits = jQuery.parseJSON(getCommits(user, repodata[i].name, oneYearAgo.format(), page, commitData));
		page += 1;

		loadCommits(commitData, commits);
	    }
	    while(commits.length > 0);

	    if(lastPage && i === repodata.length - 1){
		last = true;
	    }
	   
	    //getCommits(user, repodata[i].name, display(commitData), errorMessage, oneYearAgo.format());
	    //'2013-09-17T01:09:12+05:30'
	}

	if(last){
	    // Got all the commit data, now load the instruments and play!
	    var instruments = getInstruments();
	    loadMIDI(commitData, instruments);
	}

    }
}

function getCommits(username, repo, since, page, commitData){
   
    return request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {author: username, since: since, per_page:100, page: page}, false);

    //request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {author: username, since: since, per_page:100, page: page}, false, loadCommits(commitData, last), errorMessage);
    //request(githubAPI + "/repos/" + username + "/" + repo + "/stats/commit_activity", 'GET', {}, loadCommits(commitData), errorMessage);
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

function showActivity(val){
    $('#activity').text(val);
}

function loadCommits(commitData, data){

	var now = moment();    // current moment in datetime
	var oneYearAgo = moment().subtract(1, 'years');    // datetime one year ago
	oneYearAgo = moment([oneYearAgo.year(), oneYearAgo.month(), oneYearAgo.date()]);    // midnight one year ago. Midnight will be the standard time for comparison

	for(var i=0; i<data.length; i++){
	    
	    var commitDate = moment(data[i].commit.committer.date);
	    //notification(commitDate);
	    commitDate = moment([commitDate.year(), commitDate.month(), commitDate.date()]); // commit date with time as midnight of that date
	
	    // get number of days since commitDate and oneYearAgo with both dates having time as midnight. -1 is for array indexing.
	    commitData[commitDate.diff(oneYearAgo, 'days')-1] += 1;
	}

	//notification(commitData);
	
	/*if(lastDone){
	    $('#repoloading').css('display', 'none');
	    
	    var instruments = getInstruments();
	    loadMIDI(commitData, instruments);
	}*/
}

function getInstruments(){
    return ["acoustic_grand_piano"];
}

function loadMIDI(data, instruments){

    //notification("loading MIDI with instrument " + instruments);

    MIDI.loadPlugin({
	soundfontUrl: "./MIDI.js/soundfont/",
	instrument: instruments,
	callback: startPlaying(data)
    });

}

function startPlaying(data){
    return function(){
	//notification(notes);
	play(data);
    }
}

function playNote(val, note){
    return function(){
	var velocity = 127;	

	showActivity(val);
	MIDI.noteOn(0, note, velocity, 0);
	MIDI.noteOff(0, note, 0.125);
	console.log("note is " + note);

    }
}


function play(data){

    //MIDI.loader.stop();
    $('#repoloading').css('display', 'none');

    var notes = scale(data);
    //notification(notes);
    //notification("Playing!!!");

    //MIDI.programChange(0, 0);
    MIDI.setVolume(0, 127);

    for(var i=0; i<notes.length; i++){
	var delay = i * 250;    // delay is in milliseconds

	//MIDI.noteOn(0, notes[i], velocity, delay);
	//MIDI.noteOff(0, notes[i], delay);
	
	console.log("delay " + delay);

	setTimeout(playNote(data.slice(0, i+1), notes[i]), delay);
    }

    /*setTimeout(function(){
	MIDI.noteOff(0, 74, 0);
	alert("done");
    }, 250);*/
}

function errorMessage(err){
    alert("Oops! Something went wrong!");
    notification(JSON.stringify(err));
}


var sampleData = [2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,2,0,4,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1,0,5,0,0,0,2,0,2,0,0,8,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,6,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,3,1,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,1,0,0,0,21,4,1,4,0];
