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
        $('#index_forum_header').text("Hot Topics");
        $('#more_topics').html("More Topics <i class=\"fas fa-caret-right\"></i>");
        $('#index_product_header').text("Featured Products");
        $('#more_products').html("More Products <i class=\"fas fa-caret-right\"></i>");
        $('#index_brand_header').text("Featured Brands");
        $('#more_brands').html("More Brands <i class=\"fas fa-caret-right\"></i>");
    break;
    case "zh":
        // if($('.thread-time').is(':contains("month")')) {
        //   var str = $('.thread-time').text()
        //   var res = str.replace("months", "月");
        //   $(".thread-time").text(res);
        // }
        $('#index_forum_header').text("熱門話題");
        $('#more_topics').html("更多話題 <i class=\"fas fa-caret-right\"></i>");
        $('#index_product_header').text("焦點產品");
        $('#more_products').html("更多產品 <i class=\"fas fa-caret-right\"></i>");
        $('#index_brand_header').text("人氣品牌");
        $('#more_brands').html("更多品牌 <i class=\"fas fa-caret-right\"></i>");
    break;
   }
   
}