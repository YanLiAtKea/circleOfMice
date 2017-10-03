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
//confirm refresh page
//CHECK window.open _self vs window.location="", chrome refresh button confirm repeat submission
$(document).ready(function () {
    $("#circleofmice").on("click", function(){
        var refresh = confirm ("You are about to refresh this page, this will CLEAR the log summary section so you won't be able to check what you've logged so far, to print or send the summary. Are you sure you want to refresh? \n\nIf you only want to start a new search, just cancel this alert and click on any color circle on the first row.\n");
        if (refresh){
            window.open("loglitter.html","_self");
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
                   window.open('loglitter.html','_self');
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
        var logout = confirm ("You are about to log out. This will CLEAR the log summary section and return to the HOMEPAGE. \n\nAre you sure?");
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
        $("input[type='radio'].cage_nr").removeAttr('checked'); //clear checked nr
        //clear old inputs, keep wean week and years as these most likely won't be wrong
        $("#bornweek").val('');
        $("#female_min").val('');
        $("#female_max").val('');
        $("#male_min").val('');
        $("#male_max").val('');
        $("#note").val('');
        $("p#parentsP").hide();
        $("span#parents").html('');
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
      .done(function(result){ //filter the cageNr, only the ones exist in DB will be shown
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
        $("input[type='radio'].cage_nr").removeAttr('checked'); //clear checked nr
        $("#bornweek").val('');
        $("#female_min").val('');
        $("#female_max").val('');
        $("#male_min").val('');
        $("#male_max").val('');
        $("#note").val('');
        $("p#parentsP").hide();
        $("span#parents").html('');
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
        $("input[type='radio'].cage_nr").removeAttr('checked'); //clear checked nr
        $("#bornweek").val('');
        $("#female_min").val('');
        $("#female_max").val('');
        $("#male_min").val('');
        $("#male_max").val('');
        $("#note").val('');
        $("p#parentsP").hide();
        $("span#parents").html('');
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
//after pick cage_nr
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
// change the unchecked numbers back to light buttons
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



//show parents eartags if exist
$(document).ready(function(){
    //check if only one strain/cage is achieved
    //split by <br> and count sections to get how many lines returned, 3 sections equals only one set of 2 result
    var strain_cage = $("#strain").html();
    var split = strain_cage.split(/<br>/g);
    var count = split.length;
    //count>3 means not unique yet, <2 means nothing is selected
    if (count=3){
        $("#cage_nr").on("change", function(){
            var strain_cage = $("#strain").html();
            var split = strain_cage.split(/<br>/g);
            var cage_pre = strain_cage.split('[',2)[1];
            var cage = cage_pre.split(']',1);
            var cage_str = cage_pre.toString().slice(0, -5);
            var cage_nr = $("input.cage_nr:checked").val();
            $.ajax({
                url:'php/checkPair.php',
                method:'get',
                data:{
                    cage:cage_str,
                    cage_nr:cage_nr,
                }
            }).done(function(pairEartags){
                if(pairEartags.indexOf('noParentsInfo')>-1){
                    $("p#parentsP").hide();
                } else {
                    $("p#parentsP").show();
                    $("span#parents").html(pairEartags);
                }
            });
        });
    }
});
//change max according to min choice，no default min or max and they are not required cuz maybe no such gender born in this litter
$(document).ready(function(){
    $("#female_min").on("change", function(){
        var female_min = $("#female_min").val();
        $("#female_max").val(female_min);
    });
    $("#male_min").on("change", function(){
        var male_min = $("#male_min").val();
        $("#male_max").val(male_min);
    });
});

//submit button change color, validate inputs & functions
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
            url: "php/checkUser.php",
            }).done(function(checkSession){
            if(checkSession.indexOf('nobody')>-1){
                alert ("Can't submit when you're not logged in.")
            } else {

        //check if only one strain/cage is achieved
        //split by <br> and count sections to get how many lines returned, 3 sections equals only one set of 2 result
        var strain_cage = $("#strain").html();
        var split = strain_cage.split(/<br>/g);
        var count = split.length;
        //add count<2 to get alert when nothing is selected
        if (count>3 || count<=1){
            alert("You haven't narrowed down the family yet.\n\nKeep picking colors ;)");
        }
        //check cage and times all filled out?
        else if (
            !$("input.cage_nr:checked").val() ||
            !$("input#bornweek").val() ||
            !$("input#weanweek").val()){
            alert ("Strain is narrowed down, but \n\n- The last digit of the cage\n- the born week\n- the wean week \n\nare also required.");
        }
        //week number <=53
        // add default value as week number of logging date?
        else if (
            ($("input#bornweek").val() > 53) || ($("input#weanweek").val() > 53)){
            alert ("At least one week number is too big.");
        }
        //year>2016 + year <2015
        // add (new date).getFullYear() later
        else if (
            ($("input#bornYear").val() > 2017) || ($("input#weanYear").val() > 2017)){
            alert ("Back from the future? ;)");
        } else if (
            ($("input#bornYear").val() < 2015) || ($("input#weanYear").val() < 2015)){
            alert ("The parents are probably too old?")
        }
        //wean comes later than birth, different years
        else if (
            $("input#bornyear").val() > $("input#weanyear").val() || (parseInt($("input#bornYear").val(),10)== parseInt($("input#weanYear").val(),10)
            &&
            ((parseInt($("input#bornweek").val(),10))>
            (parseInt($("input#weanweek").val(),10))))){
            alert ("Can't leave mom before i'm born ;)")
        }
        //same year then wean week - birth >=2
        else if (
            parseInt($("input#bornYear").val(),10)== parseInt($("input#weanYear").val(),10)
            && ((parseInt($("input#weanweek").val(),10))-(parseInt($("input#bornweek").val(),10))<2)){
            alert ("Probably too young to leave mom? ;)");
        }
        //different years but wean-born<2
        else if (
            ($("input#bornyear").val() < $("input#weanyear").val()) && ((parseInt($("input#weanweek").val(),10))+53 - (parseInt($("input#bornweek").val(),10))<2)){
            alert ("Probably too young to leave mom? ;)");
        }
        //no number should be 0
        else if (
            ($("#female_min").val() && $("#female_min").val()==0)
            || ($("#female_max").val() && $("#female_max").val()==0)
            || ($("#male_min").val() && $("#male_min").val()==0)
            || ($("#male_max").val() && $("#male_max").val()==0)
            ){
            alert ("Ear tags shouldn't be 0.\nIf no such gender born, just leave it empty.");
        }
        // <1000 for now
        else if (
            ($("#female_min").val() && $("#female_min").val()>1000)
            || ($("#female_max").val() && $("#female_max").val()>1000)
            || ($("#male_min").val() && $("#male_min").val()>1000)
            || ($("#male_max").val() && $("#male_max").val()>1000)
            ){
            alert ("Ear tags are too big.");
        }
        //picked only min or only max,
        else if (
            ($("input#male_min").val() && !$("input#male_max").val()) || (!$("input#male_min").val() && $("input#male_max").val()) ||($("input#female_min").val() && !$("input#female_max").val()) || (!$("input#female_min").val() && $("input#female_max").val())){
            alert ("You forgot to pick a min or a max.\nIf there is no male or female in this litter, keep both min and max empty.")
        }
        //max>min
        else if (
            parseInt($("input#male_min").val(),10) > parseInt($("input#male_max").val(),10) || parseInt($("input#female_min").val(),10)> parseInt($("input#female_max").val(),10)){
            alert ("max number should be bigger than min")
        }
        //male min and max are both picked but one of them is not odd
        else if (
            ($("input#male_min").val() && $("input#male_min").val()%2 ==0) || ($("input#male_max").val() && $("input#male_max").val()%2 ==0)){
            alert("Male ear tag(s) should be odd number(s).")
        }
        //female min and max are both picked but one of them is not even
        else if (
            ($("input#female_min").val() && $("input#female_min").val()%2 ==1) || ($("input#female_max").val() && $("input#female_max").val()%2 ==1)){
            alert ("Female ear tag(s) should be even number(s)")
        }
        //inputs all in required form, send to php, SEE NOTE BELOW
        else {
            //couldn't get encode_json working, use split to filter out the strain and cage info from PHP result as seperate varibles for now.
            //splitted var received as array in php, because it includes<br> and space etc. slice these out
        var strain_cage = $("#strain").html();
        var strain = strain_cage.split('[',1);
        var strain_str = strain.toString().slice(0, -4);
        var cage_pre = strain_cage.split('[',2)[1];
        var cage = cage_pre.split(']',1);
        var cage_str = cage_pre.toString().slice(0, -5);
        var cage_nr = $("input.cage_nr:checked").val();
        var bornyear = $("input#bornYear").val();
        var bornweek = $("input#bornweek").val();
        var weanyear = $("input#weanYear").val();
        var weanweek = $("input#weanweek").val();
        var femalemin = $("input#female_min").val();
        var femalemax = $("input#female_max").val();
        var malemin = $("input#male_min").val();
        var malemax = $("input#male_max").val();
        var note = $("input#note").val();
        /*
        //get browser side log date
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var date = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
        */

        // min and max must both present in order to count
        // both min and max are empty are allowed as it is possible only one gender was born. so this condition was not filtered before
        var maleCount = (malemin && malemax)? ((malemax-malemin)/2 +1):'0';
        var femaleCount = (femalemax && femalemin)? ((femalemax-femalemin)/2 +1):'0';

        $.ajax({
            url: "php/logLitter.php",
            method:"GET",
            data:{
                strain:strain_str,
                cage:cage_str,
                cage_nr:cage_nr,
                bornyear:bornyear,
                bornweek:bornweek,
                weanyear:weanyear,
                weanweek:weanweek,
                femalemin:femalemin,
                femalemax:femalemax,
                malemin:malemin,
                malemax:malemax,
                note:note,
                //date:date, //browser side time. maybe better to use server time in php
            },
            cache:false,
            statusCode:{
                500:function(){
                    alert ('There might be an error in the database, try again or contact me.')
                }
            }
        }).done(function(result){
            if (
                //check to see if result contains any 'successful' and no 'altered', .indexOf returns position.
                // this case from php means this is the first log of this litter, not an alteration, suscessful
                result.indexOf('successful') >-1 && result.indexOf('altered')<0 && result.indexOf('change')<0){
                // alert how many for both gender
                //alert ("Successful logged "+ maleCount + " male(s) and " + femaleCount +" female(s)." );
                //add log to the summary
                $("#log_sum").prepend("<div class='log_entry'><p> strain:  <span style='font-size:18px'>" + strain_str + "</ span></ p><p> cage:  <span style='font-size:18px'>" + cage +" "+ cage_nr + "</span> </p><p> born:  <span style='font-size:18px'>" + bornweek + "-" + bornyear + "</span>  ; wean:  <span style='font-size:18px'>"+ weanweek + "-" + weanyear + "</ span></ p><p> Male:  <span style='font-size:18px'>" + malemin + "-" + malemax + "</span>   ; Female:  <span style='font-size:18px'>" + femalemin + "-" + femalemax +"</ span></ p><p><span style='font-size:18px'><strong>" + note +"</strong></ span></ p><hr /></ div>");
                //remove focus in the note field
                // MAYBE IT IS BETTER NOT REMOVE FOCUS SO USER DOES NOT FORGET TO REMOVE OLD ONE?
                //$("#note").blur();
            } else if (
                // success + alteration
                result.indexOf('successful') >-1 && result.indexOf('altered')>-1 && result.indexOf('change')<0){
                // alert how many for both gender
                //alert ("Successful logged "+ maleCount + " male(s) and " + femaleCount +" female(s)." );
                // strike the last log of the same litter in summary area
                // delay so in case of multiple wrong input user can see it gets striked
                $("div.log_entry:first").delay(400).queue(function(next){$(this).css({"text-decoration":"line-through"});next();});
                // add the new log to the summary
                $("#log_sum").prepend("<div class='log_entry'><p> strain:  <span style='font-size:18px'>" + strain_str + "</span></p><p> cage:  <span style='font-size:18px'>" + cage +" "+ cage_nr + "</span> </p><p> born:  <span style='font-size:18px'>" + bornweek + "-" + bornyear + "</span>  ; wean:  <span style='font-size:18px'>"+ weanweek + "-" + weanyear + "</span></p><p> Male:  <span style='font-size:18px'>" + malemin + "-" + malemax + "</span>   ; Female:  <span style='font-size:18px'>" + femalemin + "-" + femalemax +"</span></p><p><span style='font-size:18px'><strong>" + note +"</strong></span></p><hr /></div>");
                //remove focus in the note field
                //MAYBE IT IS BETTER NOT REMOVE FOCUS SO USER DOES NOT FORGET TO REMOVE OLD ONE?
                //$("#note").blur();
            } else if (
                //not alter the last one but change one from before
                result.indexOf('successful') <0 && result.indexOf('altered')<0 && result.indexOf('change')>-1){
                alert ("You wanted to change an older litter. It's not a modification to the last entry, but to a litter you logged before. \n\nThis might cause error in the database so no change is made right now. The attempt is noted. You can contact me regarding this change via email. \n\nPlease proceed and log other litters");
                //add log to the summary
                $("#error").prepend(result);
                //remove focus in the note field
                // MAYBE IT IS BETTER NOT REMOVE FOCUS SO USER DOES NOT FORGET TO REMOVE OLD ONE?
                //$("#note").blur();
            } else if (
                // php return problem sentence means too many alterations
                result.indexOf('Problem') >-1){
                //alert too many alterations
                alert ("You've edit this litter many times, is there any problem?\nPlease contact me about this litter.\n\nYou can proceed and log other litter(s).");
                $("#error").prepend(result);
            } else {
                alert(result);
            }
        })
    }
}
});
    //change icon color back, use delay when set no alert, so user knows submit is clicked
        $("#submitLogLitter_img").delay(400).queue(function(next){$(this).attr("src", "icon/submit_dark.png");next();});
    });
});

/* seems no need
$(document).ready(function(){
   $("div#summary").on("click",function(){
       $("div#summary").css("z-index","3");
   }) ;
});
*/

//print button, PROBLEM WITH SAFARI, COLUMN PRINTING NOT SUPPORTED, CLICK THE FIRST TIME WON'T HIDE MAIN
$(document).ready(function(){
    $("#print").on("mouseenter", function(){
        $("#print_img").attr("src", "icon/print_checked.png");
    });
    $("#print").on("mousedown", function(){
        $("#print_img").attr("src", "icon/print.png");
        return false; // no drag
    });
    $("#print").on("mouseleave", function(){
        $("#print_img").attr("src", "icon/print.png"); //change color back
    });
    $("#print").on("mouseup", function(){
        $("div#main").hide();
        //css("display","none");  //hide main, so only the summary will be printed
        $("span#preLogout").html("from ");// so the page looks like from Bente to others
        $("div#logoutDiv").css("margin-top","-19px");
        $("img.banner").css({"width":"100%","height":"auto"}); //get to print the original banner, not background img
        //get log date
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var date = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
        //get data
        var memo = $("#memo").val();
        var error = $("#error").val();
        var summary = $("div#allLogs").html();
        $("<div id='popup_sum'><div><p>Date: </p><p>" + date +"</p><p>Memo:</p><p>"+ memo + "</p><p>Error:</p><p>"+error+"</p><hr />"+ summary+"</div></div>").appendTo($("body"));
        window.print();
        $("img.banner").css({"width":"0px","height":"0px"});
        $("div#main").css("display","inherit"); //after printing show main again
        $("span#preLogout").html("Hej "); //change back greeting to Bente
        $("div#logoutDiv").css("margin-top","3px");
        $("#popup_sum").remove(); //remove summary
        $("#print_img").attr("src", "icon/print.png"); //change button color back
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
        var memo = $("#memo").val();
        var error = $("#error").val();
        var email ="xiaobaoxixi@hotmail.com";
        var subject = "logLitter            ";
        event.preventDefault();
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + memo + error + summary;
    })
});
//delete button, different from alteration strike
$(document).ready(function(){
    $("#delete").on("mouseenter", function(){
        $("#delete_img").attr("src", "icon/del_checked.png");
    });
    $("#delete").on("mousedown", function(){
        $("#delete_img").attr("src", "icon/del.png");
        return false;
    });
    $("#delete").on("mouseleave", function(){
        $("#delete_img").attr("src", "icon/del.png");
    });
    $("#delete").on("mouseup", function(){
        //if nothing in summary,i.e. haven't logged anything after coming in page, no delete
        if($("div.log_entry").length<1){
            alert ('No log to delete.')
        } else {
        var confirmDelete = confirm ("You are about to delete the last entry you just logged.\n\nThis is only for the case that you picked a wrong litter(strain, cage, birth time or wean time is wrong) and submitted something about it. To delete, click 'OK'.\n\nIf the litter is right, you just want to edit the eartag(s) or note(s), just click 'cancel' here and submit a new log.\n\n");
        if (confirmDelete){
            //can only delete today's log
            /*
            //browser log date
            var d = new Date();
            var month = d.getMonth()+1;
            var day = d.getDate();
            var date = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
            */
            $.ajax({
            url:'php/deleteLastEntry.php',
            method:'get',
            //data:{date:date},
            }).done(function(feedback){
                if(feedback.indexOf('deleted')>-1){
                $("#delete_img").attr("src", "icon/del.png");
        $("div.log_entry:first").css({"background-color":"darkgrey", "color":"lightgrey", "border":"1px solid #aaa","border-radius":"10px;","text-decoration":"line-through"});
                } else {
                    alert(feedback);
                }
            });
        } else {return false;}
    }})



    /*
    works as well for strike text, but no show in email
    var original = $("div.log_entry:first").html();
    var striked = "<del>" + original +"</del>";
    $("div.log_entry:first").html(striked);
    */


    })

