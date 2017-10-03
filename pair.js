//confirm refresh page
$(document).ready(function(){
    $("#circleofmice").on("click", function(){
        confirm("you are about to refresh this page, this will CLEAR your choices, inputs and the log summary section, are you sure? \n\nIf you just want to start a new search, just click on any color circle on the first row.");
    });
});
/*
//log in slide
//maybe click is better than mouseenter and leave
$(document).ready(function(){
    $("form#login").on("mouseenter", function(){
        $("form#login").animate({right: "3"},"fast");
        $("input#username").focus();
    });
    $("form#login").on("mouseleave", function(){
        $("form#login").delay(700).animate({right: "-276"},"slow");
    });
});
//log in
$(document).ready(function(){
   $("form#login").on("submit", function(){
       //var user = $("input#user").val();
       //var password = $("#input#password").val();
       //var data = 'user='+user+'&password='+password;

       var data = $(this).serialize();
       $.ajax({
           url:"login/login.php",
           method:"POST",
           data:data,
           statusCode:{
               500: function(){
                   alert('wrong user name or password, try again please');
               }
           },
           success: function(result){
           $("span#logout").html(result);
           $("form#login").hide("fast");
           $("form#logout").show("slow");
           }
       })

           //.done(function(user){
           //          });
       return false;
   });
});

*/
//logout slide
$(document).ready(function(){
    $("form#logout").on("mouseenter", function(){
        $("form#logout").animate({right: "3"},"fast");
    });
    $("form#logout").on("mouseleave", function(){
        $("form#logout").delay(700).animate({right: "-60"},"slow");
    });
});

//log out
$(document).ready(function(){
    $("input#logout").on("click", function(){
        window.open("index.html","_self");
        //$("form#login").show("fast");
        //$("form#logout").hide("slow");
        return false;
    })
});
//expand colors
$(document).ready(function(){
    $("span#expand").on("click",function(){
        $("div#colors").slideDown("fast");
        $("span#expand").hide();
        $("span#close").show();
    });
});
//close colors
$(document).ready(function(){
    $("span#close").on("click",function(){
        $("div#colors").slideUp();
        $("span#expand").show();
        $("span#close").hide();
    });
});


//3 strain-php
$(document).ready(function(){
    $("fieldset[name='first']").change(function(){
        //alert($("input[type='radio'].first:checked").val());
    var first= $("input[type='radio'].first:checked").val();
    $.ajax({
        url:"php/getStrain1.php",
        method: "GET",
        data: {first: first},
        cache: false,
    })
      .done(function(result){
        //var res = $.parseJSON(result);
        //var strain = res['strain'];
        $("#strain").html(result);
//                $("cage_name").html(result[1]);
        $("input[type='radio'].second, input:radio.third").removeAttr('checked');
        $("img#color2, img#color3").hide();
        var src = 'colors/'+first+'.png';
        $("img#color1").attr("src",src);
        });
    });
});




$(document).ready(function(){
    $("fieldset[name='second']").change(function(){
    var second= $("input[type='radio'].second:checked").val();
    $.ajax({
        url:"php/getStrain2.php",
        method: "GET",
        data: {second: second},
        //dataType:"html"
    })
      .done(function(result){
        //alert(result);
        $("#strain").html(result);
        $("input[type='radio'].third").removeAttr('checked');
        $("img#color3").hide();
        var src = 'colors/'+second+'.png';
        $("img#color2").show();
        $("img#color2").attr("src",src);

    })
});
});
$(document).ready(function(){
    $("fieldset[name='third']").change(function(){
        //alert($("input[type='radio'].third:checked").val());
    var third = $("input[type='radio'].third:checked").val();
    $.ajax({
        url:"php/getStrain3.php",
        method: "GET",
        data: {third: third},
        cache: false,
        //dataType:"html"
    }).done(function(result){
        //alert(result);
        $("#strain").html(result);
        $("img#color3").show();
        var src = 'colors/'+third+'.png';
        $("img#color3").attr("src",src);
    })
    var strain = $("#strain").html();




        $.ajax({
        url:"php/getGene.php",
        method:"GET",
        data:{ strain: strain},
        cache:false,
    }).done(function(result){
        alert(result);
    });
});
});

//checked cageNr change to dark img
$(document).ready(function(){
   $("#cage_nr").on("change", function(){
        var nr_checked = $("input[type='radio'].cage_nr:checked").val();
        var src_checked ="numbers/"+nr_checked+"_dark.png";
        $("input[type='radio'].cage_nr:checked").next().attr('src', src_checked);
   });
});

