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
//confirm going back to homepage
//CHECK window.open _self vs window.location="", chrome refresh button confirm repeat submission
$(document).ready(function () {
    $("#circleofmice").on("click", function(){
        var refresh = confirm ("You are going back to the homepage without logging out, so you can proceed with other work.\n\nIf you want to refresh this page, please use the refresh button of the browser.\n\nIf you want to pick other cage, just click a color from the first row.\n\nIf you're all done, please log out of the system with the slide on the right.");
        if (refresh){
            window.open("../index.html","_self");
        } else {return false;}
    })
});
//log in slide
$(document).ready(function(){
    $("form#login").on("mouseenter", function(){
        $("form#login").animate({right: "0"},"fast");
        $("input#username").focus();
    });
    $("form#login").on("mouseleave", function(){
        $("form#login").delay(1700).animate({right: "-276"},"slow");
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
           url:"../php/login.php",
           method:"POST",
           data:data,
           statusCode:{
               500: function(){
                   alert('wrong user name or password, try again please');
               }
           },
           success: function(result){
               if(result.indexOf('Hej')>-1){
                   window.open('logBorn.html','_self');
                   return false;
           //$("span#logout").html(result);
           //$("form#login").hide();
           //$("form#logout").show("slow");
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
        $("form#logout").delay(700).animate({right: "-76px"},"slow");
    });
})
//log out
$(document).ready(function(){
    $("input#logout").on("click", function(){
        var logout = confirm ("You are about to log out and return to the HOMEPAGE. \n\nAre you sure?");
        if (logout){
            $.ajax({
                url:"../php/logout.php",
            });
            window.open("../index.html","_self");
            return false;
        } else {return false;}
    })
});

//3 color-php
// get info based on 1. color
$(document).ready(function(){
    $("fieldset[name='first']").change(function(){
    var first= $("input[type='radio'].first:checked").val();
    $.ajax({
        url:"php/getColor1.php",
        method: "GET",
        data: {first: first},
        cache: false,
    })
      .done(function(result){
        $("#strain").html(result);
        $("input.cage_nr").parent().show(); //so change first row will bring back all numbers. see below as well **********
        $("input[type='radio'].second, input:radio.third").removeAttr('checked'); //clear 2nd, 3rd color
        //$("input[type='radio'].cage_nr").prop('checked',false);
        //$("input[type='radio'].cage_nr:checked").prop('checked',false);
        var oldCheckedNr = $("input[type='radio'].cage_nr:checked").val(); //change back the checked nr icon to light
        var src = "numbers/"+oldCheckedNr+".png";
        $("input[type='radio'].cage_nr:checked").next().attr('src', src);
        //clear checked nr
        $("input[type='radio'].cage_nr").removeAttr('checked');
        $("div#logBornDiv").html('');
        })
    });
});
// update cage_nr if already unique
$(document).ready(function(){
    $("fieldset[name='first']").change(function(){
        var first= $("input[type='radio'].first:checked").val();
    $.ajax({
        url:"php/getCage1.php",
        method: "GET",
        data: {first: first},
        cache: false,
    })
      .done(function(result){
        //filter the cageNr, only the ones exist in DB will be shown
        //$("input[type='radio'].cage_nr").prop('checked',false);
        //$("input[type='radio'].cage_nr:checked").prop('checked',false);
        var cageMax = parseInt(result,10);
        $("input[type='radio'].cage_nr").filter(function(val){return $(this).val() > cageMax}).parent().hide();
        //*****************can't use this now. won't change back even when return 37, Not sure why
        //also, if strain filtered to unique but no max cageNr, then return "" so can't change nr. Solved when pair data all in.
        //$("input[type='radio'].cage_nr").filter(function(val){return $(this).val() <= cageMax}).parent().show();
        })
    });
});
// get info after 2. color
$(document).ready(function(){
    $("fieldset[name='second']").change(function(){
    var second= $("input[type='radio'].second:checked").val();
    $.ajax({
        url:"php/getColor2.php",
        method: "GET",
        data: {second: second},
        //dataType:"html"
    })
      .done(function(result){
        //alert(result);
        $("#strain").html(result);
        $("input[type='radio'].third").removeAttr('checked');
        var oldCheckedNr = $("input[type='radio'].cage_nr:checked").val(); //change back the checked nr icon to light
        var src = "numbers/"+oldCheckedNr+".png";
        $("input[type='radio'].cage_nr:checked").next().attr('src', src);
        $("input[type='radio'].cage_nr").removeAttr('checked');
        $("div#logBornDiv").html('');
    })
});
});
// update cage_nr after 2. color if already unique
$(document).ready(function(){
    $("fieldset[name='second']").change(function(){
    var second= $("input[type='radio'].second:checked").val();
    $.ajax({
        url:"php/getCage2.php",
        method: "GET",
        data: {second: second},
        cache: false,
    })
      .done(function(result){ //filter the cageNr, only the ones exist in DB will be shown
        //alert (result);
        var cageMax = parseInt(result,10);
        $("input[type='radio'].cage_nr").filter(function(val){return $(this).val() > cageMax}).parent().hide();
        //************this works here, but not for first row
        $("input[type='radio'].cage_nr").filter(function(val){return $(this).val() <= cageMax}).parent().show();
        });
    });
});
// get info after 3. color
$(document).ready(function(){
    $("fieldset[name='third']").change(function(){
        //alert($("input[type='radio'].third:checked").val());
    var third= $("input[type='radio'].third:checked").val();
    $.ajax({
        url:"php/getColor3.php",
        method: "GET",
        data: {third: third},
        cache: false,
        //dataType:"html"
    })
      .done(function(result){
        //alert(result);
        $("#strain").html(result);
        var oldCheckedNr = $("input[type='radio'].cage_nr:checked").val(); //change back the checked nr icon to light
        var src = "numbers/"+oldCheckedNr+".png";
        $("input[type='radio'].cage_nr:checked").next().attr('src', src);
        $("input[type='radio'].cage_nr").removeAttr('checked');
        $("div#logBornDiv").html('');
    })
});
});
// update cage_nr after 3. color
$(document).ready(function(){
    $("fieldset[name='third']").change(function(){
    var third= $("input[type='radio'].third:checked").val();
    $.ajax({
        url:"php/getCage3.php",
        method: "GET",
        data: {third: third},
        cache: false,
    })
      .done(function(result){ //filter the cageNr, only the ones exist in DB will be shown
        //alert (result);
        var cageMax = parseInt(result,10);
        $("input[type='radio'].cage_nr").filter(function(val){return $(this).val() > cageMax}).parent().hide();
        //************this works here, but not for first row
        $("input[type='radio'].cage_nr").filter(function(val){return $(this).val() <= cageMax}).parent().show();
        });
    });
});

//checked cageNr is / change to dark img
$(document).ready(function(){
        //for firefox, after refresh the checked won't get cleared, but as there is no change, the checked won't show dark img as set below
        var nr_checked = $("input[type='radio'].cage_nr:checked").val();
        var src_checked ="numbers/"+nr_checked+"_dark.png";
        $("input[type='radio'].cage_nr:checked").next().attr('src', src_checked);
});
$(document).ready(function(){
        $("#cage_nr").on("change", function(){
        var nr_checked = $("input[type='radio'].cage_nr:checked").val();
        var src_checked ="numbers/"+nr_checked+"_dark.png";
        $("input[type='radio'].cage_nr:checked").next().attr('src', src_checked);
        //MAYBE BETTER NOT TO CLEAR OLD INPUT WHEN CHANGE CAGE_NR
        //$("#bornweek").val('');
        //$("#female_min").val('');
        //$("#female_max").val('');
        //$("#male_min").val('');
        //$("#male_max").val('');
        //$("#note").val('');
        });
});
//cage nr buttons change colors with checked/unchecked, SEE NOTE BELOW
/*
       cant loop through each input, all apply to the first value
       check: http://www.sitepoint.com/jquery-each-function-examples/
       function(index,value)
       var unchecked = $("input[type='radio'].cage_nr").not(':checked');
       unchecked.each(function(){
          var nr = unchecked.val();
          var src = "numbers/"+nr+".png";
          alert(src)
          $(this).next().attr('src',src);
          */
// change the unchecked cage numbers back to light buttons
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
       if(!$("#b14").is(":checked")){
            $("#i14").attr('src','numbers/14.png')
        }
        if(!$("#b15").is(":checked")){
            $("#i15").attr('src','numbers/15.png')
        }
        if(!$("#b16").is(":checked")){
            $("#i16").attr('src','numbers/16.png')
        }
       if(!$("#b17").is(":checked")){
            $("#i17").attr('src','numbers/17.png')
        }
       if(!$("#b18").is(":checked")){
            $("#i18").attr('src','numbers/18.png')
        }
       if(!$("#b19").is(":checked")){
            $("#i19").attr('src','numbers/19.png')
        }
       if(!$("#b20").is(":checked")){
            $("#i20").attr('src','numbers/20.png')
        }
       if(!$("#b21").is(":checked")){
            $("#i21").attr('src','numbers/21.png')
        }
       if(!$("#b22").is(":checked")){
            $("#i22").attr('src','numbers/22.png')
        }
       if(!$("#b23").is(":checked")){
            $("#i23").attr('src','numbers/23.png')
        }
       if(!$("#b24").is(":checked")){
            $("#i24").attr('src','numbers/24.png')
        }
       if(!$("#b25").is(":checked")){
            $("#i25").attr('src','numbers/25.png')
        }
       if(!$("#b26").is(":checked")){
            $("#i26").attr('src','numbers/26.png')
        }
       if(!$("#b27").is(":checked")){
            $("#i27").attr('src','numbers/27.png')
        }
        if(!$("#b28").is(":checked")){
            $("#i28").attr('src','numbers/28.png')
        }
        if(!$("#b29").is(":checked")){
            $("#i29").attr('src','numbers/29.png')
        }
       if(!$("#b30").is(":checked")){
            $("#i30").attr('src','numbers/30.png')
        }
       if(!$("#b31").is(":checked")){
            $("#i31").attr('src','numbers/31.png')
        }
       if(!$("#b32").is(":checked")){
            $("#i32").attr('src','numbers/32.png')
        }
       if(!$("#b33").is(":checked")){
            $("#i33").attr('src','numbers/33.png')
        }
       if(!$("#b34").is(":checked")){
            $("#i34").attr('src','numbers/34.png')
        }
       if(!$("#b35").is(":checked")){
            $("#i35").attr('src','numbers/35.png')
        }
       if(!$("#b36").is(":checked")){
            $("#i36").attr('src','numbers/36.png')
        }
       if(!$("#b37").is(":checked")){
            $("#i37").attr('src','numbers/37.png')
        }
       });
    });
