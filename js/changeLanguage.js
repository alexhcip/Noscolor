$(function() {
    //Read the cookie, if it has been previously set
    var language = $.cookie( 'language' );
    
    //Set language to previously set value
    !language || $('#languages').val( language );
  
    //Set up an event listener to update the cookie whenever language is changed
    $('#languages').on('change', function() {
        language = this.value
        $.cookie( 'language', language );
        switch_header_language(language);
    })
    //Set cookie to default language when page loads;
    .change();
    
    //alert( language );
});

function switch_header_language(language) {
   // When the user takes action to change language, ie, clicks a flag icon
   //if ( selected_language == 'hebrew' ) hebrew_pls();
   //alert(language);
   switch(language)
   {
    case "en":
        $('#header_discuss').text("Discuss");
        $('#header_product').text("Product");
        $('#header_brand').text("Brand");
        $('#header_contactUs').text("Contact Us");
        $('#header_profile').text("Profile");
        $('#header_signout').text("Sign Out");
        $('#header_login').text("Log In");
        $('#footer_home').text("Home");
        $('#footer_aboutUs').text("About Us");
        $('#footer_contactUs').text("Contact Us");

        //search modal form
        $('#modal_header_add').text("Add Product");
        $('.modal-url').text("Official Product webpage");
        $('.modal-brand').text("Brand Name");
        $('.modal-product-name').text("Product Name");
        $('.modal-category').text("Product Category");
        $("#addContent").text("Add");

        //log in modal form
        $('#modal_header_login').text("Log In");
        $('.modal-email').text("Email");
        $('.modal-password').text("Password");
        $("#submit").text("Login");
        // $('#remember').text("Remember me");
        $('.signup').html("Don't have an account yet? <a href=\"#\" onclick=\"document.getElementById('signinid').style.display='none' , document.getElementById('signupid').style.display='block'\">Sign Up</a>");
        $('.resend').html("<br>Can't receive confirmation email? <a href=\"#\" onclick=\"document.getElementById('signinid').style.display='none' , document.getElementById('resendid').style.display='block'\">Resend Email</a>");
        $('#forgot_password').text("Forgot password?");

        //Sign up modal form
        $('#modal_header_signup').text("Sign Up");
        $('#modal_username').text("Username");
        $('#modal_signup_button').text("Sign Up");
        $('.modal-login').html("Already a member? <a href=\"#\" onclick=\"document.getElementById('signupid').style.display='none' , document.getElementById('signinid').style.display='block'\">Log In</a>");

        //Forget password modal form
        $('#modal_header_forgetPassword').text("Forget Password");
        $('#modal_submit_button').text("Submit");

        //Resend email modal form
        $('#modal_header_resendEmail').text("Resend Confirmation Email");
        $('#modal_resend_email_button').text("Resend email");

        $('#warningPopUp_content').html("Please <a href=\"#\" onclick=\"document.getElementById('warningPopUp').style.display='none'; document.getElementById('signinid').style.display='block';\">Log In</a>")
        
    break;
    case "zh":
        $('#header_discuss').text("討論");
        $('#header_product').text("護膚化妝品");
        $('#header_brand').text("品牌");
        $('#header_contactUs').text("聯繫我們");
        $('#header_profile').text("帳號");
        $('#header_signout').text("登出");
        $('#header_login').text("登入");
        $('#footer_home').text("主頁");
        $('#footer_aboutUs').text("關於我們");
        $('#footer_contactUs').text("聯繫我們");

        //search modal form
        $('#modal_header_add').text("添加入產品");
        $('.modal-url').text("官方產品網站");
        $('.modal-brand').text("品牌名稱");
        $('.modal-product-name').text("產品名稱");
        $('.modal-category').text("產品類別");
        $("#addContent").text("添加");

        //log in modal form
        $('#modal_header_login').text("登入");
        $('.modal-email').text("電郵");
        $('.modal-password').text("密碼");
        $("#submit").text("登入");
        // $('#remember').text("Remember me");
        $('.signup').html("還未成為 Noscolor 用戶? <a href=\"#\" onclick=\"document.getElementById('signinid').style.display='none' , document.getElementById('signupid').style.display='block'\">立即登記</a>");
        $('.resend').html("<br>無法收到確認電郵? <a href=\"#\" onclick=\"document.getElementById('signinid').style.display='none' , document.getElementById('resendid').style.display='block'\">重發電郵</a>");
        $('#forgot_password').text("忘記密碼?");

        //Sign up modal form
        $('#modal_header_signup').text("登記帳戶");
        $('#modal_username').text("用戶名稱");
        $('#modal_signup_button').text("登記");
        $('.modal-login').html("已登記用戶? <a href=\"#\" onclick=\"document.getElementById('signupid').style.display='none' , document.getElementById('signinid').style.display='block'\">立即登入</a>");
        
        //Forget password modal form
        $('#modal_header_forgetPassword').text("忘記密碼");
        $('#modal_submit_button').text("提交");

        //Resend email modal form
        $('#modal_header_resendEmail').text("重發確認電郵");
        $('#modal_resend_email_button').text("重發電郵");

        $('#warningPopUp_content').html("請<a href=\"#\" onclick=\"document.getElementById('warningPopUp').style.display='none'; document.getElementById('signinid').style.display='block';\">登入</a>")
    break;
   }
   
}

// let arrLang = {
//     en: {
//         'home' : 'Home',
//         'about' : 'About Us',
//         'contact' : 'Contact US'
//     },

//     es: {
//         'home' : 'casa',
//         'about' : 'sobre nosotros',
//         'contact' : 'Contáctenos'
//     }
// }