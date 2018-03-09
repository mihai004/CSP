$(document).ready(function(){

    $(".custom-select").each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name");
        var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
            template += '<span  class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function() {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function() {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function() {
        $('html').one('click',function() {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });


    $("#myCarousel").carousel();

    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#myCarousel").carousel(0);
    });
    $(".item2").click(function(){
        $("#myCarousel").carousel(1);
    });
    $(".item3").click(function(){
        $("#myCarousel").carousel(2);
    });

    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#myCarousel").carousel("next");
    });

    $('.addToCart').click(function(e){
        var productID = $(this).attr("data-id");
        var userID = $('#userID').attr("value");
        $.post('cartFunctions.php', {
            'addToCart': "true",
            'productID': productID
        }, function(data) {
            if(userID > 1) {
                $("#response").html("The Book was successfully added").focus();
                setTimeout(function () {
                    $("#response").html(" ");
                }, 2500);
            }else{
                $("#response").html("You need to log in first");
                setTimeout(function () {
                    $("#response").html(" ");
                }, 2500);
            }
        });
    });

    $('.addToCartPlus').click(function(e){
        var productID = $(this).attr("data-id");
        var quantity = $(this).attr("data-quantity");
        var quanId ='#'+quantity; // generate an id for the value
        $.post('cartFunctions.php', {
            'addToCart': "true",
            'productID': productID
        }, function(data) {
            $(quanId).html(data);
        });
        location.reload();
    });

    $('.removeFromCart').click(function(){
        var productID = $(this).attr("data-id");
         $.post('cartFunctions.php', {
            'removeFromCart': "true",
            'productID': productID
        }, function(data) {
        });
    });

    $('.removeFromCartMinus').click(function(){
        var productID = $(this).attr("data-id");
        var quantity = $(this).attr("data-quantity");
        var quanId ='#'+quantity;
        $.post('cartFunctions.php', {
            'removeFromCartMinus': "true",
            'productID': productID
        }, function(data) {
            if(data == ""){
                location.reload();
            }else{
                $(quanId).html(data);
            }
        });
        location.reload();
    });

    $('.clearCart').click(function(){
        $.post('cartFunctions.php', {
            'clearCart': "true",
        }, function(data) {
        });
    });

    // $("button#register").click(function(){
    //     $.ajax({
    //         type: "POST",
    //         url: "register.php",
    //         data: $('form.register').serialize(),
    //         success: function(message){
    //             $("#register").html(message);
    //             $("#register-modal").modal('hide');
    //         },
    //         error: function(){
    //             alert("Error");
    //         }
    //     });
    // });

    $("button#register").click(function(){
        $.ajax({
            type: "POST",
            url: "register.php",
            data: $('form.register').serialize(),
            success: function(message){
                $("#register").html(message);
            },
            error: function(){
                alert("Error");
            }
        });
    });


    $(function search() {

        $('a[href="#searching"]').on('click', function(event) {

            event.preventDefault();
            $('#searching').addClass('open');
            document.forms['searchForm'].elements['q'].focus();
        });

        if(event.keyCode === 13){
            event.preventDefault();
        }

        $('#searching, #searching button.close').on('click keyup', function(event) {
            var input = document.getElementById("mySearch").value;
          //  if(input.length !== 0) {
          //       if(event.keyCode === 13){
          //        //var input = document.getElementById("mySearch").value;
          //           alert("No input detected" + input);
          //       }
                if (event.target === this || event.target.className === 'close' || event.keyCode === 27) {
                    $(this).removeClass('open');
                }
            // } else {
            //          alert("else");
            // }
        });





        // $('q').search("keypress", function (e) {
        //     if (e.keyCode === 13) {
        //         e.preventDefault();
        //         e.stopPropagation();
        //     }
        // });

        // $('#searchForm').onkeypress('keypress', function (event) {
        //    if (event.keyCode === 8){
        //        alert("live");
        //    }
        // })
        // $('q').search(function(event) {
        //     if(event.keyCode === 8){
        //     // var searchingFor = $("#myText" ).val();
        //     alert("pl");
        //     }
        // });
    });

    // function showResult(str) {
    //     if (str.length===0) {
    //         document.getElementById("livesearch").innerHTML="";
    //         document.getElementById("livesearch").style.border="0px";
    //         return;
    //     }
    //     if (window.XMLHttpRequest) {
    //         // code for IE7+, Firefox, Chrome, Opera, Safari
    //         xmlhttp=new XMLHttpRequest();
    //     } else {  // code for IE6, IE5
    //         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    //     }
    //     xmlhttp.onreadystatechange=function() {
    //         if (this.readyState===4 && this.status===200) {
    //             document.getElementById("livesearch").innerHTML = this.responseText;
    //         }
    //     }
    //     xmlhttp.open("GET","backend-search.php?q="+str,true);
    //     xmlhttp.send();
    // }
    //
    // function getBook($book){
    //     $.ajax({
    //         type: "POST",
    //         url: "backend-search.php",
    //         data: $book,
    //         success: function(message){
    //             alert("yes" + book);
    //             // $("#register").html(message);
    //         },
    //         error: function(){
    //             alert("Error");
    //         }
    //
    //     })
    // };
    $

});
// //
function showResult(str) {
    if (str.length===0) {
        document.getElementById("livesearch").innerHTML="";
        document.getElementById("livesearch").style.border="0px";
        document.getElementById("livesearch").innerHTML = "No input";
        return;
    }
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (this.readyState===4 && this.status===200) {
            document.getElementById("livesearch").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET","product.php?q=" + str, true);
    xmlhttp.send();
}

function getBook(book){
    //alert(book);
     $.ajax({
         type: "POST",
         url: "product.php",
         data: book,
        success: function(){
             location.href = 'product.php?q=' + book;
            // $('#searching').removeClass('open');
            // alert("yes");
            // $("#register").html(message);
        },
        error: function(){
             alert("Error");
        }
    });
 }