//cage nr buttons change colors with checked/unchecked
$(document).ready(function(){
   $("#cage_nr").on("change", function(){
        if(!$("#b1").is(":checked")){
            $("#i1").attr('src','numbers/1.png')
        }
        if(!$("#b2").is(":checked")){
            $("#i2").attr('src','numbers/2.png')
        }
        if(!$("#b3").is(":checked")){
            $("#i3").attr('src','numbers/3.png')
        }
       if(!$("#b4").is(":checked")){
            $("#i4").attr('src','numbers/4.png')
        }
       if(!$("#b5").is(":checked")){
            $("#i5").attr('src','numbers/5.png')
        }
       if(!$("#b6").is(":checked")){
            $("#i6").attr('src','numbers/6.png')
        }
       if(!$("#b7").is(":checked")){
            $("#i7").attr('src','numbers/7.png')
        }
       if(!$("#b8").is(":checked")){
            $("#i8").attr('src','numbers/8.png')
        }
       if(!$("#b9").is(":checked")){
            $("#i9").attr('src','numbers/9.png')
        }
       if(!$("#b10").is(":checked")){
            $("#i10").attr('src','numbers/10.png')
        }
       if(!$("#b11").is(":checked")){
            $("#i11").attr('src','numbers/11.png')
        }
       if(!$("#b12").is(":checked")){
            $("#i12").attr('src','numbers/12.png')
        }
       if(!$("#b13").is(":checked")){
            $("#i13").attr('src','numbers/13.png')
        }

       /*
       cant loop through each input, all apply the first value
       check: http://www.sitepoint.com/jquery-each-function-examples/
       function(index,value)
       var unchecked = $("input[type='radio'].cage_nr").not(':checked');
       unchecked.each(function(){
          var nr = unchecked.val();
          var src = "numbers/"+nr+".png";
          alert(src)
          $(this).next().attr('src',src);
          */
       });
    });

//submit button change color & function
$(document).ready(function(){
    $("#submitLogLitter").on("mousedown", function(){
        $("#submitLogLitter_img").attr("src", "icon/submit_light2.png");
        return false;
        //stop the default drag possibility
    });
    $("#submitLogLitter").on("mouseleave", function(){
        $("#submitLogLitter_img").attr("src", "icon/submit_dark2.png");
        //if you hold down the button, move the mouse to the outside the img and release, if won't be recognised as a click(mousedown+up) so no related function is fired, yet the img change to the mousedown one. to solve this add mouseleave to change the img back when mouse moves outside.
    });
    $("#submitLogLitter").on("mouseup", function(){
        //change icon color
        $("#submitLogLitter_img").attr("src", "icon/submit_dark2.png");
        //create a log_entry div and put the strain info inside, then prepend it to #log_sum
        var strain = $("span#strain").html();
        var cage_nr = $("input.cage_nr:checked").val();
        var bornyear = $("input#bornyear").val();
        var bornweek = $("input#bornweek").val();
        var weanyear = $("input#weanyear").val();
        var weanweek = $("input#weanweek").val();
        var femalemin = $("input#female_min").val();
        var femalemax = $("input#female_max").val();
        var malemin = $("input#male_min").val();
        var malemax = $("input#male_max").val();
        var note = $("input#note").val();
        $("#log_sum").prepend("<div class='log_entry'>" + strain + "<p>cage nr.:" + cage_nr + "</p>born:" + bornyear + "/" + bornweek + " ; " + "wean: "+ weanyear + "/" + weanweek + "</p><p>female:" + femalemin + "-" + femalemax +" ; male:" + malemin + "-" + malemax + "</p><p><strong>" + note +"</strong></p></div>");
    });
});

//print button
$(document).ready(function(){
    $("input#print").on("click", function(){
        var summary = $("div#popup_div").html();
        $("<div id='popup_sum'>"+summary+"</div>").appendTo($("body"));
        $("main").css("display","none");
        window.print();
        $("main").css("display","inherit");
        $("#popup_sum").remove();
    })
});
//mailto:
$(document).ready(function(){
    $("input#mailto").on("click", function(){
        var summary = $("div#popup_div").html();
        var email ="xiaobaoxixi@hotmail.com";
        var subject = "log";
        event.preventDefault();
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + summary;
    })
});
//delete button
$(document).ready(function(){
    $("input#delete").on("click", function(){
    /*
    works as well for strike text, but no show in email
    var original = $("div.log_entry:first").html();
    var striked = "<del>" + original +"</del>";
    $("div.log_entry:first").html(striked);
    */

        $("div.log_entry:first").css("text-decoration","line-through");
    })
});
