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
        //search modal form
        $('#modal_thread_add').text("Add Product");
        $('.modal-url').text("Official Product webpage");
        $('.modal-brand').text("Brand Name");
        $('.modal-product-name').text("Product Name");
        $('.modal-category').text("Product Category");
        $("#threadAddContent").text("Add");
    break;
    case "zh":
        //search modal form
        $('#modal_thread_add').text("添加入產品");
        $('.modal-url').text("官方產品網站");
        $('.modal-brand').text("品牌名稱");
        $('.modal-product-name').text("產品名稱");
        $('.modal-category').text("產品類別");
        $("#threadAddContent").text("添加");
    break;
   }
   
}