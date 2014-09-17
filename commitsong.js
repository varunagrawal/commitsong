$( document ).ready( function(){
    
    var size = moment().diff(moment().subtract(1, 'years').subtract(1, 'days'), 'days');
    var commitData = getYearArray(size);

    alert(size);

    getRepos('varunagrawal', commits(commitData), errorMessage);
    //displayRepos("Varun");

});

function commits(commitData){ 
    return function(repodata){
	//getCommits('varunagrawal', 'commitsong', display(commitData), errorMessage, '2014-09-15T01:09:12+05:30');
	//getCommits('varunagrawal', 'Novella', display(commitData), errorMessage, '2013-09-17T01:09:12+05:30');

	var user = 'varunagrawal';
	for(var i=0; i< repodata.length; i++){
	    //alert(data[i].name);
	    getCommits(user, repodata[i].name, display(commitData), errorMessage, moment().subtract(1, 'years').format());//'2013-09-17T01:09:12+05:30');
	  
	}
    }
}

function display(commitData){
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

function getCommits(username, repo, onSuccess, onError, since){
    request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {author: username, since: since}, onSuccess, onError);
}


function getYearArray(size){
    var arr = []
    for(var i=0; i<size; i++) arr[i] = 0;

    return arr;
}
