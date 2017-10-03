function getData(pairCageName) {
    var posing = $.post("php/script.php",{
        pairCageName:pairCageName

    } );
    posting.done(function(data){
        alert(data);


    });

    posting.fail(function(){
        alert("failed");
    })
}

$(document).ready(function(){
   getData("A")

});
