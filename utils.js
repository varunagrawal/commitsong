function request(url, type, data, onSuccess, onError){
    $.ajax({
	type: type,
	url: url,
	headers: { 'Accept': 'application/vnd.github.v3+json', 'Origin': 'http://www.varunagrawal.me' },
	crossDomain: true,
	dataType: 'jsonp',
	async: false,
	data: data,
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

var state = getNonce();
function login(){

    var redirect_uri = "http://varunagrawal.github.io/commitsong/authenticated.html";

    window.location.replace("https://github.com/login/oauth/authorize?client_id=" + getClientID() + "&redirect_uri=" + redirect_uri + "&scope=user,user:email,public_repo,repo:status&state=" + state);
    
}

function authorize(){
    //if(result['state'] == state)
    var result = getQueryStringParameters();

    var url = "https://github.com/login/oauth/access_token";
    var data = { client_id: getClientID(), client_secret: getClientSecret(), code: result.code, redirect_uri: "http://varunagrawal.github.io/commitsong/"}
    
    request(url, 'POST', data, alert(getQueryStringParameters().access_token), alert("error"));
    
}

function getNonce(){
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
	randomstring += chars.substring(rnum,rnum+1);
    }
    
    return randomstring;
}

function getClientID(){
    var CLIENT_ID = "b0cdce6d049d97e8d1b3";
    return CLIENT_ID;
}

function getClientSecret(){
    CLIENT_SECRET = "109e825552093e60fab8810fd59c8855d4740bfa";
    TOKEN = null;
    return CLIENT_SECRET;
}
