$(function() {
    //Read the cookie, if it has been previously set
    var language = $.cookie( 'language' );
    
    //Set language to previously set value
    !language || $('#languages').val( language );
  
    //Set up an event listener to update the cookie whenever language is changed
    $('#languages').on('change', function() {
        language = this.value
        $.cookie( 'language', language );
        switch_content_language(language);
    })
    //Set cookie to default language when page loads;
    .change();
    
    //alert( language );
});

function switch_content_language(language) {
   // When the user takes action to change language, ie, clicks a flag icon
   //if ( selected_language == 'hebrew' ) hebrew_pls();
   //alert(language);
   switch(language)
   {
    case "en":
        // if($('.thread-time').is(':contains("month")')) {
        //   $(".thread-time").replaceWith("月");
        // }
        $('.section-header').text("Contact Us");
        $('.contactUsText').html("You can mail your ideas, questions or problems to <a href=\"mailto:support@noscolor.com\">NOSCOLOR</a>, or you can simply fill out the form below and we will get back to you as soon as we can!");
        $("#contact_us_message").attr("placeholder", "Let us know your thoughts, a link could be very helpful!");
        $("#contact_us_submit").attr("value", "Submit!");
    break;
    case "zh":
        $('.section-header').text("聯繫我們");
        $('.contactUsText').html("您可以將您的問題, 任何提議或想法寄到 <a href=\"mailto:support@noscolor.com\">NOSCOLOR</a>, 又或者填寫以下表格, 我們將盡快與您聯繫！");
        $("#contact_us_message").attr("placeholder", "讓我們知道您的想法，附加網址鏈接可能會很有幫助！");
        $("#contact_us_submit").attr("value", "提交!");
    break;
   }
   
}