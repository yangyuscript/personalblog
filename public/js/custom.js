


(function ($) {
    "use strict";
    var mainApp = {
        scroll_fun: function () {

            /*====================================
             SCROLL SCRIPTS 
            ======================================*/
            $(function () {
                $('.move-me a').bind('click', function (event) { //just pass move-me in design and start scrolling
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1000, 'easeInOutQuad');
                    event.preventDefault();
                });
            });

            

        },
         menu_fun: function () {

            /*====================================
                 EASING PLUGIN SCRIPTS 
                ======================================*/
            $(function () {
                $("#menu-close").click(function (e) {
                    e.preventDefault();
                    $("#sidebar-wrapper").toggleClass("active");
                });
                $("#menu-button").click(function (e) {
                    e.preventDefault();
                    $("#sidebar-wrapper").toggleClass("active");
                });

            });

        },

        
        custom_fun:function()
        {
            /*====================================
             WRITE YOUR   SCRIPTS  BELOW
            ======================================*/
            $("#go_regist").click(function(){
               $("#login_form").hide();
                $("#regist_form").show();
            });
            $("#go_login").click(function(){
               $("#login_form").show();
                $("#regist_form").hide();
            });
        },

    }
   
   
    $(document).ready(function () {
        mainApp.scroll_fun();
        mainApp.menu_fun();
        mainApp.custom_fun();
    });
}(jQuery));


