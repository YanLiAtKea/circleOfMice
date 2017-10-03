//show login or logout based on session
$(document).ready(function(){
    $("div#logoutDiv").hide();
    $("div#loginDiv").hide();
    $.ajax({
        url: "php/checkUser.php",
    }).done(function(user){
        if(user.indexOf('nobody')>-1){
            $("div#loginDiv").show();
        } else {
            $("div#logoutDiv").show();
            $("span#logout").html(user);
        }
    });
});

//log in slide
//maybe click is better than mouseenter and leave
$(document).ready(function(){
    $("form#login").on("mouseenter", function(){
        $("form#login").animate({right: "3"},"fast");
        $("input#username").focus();
    });
    $("form#login").on("mouseleave", function(){

        $("form#login").delay(1700).animate({right: "-276"},"slow");
    });
});
// log in
$(document).ready(function(){
   $("form#login").on("submit", function(){
       //var user = $("input#user").val();
       //var password = $("#input#password").val();
       //var data = 'user='+user+'&password='+password;
       var data = $(this).serialize();
       $.ajax({
           url:"php/login.php",
           method:"POST",
           data:data,
           statusCode:{
               500: function(){
                   alert('wrong user name or password, try again please');
               }
           },
           success: function(result){
               if(result.indexOf('Hej')>-1){
                    window.open('index.html','_self');
                    return false;
               } else {
                   alert (result);
               }
           }
       })
       return false;
   });
});
//log out slide
$(document).ready(function(){
    $("form#logout").on("mouseenter", function(){
        $("form#logout").animate({right:"3"}, "fast");
    });
    $("form#logout").on("mouseleave", function(){
        $("form#logout").delay(700).animate({right: "-60px"},"slow");
    });
})
//log out
$(document).ready(function(){
    $("input#logout").on("click", function(){
        var logout = confirm ("You are about to log out of the system, are you sure?\n");
        if (logout){
            $.ajax({
                url:"php/logout.php",
                success: function(result){
                    window.open("index.html","_self");
                }
            })
            return false;
        } else {return false;}
    })
});
// -->log litter
$(document).ready(function(){
    $("div#logLitter").on("mouseenter",function(){
        $("div#logLitter").css({"background-color":"#eee",});
        $("div#logLitter").children().css({"color":"#f26522","font-size":"67px"});
        $("div#logBorn").css({'background-color':'#eee','border-top':'3px dotted white'});
        $("div#logBorn p").css("color","white");
    });
    $("div#logLitter").on("mouseleave",function(){
        $("div#logLitter").css({"background-color":"white","border":"3px solid #eee"});
        $("p#eartag").css({'color':'#e9e9e9','font-size':'59px'});
        //$("div#logLitter").children().css({"color":"#ddd","font-size":"41px"});
        $("div#logBorn").css({'background-color':'white','border-top':'3px dotted #eee'});
        $("div#logBorn p").css("color","#ddd");
    });
    $("p#eartag").on("click",function(){
        $.ajax({
            url:"php/Login_loglitter.php",
            statusCode:{
                500: function(){
                    alert ("Might be something wrong with the database, try again later.")
                },
            },
        }).done(function(result){
            if(result.indexOf('Welcome')>-1){
                window.open("logLitter/loglitter.html","_self")
            } else {
                alert(result);
            }
        })
    });
    $("p#born").on("click",function(){
        $.ajax({
            url:"php/Login_loglitter.php",
            statusCode:{
                500: function(){
                    alert ("Might be something wrong with the database, try again later.")
                },
            },
        }).done(function(result){
            if(result.indexOf('Welcome')>-1){
                window.open("logBorn/logBorn.html","_self")
            } else {
                alert(result);
            }
        })
    });
});

