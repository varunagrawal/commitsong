$( document ).ready( function(){

    login();
    //test();
    /*
      $("#login").click( function(){
	login();
    });
    
    var result = getURLParameters(document.URL);
    alert(result["code"]);

    if(result["code"] != null)
    {
	TOKEN = getToken(result["code"]);
	alert(TOKEN);

	main();
    }*/
});

function test(){
    request("https://api.github.com", 'GET', {varun: 'AGRAWAL'}, function(response){alert(response.data.current_user_url)}, function(){alert("test error")})
}

function main(token){
};

function getToken(code){
    var xhr = new XMLHttpRequest();
    
    $.ajax({
	type: "POST",
	url: "https://github.com/login/oauth/access_token?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code + "redirect_uri=http://varunagrawal.github.io/commitsong/",
	data: { foo: 'bar' },
	beforeSend: function(xhr) {
	    xhr.setRequestHeader("Origin", "http://varunagrawal.github.io/commitsong/");
	}
    })
	.success(function(){alert("success")})
	.error(function(){alert("error")});

    /*xhr.open("POST", "https://github.com/login/oauth/access_token?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code + "redirect_uri=http://varunagrawal.github.io/commitsong/", false);

    xhr.setRequestHeader("Origin", "https://varunagrawal.github.io/commitsong/");
    xhr.send();
    
    var arr = xhr.responseText;
    var res = $.map( arr, function(n, i){
	return n.split("=");
    });

    var result = null;
    for(var i=0; i<res.length; i++){
	if(res[i] == "code"){
	    result = res[i+1];
	}
    }
    
    return result;*/
}
