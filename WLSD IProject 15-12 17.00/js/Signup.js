
function validate(){

    if( !document.forms['myform'].username.value.replace(/\s+/, '') || !document.forms['myform'].password.value.replace(/\s+/, '' ).length ) {
         alert( "Password and username required" );
         return false;
    }

    else{
        window.location = "index.html";
    }
}