// -->logGene
$(document).ready(function(){
    $("div#logGene").on("mouseenter",function(){
        $("div#logGene").css({"background-color":"#eee",});
        $("div#logGene").children().css({"color":"white","font-size":"79px"});
        $("div#termination").css({'background-color':'#eee','border-top':'3px dotted #f26522'});
        $("div#termination p").css("color","#f26522");
    });
    $("div#logGene").on("mouseleave",function(){
        $("div#logGene").css({"background-color":"white","border":"3px solid #eee"});
        $("p#logGene").css({'color':'#e9e9e9','font-size':'57px'});
        //$("div#logGene").children().css({"color":"#ddd","font-size":"41px"});
        $("div#termination").css({'background-color':'white','border-top':'3px dotted #eee'});
        $("div#termination p").css("color","#ddd");
    });
    $("p#logGene").on("click",function(){
        $.ajax({
            url:"php/Login_loglitter.php",
            statusCode:{
                500: function(){
                    alert ("Might be something wrong with the database, try again later.")
                },
            },
        }).done(function(result){
            if(result.indexOf('Welcome')>-1){
                window.open("logGene/logGene.html","_self")
            } else {
                alert(result);
            }
        })
    });
    $("p#termination").on("click",function(){
        $.ajax({
            url:"php/Login_loglitter.php",
            statusCode:{
                500: function(){
                    alert ("Might be something wrong with the database, try again later.")
                },
            },
        }).done(function(result){
            if(result.indexOf('Welcome')>-1){
                window.open("termination/termination.html","_self")
            } else {
                alert(result);
            }
        })
    });
});
// --> pair
$(document).ready(function(){
    $("div#Pair").on("mouseenter",function(){
        $("div#Pair").css({"background-color":"#f26522","opacity":"0.7","border":"3px solid #f26522"
                               });
        $("div#Pair").children().css({"color":"white","font-size":"99px"});
    });
    $("div#Pair").on("mouseleave",function(){
        $("div#Pair").css({"background-color":"white","border":"3px solid #eee"});
        $("div#Pair").children().css({"color":"#ddd","font-size":"41px"});
    });
    $("p#pair").on("click",function(){
        $.ajax({
            url:"php/Login_loglitter.php",
            statusCode:{
                500: function(){
                    alert ("Might be something wrong with the database, try again later.")
                },
            },
        }).done(function(result){
            if(result.indexOf('Welcome')>-1){
                window.open("pair/pair.html","_self")
            } else {
                alert(result);
            }
        })
    });
});
//check statistic
$(document).ready(function(){
    $.ajax({
        url:'php/checkStat.php',
        success: function(result){
            var stat = $.parseJSON(result);
            $("#mouseCount").html(stat[0]);
            $("#maleCount").html(stat[1]);
            $("#femaleCount").html(stat[2]);
            $("#pairCount").html(stat[3]);
            $("#bigFamily").html(stat[4]);
            $("#bigFamilyCount").html(stat[5]);
            $("#smallFamily").html(stat[6]);
            $("#smallFamilyCount").html(stat[7]);
            $("#newLitterTime").html(stat[8]);
            $("#withoutGene").html(stat[9]);
            if(stat[9]>500){
                $("#workHarder").show();
            };
            if(stat[9]<130) {
                $("#relax").show();
            }
        }
    });
    $.ajax({
        url:'php/checkRatioMale.php',
        success: function(result){
            $("#tooManyMale").html(result);
        }
    });
        $.ajax({
        url:'php/checkRatioFemale.php',
        success: function(result){
            $("#tooManyFemale").html(result);
        }
    });
    $("div#stat").on('mouseenter', function(){
        $("div#statCover").hide();
        $("div#statContent").show();
    });
    $("div#stat").on('mouseleave', function(){
        $("div#statCover").show();
        $("div#statContent").hide();
    });
});
//check note
$(document).ready(function(){
    $.ajax({
        url:'php/checkNote.php',
        success: function(result){
            $("#withNote").html(result);
        }
    });
    $.ajax({
        url:'php/checkTableName.php',
        success: function(result){
            $("#tableWithNote").html(result);
        }
    })
});
