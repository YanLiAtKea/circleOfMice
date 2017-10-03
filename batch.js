$(document).ready(function(){
    $("#batch").click(function(){
        var firstNr = $("#firstNr").val();
        var lastNr = $("#lastNr").val();
        var strain = $("#strain").val();
        var cageName = $("#cageName").val();
        $.ajax({
            type:"GET",
            url:"php/batchpair.php",
            data: {firstNr: firstNr, lastNr: lastNr, strain:strain, cageName:cageName},
            success: function(result){
            alert(result);
        }
        })
    })

});
