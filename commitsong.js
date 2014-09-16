$( document ).ready( function(){
    
    var size = moment().diff(moment().subtract(1, 'years'), 'days');
	
    var commitData = getYearArray(size);

    getRepos('varunagrawal', commits(commitData), errorMessage);
    //displayRepos("Varun");

});

var commits = function(commitData){ 
    return function(data){
	getCommits('varunagrawal', 'ShowOfHands', display(commitData), errorMessage, 'varunagrawal', '2013-09-17T01:09:12+05:30');
	getCommits('varunagrawal', 'Novella', display(commitData), errorMessage, 'varunagrawal', '2013-09-17T01:09:12+05:30');
	/*for(var i=0; i< data.length; i++){
	  alert(data[i].name);
	  
	}*/
    }
}

var display = function(commitData){
    return function(data){
	
	var now = moment();
	var oneYearAgo = moment().subtract(1, 'years'); 
	
	var size = now.diff(oneYearAgo, 'days');
	//commitData = commitData || getYearArray(size);
	
	for(var i=0; i<data.length; i++){
	    
	    var commitDate = moment(data[i].commit.committer.date);
	    if(commitDate.isBefore(now) && commitDate.isAfter(oneYearAgo)){
		//alert(commitDate.diff(oneYearAgo, 'days'));
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

function getCommits(username, repo, onSuccess, onError, author, since){
    request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {author: author, since: since}, onSuccess, onError);
}


function getYearArray(size){
    var arr = []
    for(var i=0; i<size; i++) arr[i] = 0;

    return arr;
}
