$(document).ready(function(){
    $("#subcolors").click(function(){
        var first = $("#first").val();
        var second = $("#second").val();
        var third = $("third").val();
        $.ajax({
            type:"GET",
            url:"php/getStrainCage.php",
            data: {first: first, second: second, third:third},
            success: function(){
            alert("success")
        }
        })
    })

})
