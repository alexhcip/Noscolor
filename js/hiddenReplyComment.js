
$(document).ready(function()
{
console.log("hihhi");

$("div[id^='reply_section_']").hide(); 
$("div[id^='reply_box_comment_']").hide(); 

/*window.onload = function(){
    $("div[id^='reply_section_']").hide(); 
    $("div[id^='reply_box_comment_']").hide(); 
};*/


//document.getElementsByClassName('btn btn-default btn-sm').onclick = reply_section_click;
//document.getElementsByClassName('btn btn-primary btn-sm').onclick = reply_click;

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
        //full = replyBoxID;
        temp = replyBoxID.replace("reveal_reply_box_", "");
        //This is the id number for each reply
        console.log(temp);
        //try to clone instead of toggle
        if (document.getElementById("comment_dropdown_form_"+temp)) {
            // yup, already there
            console.log("Here already");
            $("#reply_box_comment_"+temp).toggle();
        }
        else{
            console.log("Not here yet");
            console.log($(this));
            $(".comment-dropdown-form:first").clone(true, true).appendTo($("#reply_box_comment_"+temp));
            $("#reply_box_comment_"+temp+ " .comment-dropdown-form").attr('id', "comment_dropdown_form_"+temp)
            $("#reply_box_comment_"+temp+ " .comment-dropdown-container").attr('id', "comment_dropdown_container_"+temp);
            $("#reply_box_comment_"+temp+ " .comment-dropdown-contentbox").attr('id', "comment_dropdown_contentbox_"+temp);
            $("#reply_box_comment_"+temp+ " .dropdown-display").attr('id', "dropdown_display_"+temp);
            $("#comment_dropdown_contentbox_"+temp).empty();
            $("div[id^=\"dropdown_display_\"]").hide();
            $("#reply_box_comment_"+temp).toggle();
            //allowImageDragDrop("comment_dropdown_contentbox_"+temp);
            update_imgbb_btn();
        }
        e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
    }
    else{
        document.getElementById('warningPopUp').style.display='block';
        console.log("not logged in for like");
    }
});

//For toggling disabled message in mobile devices
/*$(document).on("click", ".disabled", function(e) {
    document.getElementById('warningPopUp').style.display='block';
    console.log("Reply function is only available on desktop version for now, stay tune for update!");
});*/

//For popping up the modal form for adding comment
$(".btn-success").click(function() {
    popUpBoxID = $(this).attr('id');
    console.log(popUpBoxID);
    popUpBoxNumber = popUpBoxID.replace("popUpBox_", "");
    //$(".comment-dropdown-form:first").clone(true, true).appendTo($("#reply_box_comment_"+temp));
	$("#comment_dropdown_form_0").attr('id', "comment_dropdown_form_"+popUpBoxNumber)
	$("#comment_dropdown_container_0").attr('id', "comment_dropdown_container_"+popUpBoxNumber);
	$("#comment_dropdown_contentbox_0").attr('id', "comment_dropdown_contentbox_"+popUpBoxNumber);
	$("#dropdown_display_0").attr('id', "dropdown_display_"+popUpBoxNumber);
	$("#comment_dropdown_contentbox_"+popUpBoxNumber).empty();
	$("div[id^=\"dropdown_display_\"]").hide();
	//$.getScript("/js/image_drag_drop.js");
	//$("#reply_box_comment_"+temp).toggle();
	//allowImageDragDrop("comment_dropdown_contentbox_"+popUpBoxNumber);
});

/*$("div[id^='check_reply_section_']").on("click", replySectionID, function(e)  //Trigger when click on any item in the dropdown menu
{
	//full = replySectionID;
	currentText = $("#"+replySectionID).text();
	console.log(currentText);
	temp = replySectionID.replace("check_", "");
	console.log(temp);
	$("#"+temp).toggle();
	if(currentText.indexOf("Check")>=0){
		$("#"+replySectionID)
	}
	else{

	}
	e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
});*/

/*$("div[id^='reveal_reply_box_']").on("click", replyBoxID, function(e)  //Trigger when click on any item in the dropdown menu
{
	if (isloggedin()){
		//full = replyBoxID;
		temp = replyBoxID.replace("reveal_reply_box_", "");
		//This is the id number for each reply
		console.log(temp);
		//try to clone instead of toggle
		if (document.getElementById("comment_dropdown_form_"+temp)) {
	    	// yup, already there
	    	console.log("Here already");
	    	$("#reply_box_comment_"+temp).toggle();
		}
		else{
			console.log("Not here yet");
			console.log($(this));
			$(".comment-dropdown-form:first").clone(true, true).appendTo($("#reply_box_comment_"+temp));
			$("#reply_box_comment_"+temp+ " .comment-dropdown-form").attr('id', "comment_dropdown_form_"+temp)
			$("#reply_box_comment_"+temp+ " .comment-dropdown-container").attr('id', "comment_dropdown_container_"+temp);
			$("#reply_box_comment_"+temp+ " .comment-dropdown-contentbox").attr('id', "comment_dropdown_contentbox_"+temp);
			$("#reply_box_comment_"+temp+ " .dropdown-display").attr('id', "dropdown_display_"+temp);
			$("#comment_dropdown_contentbox_"+temp).empty();
			$("div[id^=\"dropdown_display_\"]").hide();
			$("#reply_box_comment_"+temp).toggle();
			allowImageDragDrop("comment_dropdown_contentbox_"+temp);
		}
		e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
	}
	else{
		document.getElementById('warningPopUp').style.display='block';
		console.log("not logged in for like");
	}
});*/

/*function allowImageDragDrop(currentID){
	var handleDrag = function(e) {
        //kill any default behavior
        e.stopPropagation();
        e.preventDefault();
    };
    var handleDrop = function(e) {
        //kill any default behavior
        e.stopPropagation();
        e.preventDefault();
        //console.log(e);
        //get x and y coordinates of the dropped item
        x = e.clientX;
        y = e.clientY;
        //drops are treated as multiple files. Only dealing with single files right now, so assume its the first object you're interested in
        var file = e.dataTransfer.files[0];
        //don't try to mess with non-image files
        if (file.type.match('image.*')) {
            //then we have an image,

            //we have a file handle, need to read it with file reader!
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                //get the data uri
                var dataURI = theFile.target.result;
                console.log(dataURI);
                //make a new image element with the dataURI as the source
                var img = document.createElement("img");
                img.src = dataURI;

                //Insert the image at the carat

                // Try the standards-based way first. This works in FF
                if (document.caretPositionFromPoint) {
                    var pos = document.caretPositionFromPoint(x, y);
                    range = document.createRange();
                    range.setStart(pos.offsetNode, pos.offset);
                    range.collapse();
                    range.insertNode(img);
                }
                // Next, the WebKit way. This works in Chrome.
                else if (document.caretRangeFromPoint) {
                    range = document.caretRangeFromPoint(x, y);
                    range.insertNode(img);
                }
                else
                {
                    //not supporting IE right now.
                    console.log('could not find carat');
                }


            });
            //this reads in the file, and the onload event triggers, which adds the image to the div at the carat
            reader.readAsDataURL(file);
        }
    };

    console.log(currentID);
    var dropZone = document.getElementById(currentID);
    dropZone.addEventListener('dragover', handleDrag, false);
    dropZone.addEventListener('drop', handleDrop, false);
}*/

});


