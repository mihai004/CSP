$(document).ready(function(){

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
                $("#response").html("The Book was successfully added");
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

    $("button#register").click(function(){
        $.ajax({
            type: "POST",
            url: "register.php",
            data: $('form.register').serialize(),
            success: function(message){
                $("#register").html(message)
                $("#register-modal").modal('hide');
            },
            error: function(){
                alert("Error");
            }
        });
    });



    // function post()
    // {
    //     var email = document.getElementById("emailReg").value;
    //     var password = document.getElementById("passwordConfirm").value;
    //     if(email && password)
    //     {
    //         alert(email);
    //         $.ajax
    //         ({
    //             type: 'post',
    //             url: 'register.php',
    //             data:
    //                 {
    //                     user_email:email,
    //                     user_password: password
    //                 },
    //             success: function (response)
    //             {
    //                 document.getElementById("status").innerHTML="Form Submitted Successfully";;
    //
    //             }
    //         });
    //     }
    //
    //     return false;
    // }












    // gets text
    // var inputBox = document.getElementById('chatinput');
    // inputBox.onkeyup = function(){
    //     document.getElementById('printchatbox').innerHTML = inputBox.value;
    // }

    //  without refreshing the page




});