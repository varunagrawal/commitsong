CLIENT_ID = "b0cdce6d049d97e8d1b3";
CLIENT_SECRET = "109e825552093e60fab8810fd59c8855d4740bfa";
TOKEN = null;

$( document ).ready( function(){
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
    }
});

function main(token){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/user", false);
    xhr.send();
    
    var obj = jQuery.parseJSON(xhr.responseText);

    $("#github").html(xhr.responseText + obj.name);
};

function login(){
    window.location.replace("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&redirect_uri=http://varunagrawal.github.io/commitsong/&scope=user,user:email,public_repo,repo:status")
};


function getURLParameters(url){

    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1 ) return result;
    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {       
        var sParameterName = sURLVariables[i].split('=');      
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

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
