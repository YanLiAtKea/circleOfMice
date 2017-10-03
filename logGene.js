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
//CHECK window.open _self vs window.location=""
$(document).ready(function () {
    $("#circleofmice").on("click", function(){
        var homepage = confirm ("You are about to go back to the homepage. \n\nEven though you won't get logged out right now, the log summary section will be CLEARED, so you won't be able to check / edit what you've logged so far. \n\nAre you sure you want to refresh? \n\n");
        if (homepage){
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

//display litter without any gene at open page
$(document).ready(function(){
   $.ajax({
       url:'php/needGene.php',
   }).done(function(result){
      $("div#needGene").html(result);
   });
});

//display litter missing some gene at open page
$(document).ready(function(){
    $.ajax({
        url:'php/needGene2.php',
        }).done(function(result){
        $("div#searchLitterDiv").hide();
        $("div#updateGene").show();
        $("div#updateGene").html(result);
    });
});
/*
//refresh updateGene with expand
$(document).ready(function(){
    $("#expand2").on('click', function(){
        $("div#updateGene_mouse").html('');
        $.ajax({
            url:'php/needGene2.php',
            }).done(function(result){
            //$("div#searchLitterDiv").hide();
            $("div#updateGene").show();
            $("div#updateGene").html(result);
        });
    })
});
*/

//hide or show litter section 2 and adjust mouse section height
$(document).ready(function(){
    $("#close2").on('click', function(){
        //work together with refresh at expand. have all or none.

        //var confirmRefresh = confirm("If you click 'OK', the list section will be closed to save space. When you expand the section again, this list of litters that need update will be refreshed AND any table you selected from this list will be cleared.\n\nAre you sure you want to refresh?");
        //if (confirmRefresh){
            $("div#updateGene").hide();
            $("#expand2").show();
            $("#close2").hide();
            $("div#updateGene_mouse").css('height','auto');
            //$("table.litter2").remove();
            //$("div#updateGene_mouse").empty();//work together with refresh at expand
        //}
   });
    $("#expand2").on('click', function(){
        $("div#updateGene").show();
        $("#expand2").hide();
        $("#close2").show();
        //$("div#updateGene_mouse").css('height','470px');//should only have height when litter selected!!!!!!!!!!!!!!!!!!!!!!!!!!
   });
});

//hide or show litter section 1 and adjust mouse section height
$(document).ready(function(){
    $("#close1").on('click', function(){
        $("div#needGene").hide();
        $("#expand1").show();
        $("#close1").hide();
        $("div#needGene_mouse").css('height','auto');
   });
    $("#expand1").on('click', function(){
        $("div#needGene").show();
        $("#expand1").hide();
        $("#close1").show();
        $("div#needGene_mouse").css('height','470px');
   });
});

//toggle check & alter
$(document).ready(function(){
    $("#toggleSearch").on('mouseenter', function(){
        $(this).css('color','#f26522');
    });
    $("#toggleSearch").on('mouseleave', function(){
        $(this).css('color','#ccc');
    });
    $("#toggleSearch").on('click', function(){
        //show check and alter if not present
        if($("div#searchLitterDiv").css("display")=='none'){
            $("div#searchLitterDiv").show();
            $("table.searchLitter").show();
            $("div#searchGene_mouse").show();
            $("div#needGene").hide();
            $("div#needGene_mouse").hide();
            $("div#updateGene").hide();
            $("div#updateGene_mouse").hide();// as above

            $(".expand").show();
            $(".close").hide();
            $("label#submitLogLitter").hide();
        }
        //hide check and alter and display other
        else {
            if ($("table.litter tr").find('input.select:checked').length>0){
                $("div#searchLitterDiv").hide();
                $("table.searchLitter").hide();
                $("div#searchGene_mouse").hide();
                //needGene_mouse has table present, so show
                $("div#needGene").show();
                $("div#needGene_mouse").show();
                //needGene_mouse has table shown, so no updateGene
                $("div#updateGene").hide();
                $("div#updateGene_mouse").hide();
                $("#expand1").hide();
                $("#close1").show();
                $("label#submitLogLitter").show();
            }
            else if ($("table.litter2 tr").find('input.select2:checked').length>0){
                $("div#searchLitterDiv").hide();
                $("table.searchLitter").hide();
                $("div#searchGene_mouse").hide();
                //updateGene_mouse has table shown, so no need to show needGene
                $("div#needGene").hide();
                $("div#needGene_mouse").hide();
                //updateGene_mouse has table present, so show
                $("div#updateGene").show();
                $("div#updateGene_mouse").show();
                $("#expand2").hide();
                $("#close2").show();
                $("label#submitLogLitter").show();
            } else if ($("table.litter tr").find('input.select:checked').length<1 && $("table.litter2 tr").find('input.select2:checked').length<1){
                $("div#searchLitterDiv").hide();
                $("table.searchLitter").hide();
                $("div#searchGene_mouse").hide();
                //so litter selected, so show the 2 litter lists
                $("div#needGene").show();
                $("div#needGene_mouse").hide();
                $("div#updateGene").show();
                $("div#updateGene_mouse").hide();
                $(".expand").hide();
                $(".close").show();
                $("label#submitLogLitter").show();
            }
        }
    })
});
//no focus in search form then short div, otherwise long div
$(document).ready(function(){
    $("*").on('click', function(){
        if(!$("#searchStrain").is(':focus') && !$("#searchCage").is(':focus') && !$("#cageNr").is(':focus') && !$("#eartag").is(':focus') && !$("#birthYear").is(':focus') && !$("#birthWeek").is(':focus') && !$("#weanYear").is(':focus') &&  !$("#weanWeek").is(':focus')){
        $("div#searchLitterDiv").css('height','60px');
        } else {
            $("div#searchLitterDiv").css('height','170px');
        }
    })
});

//search strain get hint
$(document).ready(function(){
    $("#searchStrain").on('keyup', function(){
       var inputStrain = $("#searchStrain").val();
        if ($.trim(inputStrain).length !==0){
       $.ajax({
           url:'php/getStrainHint.php',
           method:'get',
           data: {
               inputStrain: inputStrain,
           }
       }).done(function(hint){
           if(hint.indexOf('...')>-1){
                $("div#searchLitterDiv").css('height','170px');
                $("#hintStrain").show();
                $("#hintStrain").html(hint);
                $("#hintCage").hide();
           } else if(hint.indexOf('suggestion')>-1){
                $("div#searchLitterDiv").css('height','170px');
                $("#hintStrain").show();
                $("#hintStrain").html(hint);
                $("#hintCage").hide();
           } else {
                $("#searchStrain").val(hint);
               //prevent typing after match is found and value is set, so no charactor is added behind the correct strain
                $("#searchStrain").blur();
                $("#searchStrain").next().focus();
                $(".hint").hide();
                $("div#searchLitterDiv").css('height','170px');
           }
       });} else {
           $("#hint").hide();
           $("#searchStrain").val('');
       }
   });
    $("#searchStrain").on('blur', function(){
           $("#hintStrain").hide();
   })
});


//set focusout cuz if 1 single strain can be part of a multi strain, then no way to find unique. when focusout, the value should be the one wanted
$(document).ready(function(){
    $("#searchStrain").on('focusout', function(){
       var inputStrain = $("#searchStrain").val();
       $.ajax({
           url:'php/getStrainHint.php',
           method:'get',
           data: {
               inputStrain: inputStrain,
           }
       }).done(function(hint){
           if(hint.indexOf('suggestion')>-1){
                $("div#searchLitterDiv").css('height','170px');
                $("#hint").show();
                $("#hint").html(hint);
           } else {
                $("#searchStrain").val(inputStrain);
               //prevent typing after match is found and value is set, so no charactor is added behind the correct strain
                $("#searchStrain").blur();
                $("#searchStrain").next().focus();
                $("#hint").hide();
                $("div#searchLitterDiv").css('height','170px');
           }
        });
    });
    $("#searchStrain").on('blur', function(){
           $("#hint").hide();
   })
});

// search cage get hint
$(document).ready(function(){
    $("#searchCage").on('keyup', function(){
        //only perform hint cage when there is no strain present
        var inputStrain = $("#searchStrain").val();
        if ($.trim(inputStrain).length == 0){

            var inputCage = $("#searchCage").val();
            if ($.trim(inputCage).length !==0 ){
            $.ajax({
               url:'php/getCageHint.php',
               method:'get',
               data: {
                   inputCage: inputCage,
               }
            }).done(function(hint){
               if(hint.indexOf('...')>-1){
                $("div#searchLitterDiv").css('height','170px');
                $("#hintStrain").hide();
                $("#hintCage").show();
                $("#hintCage").html(hint);
               } else if(hint.indexOf('suggestion')>-1){
                    $("div#searchLitterDiv").css('height','170px');
                    $("#hintCage").show();
                    $("#hintCage").html(hint);
                    $("#hintStrain").hide();
               } else {
                    $("#searchCage").val(hint);
                    $.ajax({
                        url:'php/matchStrain.php',
                        data:{
                            inputCage:hint,
                        }
                    }).done(function(strain){
                        $("#searchStrain").val(strain);
                    });
                    //prevent typing after match is found and value is set, so no charactor is added behind the correct cage
                    $("#searchCage").blur(); //??????????????seems this will trigger getHint
                    //$("#searchCage").next().focus();
                    $("#eartag").val('');
                    $(".hint").hide();
                    $("div#searchLitterDiv").css('height','170px');

                }
                });} else {
                    $("#hint").hide();
                    $("#searchCage").val('');
                }
            }
        });
   });

//set focusout cuz if cage name is simple, it can be part of another cage name, then no way to find unique. when focusout, the value should be the one wanted
$(document).ready(function(){
    $("#searchCage").on('focusout', function(){
       var inputCage = $("#searchCage").val();
       $.ajax({
           url:'php/getCageHint.php',
           method:'get',
           data: {
               inputCage: inputCage,
           }
       }).done(function(hint){
           if(hint.indexOf('suggestion')>-1){
                $("div#searchLitterDiv").css('height','170px');
                $("#hint").show();
                $("#hint").html(hint);
           } else {
                $("#searchCage").val(inputCage);
               //prevent typing after match is found and value is set, so no charactor is added behind the correct strain
                $("#searchCage").blur();
                $("#searchCage").next().focus();
                $("#hint").hide();
                $("div#searchLitterDiv").css('height','170px');
                $.ajax({
                    url:'php/matchStrain.php',
                    data:{
                        inputCage:inputCage,
                    }
                }).done(function(strain){
                    $("#searchStrain").val(strain);
                });
           }
       });
   });
    $("#searchCage").on('blur', function(){
           $("#hint").hide();
   })
});
//auto set wean year
//************** need refine ********************or no birth time
$(document).ready(function(){
    $("#searchLitter input#birthYear").on('blur', function(){
        var bY = parseInt($("#searchLitter input#birthYear").val());
        if (bY == 2016 || bY == 2015){
            $("#searchLitter input#weanYear").val('2016');
        }
    })
});

//submit search form
$(document).ready(function(){
   $("form#findUpdate").submit(function(){

       if($("#searchStrain").val() !=='' && $("#eartag").val() ==''){
           if ($("#cageNr").val() !=='' && $("#birthYear").val() !=='' && $("#birthWeek").val() !=='' && $("#weanYear").val() !=='' && $("#weanWeek").val() !==''){
                    var strain = $("#searchStrain").val();
                    var cageNr = $("#cageNr").val();
                    var bY = $("#birthYear").val();
                    var bW = $("#birthWeek").val();
                    var wY = $("#weanYear").val();
                    var wW = $("#weanWeek").val();
                    $.ajax({
                        url:'php/searchLitter.php',
                        method:'get',
                        data: {
                            strain: strain,
                            cageNr: cageNr,
                            bY: bY,
                            bW: bW,
                            wW: wW,
                            wY: wY,
                        }
                    }).done(function(result){
                        $(".hint").hide();
                        $("div#searchLitterDiv").css('height','60px');
                        $("#needGene_mouse").hide();
                        $("#searchGene_mouse").show();
                        $("#searchGene_mouse").html(result);
                    })} else {
                        alert ('To search a litter, please fill out all fileds except (eartag)');
                    }
               } else if ($("#searchStrain").val() !=='' && $("#eartag").val() !==''){
                   $("#searchCage").val('');
                   $("#cageNr").val('');
                   $("#birthYear").val('');
                   $("#birthWeek").val('');
                   $("#weanYear").val('');
                   $("#weanWeek").val('');

                    var strain = $("#searchStrain").val();
                    var eartag = $("#eartag").val();
                    $.ajax({
                        url:'php/searchMouse.php',
                        method:'get',
                        data:{
                            strain: strain,
                            eartag: eartag,
                        }
                    }).done(function(result){
                        $(".hint").hide();
                        $("div#searchLitterDiv").css('height','60px');
                        $("#needGene_mouse").hide();
                        $("#searchGene_mouse").show();
                        $("#searchGene_mouse").html(result);
                    })
               } else {
                   alert ('Either search based on litter info\nor with strain + eartag');
               };
   //}
   return false; //so no page reload
   })
});

//clear input field, start over
$(document).ready(function(){
   $('button#startOver').on('click', function(){
       $("#searchStrain").val('');
       $("#eartag").val('');
       $("#searchCage").val('');
       $("#cageNr").val('');
       $("#birthYear").val('');
       $("#birthWeek").val('');
       $("#weanYear").val('');
       $("#weanWeek").val('');
   })
});


//clear table field
$(document).ready(function(){
   $('button#clear').on('click', function(){
       $('#searchGene_mouse').empty();
       //reload needGene area so no duplicated table after try update
       $.ajax({
        url:'php/needGene.php',
        }).done(function(result){
        $("div#needGene").html(result);
        });
       //window.open('logGene.html','_self');
   })
});

//toggle summary div
$(document).ready(function(){
    $("div#summary").on('mouseenter', function(){
        $(this).css('bottom','7px');
    });
    $("div#summary").on('mouseleave', function(){
    $(this).css('bottom','-470px');
    })
})