// after pick cage nr get litters from this cage
$(document).ready(function(){
    $("#cage_nr").on("change", function(){
        var strain_cage = $("#strain").html();
        var strain = strain_cage.split('[',1);
        var strain_str = strain.toString().slice(0, -4);
        var cage_pre = strain_cage.split('[',2)[1];
        var cage = cage_pre.split(']',1);
        var cage_str = cage_pre.toString().slice(0, -5);
        var cage_nr = $("input.cage_nr:checked").val();
        //var nr_checked = $("input[type='radio'].cage_nr:checked").val();
    $.ajax({
        url: 'php/checkBorn.php',
        method: 'get',
        data:{
            strain:strain_str,
            cage:cage_str,
            cage_nr:cage_nr,
        }
    }).done(function(result){
        $("div#logBornDiv").html(result);
        });
    });
});
//submit
$(document).ready(function(){
    $("#submitLogLitter").on("mousedown", function(){
        //stop the default drag possibility
        $("#submitLogLitter_img").attr("src", "icon/submit_light.png");
        return false;
    });
    $("#submitLogLitter").on("mouseleave", function(){
        $("#submitLogLitter_img").attr("src", "icon/submit_dark.png");
        //if hold down the button, move the mouse outside of the img and release, if won't be recognised as a click(mousedown+up) so no related function is fired, yet the img change to the mousedown one. to solve this add mouseleave to change the img back when mouse moves outside.
    });
    $("#submitLogLitter").on("mouseup", function(){
        $.ajax({
            url: "php/checkTao.php",
            })
            .done(function(checkSession){
            if(checkSession.indexOf('notTao')>-1){
                alert ("Only Tao can submit this.")
            } else {
                $( "input.bornCount" ).each(function( index ) {
                //only submit when bornCount has value
                if($(this).val()){
                    var eachBornCount = $(this).val();
                    if (parseInt(eachBornCount,10)<100){

                    var litterID = $("td.litterID").eq(index).html();
                    var bornNote = $("input.bornNote").eq(index).val();
                    var bornCount = $(this).val();
                    $.ajax({
                    url:'php/logBorn.php',
                    method:'get',
                    data:{
                        litterID:litterID,
                        bornCount:bornCount,
                        bornNote:bornNote,
                        },
                    }).done(function(result){
                        if(result.indexOf('success')<0){
                            alert (result);
                        } else {
                            $("#log_sum").prepend(litterID+". ");
                        }
                    });
                } else { alert("really? this many fron one litter?");}
            }})};
            });
        });
    });

//mailto: CHANGE EMAIL ADDRESS
$(document).ready(function(){
    $("#mailto").on("mouseenter", function(){
        $("#mailto_img").attr("src", "icon/email_checked.png");
    });
    $("#mailto").on("mousedown", function(){
        $("#mailto_img").attr("src", "icon/email.png");
        return false;
    });
    $("#mailto").on("mouseleave", function(){
        $("#mailto_img").attr("src", "icon/email.png");
    });
    $("#mailto").on("mouseup", function(){
        $("#mailto_img").attr("src", "icon/email.png");
        var summary = $("div#allLogs").html();
        var email ="xiaobaoxixi@hotmail.com";
        var subject = "logBorn";
        event.preventDefault();
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + summary;
    })
});



