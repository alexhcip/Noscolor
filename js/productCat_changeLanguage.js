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
        $('.section-header').text("Product Category");
        $('#product_category_makeup').text("Makeup");
        $('#product_category_skincare').text("Skincare");
        $('#product_category_fragrance').text("Fragrance");
    break;
    case "zh":
        // if($('.thread-time').is(':contains("month")')) {
        //   var str = $('.thread-time').text()
        //   var res = str.replace("months", "月");
        //   $(".thread-time").text(res);
        // }
        $('.section-header').text("產品分類");
        $('#product_category_makeup').text("化妝品");
        $('#product_category_skincare').text("護膚品");
        $('#product_category_fragrance').text("香水");
    break;
   }
   
}