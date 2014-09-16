$( document ).ready( function(){

    getRepos('varunagrawal', commits, errorMessage);
    //displayRepos("Varun");

});

function commits(data){
    getCommits('varunagrawal', data[0].name, display, errorMessage);
    /*for(var i=0; i< data.length; i++){
	alert(data[i].name);

    }*/
}

function display(data){
    $('#data').text(JSON.stringify(data));
}

function errorMessage(){
    alert("Worst error message ever!!");
}

var githubAPI = "https://api.github.com"

function getRepos(username, onSuccess, onError){
    request(githubAPI + "/users/" + username + "/repos", 'GET', {}, onSuccess, onError);
}

function getCommits(username, repo, onSuccess, onError){
    request(githubAPI + "/repos/" + username + "/" + repo + "/commits", 'GET', {}, onSuccess, onError);
}
