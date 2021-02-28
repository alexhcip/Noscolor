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
        $('#discuss_title').text("Discuss");
        $('.addTopic-Button-Text').text("Topics");
        $('#forum_filter_option_1').text("Latest");
        $('#forum_filter_option_2').text("Popular");
        $('#forum_filter_option_3').text("Most Viewed");
        $('#forum_filter_option_4').text("Most Replied");
    break;
    case "zh":
        // if($('.thread-time').is(':contains("month")')) {
        //   var str = $('.thread-time').text()
        //   var res = str.replace("months", "月");
        //   $(".thread-time").text(res);
        // }
        $('#discuss_title').text("討論");
        $('.addTopic-Button-Text').text("發表主題");
        $('#forum_filter_option_1').text("最新");
        $('#forum_filter_option_2').text("熱門");
        $('#forum_filter_option_3').text("最多觀看");
        $('#forum_filter_option_4').text("最多回覆");
    break;
   }
   
}