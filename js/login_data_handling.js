
function check_login(){
   	$.ajax({
        type: 'POST',
        url: '/php/datahandling/login/login_form.php',
        data: { emailAddress : $('#emailAddress').val() , password : $('#password').val(), remember : $('#remember').is(":checked") },
        success: function(response){
        	console.log(response);
            if(response === 'Correct'){
               location.reload();
            }
            else if(response === 'napproved'){
            		$('.login_messageText').empty()
            		$('.login_messageImage').empty()
	           	 	$('.login_messageText').append('Your account has not yet been validated.')
	           	 	//$(".login_messageImage").append('<img src="images/error.png" height="50" width="50">')
	           	 	$('.login_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'Incorrect'){
           		    $('.login_messageText').empty()
            		$('.login_messageImage').empty()
	            	$('.login_messageText').append('The login information you have entered is incorrect.')
	            	//$(".login_messageImage").append('<img src="images/error.png" height="50" width="50">')
	           	 	$('.login_message').slideDown(400).delay(10000).fadeOut(400)
	           	 		           	 	         
	        }
	        else if(response === 'nemail'){
            		$('.login_messageText').empty()
            		$('.login_messageImage').empty()
	           	 	$('.login_messageText').append('Please enter an email.')
	           	 	//$(".login_messageImage").append('<img src="images/error.png" height="50" width="50">')
	           	 	$('.login_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'npassword'){
            		$('.login_messageText').empty()
            		$('.login_messageImage').empty()
	           	 	$('.login_messageText').append('Please enter a password')
	           	 	//$(".login_messageImage").append('<img src="images/error.png" height="50" width="50">')
	           	 	$('.login_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else{
            		$('.login_messageText').empty()
            		$('.login_messageImage').empty()
	      	        $('.login_messageText').append('There was an unknown error.  Please try again later.')
	           	 	//$(".login_messageImage").append('<img src="images/error.png" height="50" width="50">')
	           	 	$('.login_message').slideDown(400).delay(10000).fadeOut(400)            
           }
       }  
    });
};

function resend(){
    $.ajax({
        type: 'POST',
        url: '/php/datahandling/login/resend_email.php',
        data: { emailAddress : $('#resendEmail').val() , password : $('#resendpw').val() },
        success: function(response){
            console.log(response);
            if(response === 'Correct'){
                $('.resend_messageText').empty()
                $('.resend_messageText').append('Your account has been validated.')
                $('.resend_messageText').slideDown(400).delay(10000).fadeOut(400)
               location.reload();
            }
            else if(response === 'napproved'){
                    $('.resend_messageText').empty()
                    $('.resend_messageText').append('Please check your email for a validation link (check junk box too!).')
                    $('.resend_messageText').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'Incorrect'){
                    $('.resend_messageText').empty()
                    $('.resend_messageText').append('The account information you have entered is incorrect.')
                    $('.resend_messageText').slideDown(400).delay(10000).fadeOut(400)
                                                 
            }
            else if(response === 'nemail'){
                    $('.resend_messageText').empty()
                    $('.resend_messageText').append('Please enter an email.')
                    $('.resend_messageText').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'npassword'){
                    $('.resend_messageText').empty()
                    $('.resend_messageText').append('Please enter a password')
                    $('.resend_messageText').slideDown(400).delay(10000).fadeOut(400)
            }
            else{
                    $('.resend_messageText').empty()
                    $('.resend_messageText').append('There was an unknown error.  Please try again later.')
                    $('.resend_messageText').slideDown(400).delay(10000).fadeOut(400)            
           }
       }
    });
};

function registerUser(){
    $.ajax({
        type: 'POST',
        url: '/php/datahandling/login/register_form.php',
        data: { username : $('#registerUsername').val() , password : $('#registerPassword').val() , email : $('#registerEmail').val() , password2 : $('#registerPassword2').val() , email2 : $('#registerEmail2').val() , task : "register" },
        success: function(response){
        	console.log(response);
            if(response === 'Correct'){
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
               		$('.register_messageText').append('Please check your email for a validation link (check junk box too!).  You will be redirected in 5 seconds.');
	           	 	$(".register_messageImage").append('<img src="images/success.png" height="50" width="50">');
					$(".modalcontainer").hide();
	           	 	$('.register_message').slideDown(400).delay(10000);
					setTimeout(function() {
						window.location.replace("/");
					}, 6000);
					
            }
            else if(response === 'utaken'){
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
	           	 	$('.register_messageText').append('That username is already taken.');
	           	 	$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'eused'){
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
	            	$('.register_messageText').append('That email address is already registered.');
	            	$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	            	$('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'einvalid'){
                    $('.register_messageText').empty()
                    $('.register_messageImage').empty()
                    $('.register_messageText').append('Email invalid.');
                    $(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'pwinvalid'){
                    $('.register_messageText').empty()
                    $('.register_messageImage').empty()
                    $('.register_messageText').append('Password cannot contain &, =, ", \', / or \\ and at least 6 characters long.');
                    $(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'uinvalid'){
                    $('.register_messageText').empty()
                    $('.register_messageImage').empty()
                    $('.register_messageText').append('Username cannot contain &, =, ", \', / or \\.');
                    $(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'nusername'){
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
	            	$('.register_messageText').append('Please enter a username.');
	            	$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	            	$('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'nusernamelong'){
                    $('.register_messageText').empty()
                    $('.register_messageImage').empty()
                    $('.register_messageText').append('Username must be within 20 characters.');
                    $(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'npassword'){
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
	            	$('.register_messageText').append('Passwords do not match.');
	            	$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	            	$('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'nemail'){
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
	            	$('.register_messageText').append('Emails do not match.');
	            	$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	            	$('.register_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else{
            		$('.register_messageText').empty()
            		$('.register_messageImage').empty()
	            	$('.register_messageText').append('There was an unknown error.  Please try again later.');
	           	 	$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.register_message').slideDown(400).delay(10000).fadeOut(400)	            
            }
        }
    });
};

function forgot(){
    $.ajax({
        type: 'POST',
        url: '/php/datahandling/login/forgot_form.php',
        data: { email : $('#forgotEmail').val() },
        success: function(response){
        	console.log(response);
            if(response === 'Correct'){
            		$('.forgot_messageText').empty()
            		$('.forgot_messageImage').empty()
               		$('.forgot_messageText').append('Please check your email for a reset link (check junk box too!).');
	           	 	$(".forgot_messageImage").append('<img src="images/success.png" height="50" width="50">');
	           	 	$('.forgot_message').slideDown(400).delay(10000).fadeOut(400)
	           	 	$('#forgotEmail').empty()
            }
            else if(response === 'nemail'){
            		$('.forgot_messageText').empty()
            		$('.forgot_messageImage').empty()
	           	 	$('.forgot_messageText').append('Please enter an email address.');
	           	 	$(".forgot_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.forgot_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'enot'){
            		$('.forgot_messageText').empty()
            		$('.forgot_messageImage').empty()
	            	$('.forgot_messageText').append('That email address is not registered.');
	            	$(".forgot_messageImage").append('<img src="images/error.png" height="50" width="50">');
	            	$('.forgot_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else{
            		$('.forgot_messageText').empty()
            		$('.forgot_messageImage').empty()
	      	        $('.forgot_messageText').append('There was an unknown error.  Please try again later.');
	           	 	$(".forgot_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.forgot_message').slideDown(400).delay(10000).fadeOut(400)	            
            }
        }
    });
};

function reset_password(){
   	$.ajax({
        type: 'POST',
        url: '/php/datahandling/login/reset_form.php',
        data:  { ticket : $('#ticket').val() , newPassword : $('#newPassword').val() , email : $('#email').val() , newPassword2 : $('#newPassword2').val() },
        success: function(response){
        	console.log(response);
            if(response === 'reset'){
            		$('.reset_messageText').empty()
            		$('.reset_messageImage').empty()
               		$('.reset_messageText').append('Your new password is <i style="color:#00bfff;">"' + $('#newPassword').val() + '"</i>');
	           	 	$(".reset_messageImage").append('<img src="images/success.png" height="50" width="50">');
	           	 	$('.reset_message').slideDown(400).delay(10000).fadeOut(400)
	           	 	$('#newPassword').empty()
                    window.location.href = "/";
            }
            else if(response === 'npassword'){
            		$('.reset_messageText').empty()
            		$('.reset_messageImage').empty()
               		$('.reset_messageText').append('Passwords not match.');
	           	 	$(".reset_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.reset_message').slideDown(400).delay(10000).fadeOut(400)
	           	 	$('#newPassword').empty()
            }
            else if(response === 'pwinvalid'){
                    $('.reset_messageText').empty()
                    $('.reset_messageImage').empty()
                    $('.reset_messageText').append('Password cannot contain &, =, ", \', / or \\ and at least 6 characters long.');
                    $(".reset_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.reset_message').slideDown(400).delay(10000).fadeOut(400)
                    $('#newPassword').empty()
            }
            else if(response === 'brequest'){
            		$('.reset_messageText').empty()
            		$('.reset_messageImage').empty()
	           	 	$('.reset_messageText').append('Bad reset request.  Please apply for new reset link.');
	           	 	$(".reset_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.reset_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else{
            		$('.reset_messageText').empty()
            		$('.reset_messageImage').empty()
	      	        $('.reset_messageText').append('There was an unknown error.  Please try again later.');
	           	 	$(".reset_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.reset_message').slideDown(400).delay(10000).fadeOut(400)	            
           }
       }
    });
};

function change_password(){
   	$.ajax({
        type: 'POST',
        url: '/php/datahandling/login/change_form.php',
        data: "ticket=" + $('#ticket').val() + "&newPassword=" + $('#newPassword').val() + "&username=" + $('#username').val(),
        success: function(response){
        	console.log(response);
            if(response === 'reset'){
            		$('.change_messageText').empty()
            		$('.change_messageImage').empty()
               		$('.change_messageText').append('Your new password is <i style="color:#00bfff;">"' + $('#newPassword').val() + '"</i>');
	           	 	$(".change_messageImage").append('<img src="images/success.png" height="50" width="50">');
	           	 	$('.change_message').slideDown(400).delay(10000).fadeOut(400)
	           	 	$('#newPassword').empty()
            }
            else if(response === 'npassword'){
            		$('.change_messageText').empty()
            		$('.change_messageImage').empty()
               		$('.change_messageText').append('Please enter a new password.');
	           	 	$(".change_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.change_message').slideDown(400).delay(10000).fadeOut(400)
	           	 	$('#newPassword').empty()
            }
            else{
            		$('.change_messageText').empty()
            		$('.change_messageImage').empty()
	      	        $('.change_messageText').append('There was an unknown error.  Please try again later.');
	           	 	$(".change_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.change_message').slideDown(400).delay(10000).fadeOut(400)	            
           }
       }
    });
 };

 function logoutajax()
{
    $.ajax({
        type: 'GET',
        url: '/php/datahandling/login/logout.php',
        success: function(response) {
            console.log(response);
            if (response == 'loggedOut') {
                location.reload();
            }
        }
    });
}  
function changeusernamepw(){
    console.log("changeusernamepw");
    var email = $("#email").val();
    //var newusername = $("#newusername").val();
    var password = $("#oldpassword").val();
    var newpassword = $("#newpassword").val();
    var newpassword2 = $("#newpassword2").val();
    var changepw = true;
    $.ajax({
        type: "POST",
        url: "/php/datahandling/login/change_form.php",
        data: {email: email, password : password, newpassword : newpassword, newpassword2 : newpassword2, changepw: changepw},
        /*dataType: 'json',*/
        cache: false,
        success: function(response){
            console.log(response)
            if(response === 'reset'){
                $('.changeinfo_messageText').empty()
                $('.changeinfo_messageImage').empty()
                $('.changeinfo_messageText').append('Password updated.');
                $(".changeinfo_messageImage").append('<img src="images/success.png" height="50" width="50">');
                $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)
                //$('#email').empty()
                //$('#newusername').empty()
                $('#newpassword').empty()
                $('#newpassword2').empty()
                //$('#changepw').empty()
                location.reload();
            }
            else if(response === 'utaken'){
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('That username is already taken.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'pwinvalid'){
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('Password cannot contain &, =, ", \', / or \\ and at least 6 characters long.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'uinvalid'){
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('Username cannot contain &, =, ", \', / or \\.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'nusername'){
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('Please enter a username.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'npassword'){
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('New passwords do not match.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if (response ==='Incorrect'){
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('Current password incorrect.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)               
            }
            else{
                    $('.changeinfo_messageText').empty()
                    $('.changeinfo_messageImage').empty()
                    $('.changeinfo_messageText').append('There was an unknown error.  Please try again later.');
                    $(".changeinfo_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.changeinfo_message').slideDown(400).delay(10000).fadeOut(400)               
            }
        },
        error: function(data){
            console.log(data);
        }
    });
}
function updateuserinfo(){
    console.log("updateuserinfo fun");
    var sex = $("#sex").val();
    var birthday = $("#birthday").val();
    var skintype = $("#skintype").val();
    var phoneno = $("#phoneno").val();
    var address = $("#address").val();
    $.ajax({
        type: "POST",
        url: "/php/datahandling/updateuserinfo.php",
        data: {sex : sex, birthday : birthday, skintype : skintype, phoneno : phoneno,  address : address}, 
        /*dataType: 'json',*/
        cache: false,
        success: function(response){
            console.log(response);
            $('html, body').scrollTop(0);
            document.getElementById("promtmessage").style.display = 'block';
            document.getElementById("promtmessage").innerHTML = "<h4 class=\"alert-heading\">Personal Information Updated.</h4>";

        },
        error: function(data){
            console.log(data);
        }
    });
}
