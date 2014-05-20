$( document ).ready( function(){
    $("#login").click( function(){
	login();
    });
    main();
});

function main(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/varunagrawal", false);
    xhr.send();
    
    var obj = jQuery.parseJSON(xhr.responseText);

    $("#github").html(xhr.responseText + obj.name);
};

function login(){
    window.location.replace("https://github.com/login/oauth/authorize?client_id=b0cdce6d049d97e8d1b3&redirect_uri=http://varunagrawal.github.io/commitsong/&scope=user,user:email,public_repo,repo:status")
  //  window.open("login","Github login","width=550,height=170,left=150,top=200,toolbar=0,status=0");
};

