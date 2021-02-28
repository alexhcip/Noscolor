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
        $('#profile_username').text("Username:");
        $('#profile_like_record').text("Liked Product");
        $('#profile_content_record').text("Liked Content");
        $('.change-username-and-pw').text("Change Password");
        $('#profile_email').text("Email:");
        $('#profile_gender').text("Gender:");
        $('#profile_birthday').text("Birthday:");
        $('.age-instruction').text("Your age will only show up in range (e.g. 21-25 years old)");
        $('#profile_skincare').text("Skintype:");
        $('.skintype-instruction').html("Not sure of your skintype?  Check out this amazing <a href=\"https://www.reddit.com/r/SkincareAddicts/comments/30trop/determining_your_skin_type/\" target=\"blank\">Reddit post</a> or this <a href=\"https://www.youtube.com/watch?v=hcnyRhOKCRk\" target=\"blank\">video</a> from Kiehl's!");
        $('#profile_posts').text("Total Posts:");
        $('#profile_likes').text("Total Like Received:");
        $('#profile_save_changes').text("Save Changes");
        $("#profile_cancel_changes").attr("value", "Cancel");
    break;
    case "zh":
        $('#profile_username').text("帳號名稱:");
        $('#profile_like_record').text("最愛產品");
        $('#profile_content_record').text("最愛討論內容");
        $('.change-username-and-pw').text("更改密碼");
        $('#profile_email').text("電郵:");
        $('#profile_gender').text("性別:");
        $('#profile_birthday').text("出生日期:");
        $('.age-instruction').text("您的年齡只會顯示在範圍內（例如21-25歲）");
        $('#profile_skincare').text("皮膚性質:");
        $('.skintype-instruction').html("不確定您的皮膚性質？  看看這個有用的<a href=\"https://www.reddit.com/r/SkincareAddicts/comments/30trop/determining_your_skin_type/\" target=\"blank\">Reddit 帖子</a>或Kiehl's這條<a href=\"https://www.youtube.com/watch?v=hcnyRhOKCRk\" target=\"blank\">短片</a>吧!");
        $('#profile_posts').text("發佈帖數:");
        $('#profile_likes').text("收到的讚數:");
        $('#profile_save_changes').text("保存更改");
        $("#profile_cancel_changes").attr("value", "取消");
    break;
   }
   
}