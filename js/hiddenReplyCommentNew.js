
$(document).ready(function()
{

// $("div[id^='reply_section_']").hide(); 
// $("div[id^='reply_box_comment_']").hide(); 

var hidereplySection = true;
var hidereplyBox = true;
var replySectionID = "";
var replyBoxID = "";
var temp = ""

//For toggling hidden replies
$(document).on("click", ".hiddenReplyToggle", function(e) {
    replySectionID = $(this).closest('div').attr('id');
    console.log(replySectionID);
    currentText = $("#"+replySectionID).text();
    console.log(currentText);
    temp = replySectionID.replace("check_", "");
    console.log(temp);
    $("#"+temp).toggle();
    e.preventDefault(); 
});

//For toggling reply box
$(document).on("click", ".replyBoxToggle", function(e) {
    replyBoxID = $(this).closest('div').attr('id');
    console.log(replyBoxID);
    if (isloggedin()){
        popUpBoxID = $(this).attr('id');
	    console.log(popUpBoxID);
	    popUpBoxNumber = popUpBoxID.replace("popUpBox_", "");
	    //$(".comment-dropdown-form:first").clone(true, true).appendTo($("#reply_box_comment_"+temp));
		$(".comment-dropdown-form").attr('id', "comment_dropdown_form_"+popUpBoxNumber)
		$(".comment-dropdown-container").attr('id', "comment_dropdown_container_"+popUpBoxNumber);
		$(".comment-dropdown-contentbox").attr('id', "comment_dropdown_contentbox_"+popUpBoxNumber);
		$(".dropdown-display").attr('id', "dropdown_display_"+popUpBoxNumber);
		$("#comment_dropdown_contentbox_"+popUpBoxNumber).empty();
		$("div[id^=\"dropdown_display_\"]").hide();
		//$.getScript("/js/image_drag_drop.js");
		//$("#reply_box_comment_"+temp).toggle();
		//allowImageDragDrop("comment_dropdown_contentbox_"+popUpBoxNumber);
    }
});

//For toggling disabled message in mobile devices
/*$(document).on("click", ".disabled", function(e) {
    document.getElementById('warningPopUp').style.display='block';
    console.log("Reply function is only available on desktop version for now, stay tune for update!");
});*/

//For popping up the modal form for adding comment
// $(".replyBoxToggle").click(function() {
//     popUpBoxID = $(this).attr('id');
//     console.log(popUpBoxID);
//     popUpBoxNumber = popUpBoxID.replace("popUpBox_", "");
//     //$(".comment-dropdown-form:first").clone(true, true).appendTo($("#reply_box_comment_"+temp));
// 	$(".comment-dropdown-form").attr('id', "comment_dropdown_form_"+popUpBoxNumber)
// 	$(".comment-dropdown-container").attr('id', "comment_dropdown_container_"+popUpBoxNumber);
// 	$(".comment-dropdown-contentbox").attr('id', "comment_dropdown_contentbox_"+popUpBoxNumber);
// 	$(".dropdown-display").attr('id', "dropdown_display_"+popUpBoxNumber);
// 	$("#comment_dropdown_contentbox_"+popUpBoxNumber).empty();
// 	$("div[id^=\"dropdown_display_\"]").hide();
// 	//$.getScript("/js/image_drag_drop.js");
// 	//$("#reply_box_comment_"+temp).toggle();
// 	//allowImageDragDrop("comment_dropdown_contentbox_"+popUpBoxNumber);
// });

});


