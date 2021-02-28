//All global variables for use in referenced functions
var brandArray = [];  //brand array, append when click from drop down
var productArray = [];  //product array, append when click from drop down
var imgArray = [];
var idArray = [];
var insertCount = 0;  //check how many brand/product get inserted into the array
var at = 0;  //index of the "@" sign in the comment section, for slicing up the comment
var name = "";  //name is @abc, e.g. "@Dior"
var checkempty = 0;  //when first click on the comment section, check if comment is empty, if yes replace the placeholder to one empty space and ready for user input (for holding the empty span element)
var checknbsp = 0;  //after entering the first character in the comment box, replace the original empty space holder to ""

//for browser checking (new to update specifically in the future)
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]"
var isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
var isChrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
var showDisplayBox = false;
// Blink engine detection
var emptySpan = true;

var start=/@/ig; // @ Match
//var word=/@(\w+)/ig; //@abc Match
var searchWord;
var immediatePointer = 0;
var flagForFirstAT = true;


var originalPlaceholder = 'Share with us your thought!';

function setPlaceholder(destinationID, text){
	var dataSpan = document.createElement('span');  //dynamically create a span inside #commentbox
	dataSpan.innerHTML = text;  //placeholder for span, if not, empty span cannot be displayed
	dataSpan.setAttribute("id", "first");  //set id of the created span to "first"
	if (checkempty == 0){
		dataSpan.style.color= "grey";  //set color of placeholder"
		dataSpan.style.opacity= "0.5";  //set opacity of placeholder"
	}
	document.getElementById(destinationID).appendChild(dataSpan); //actually add the created span into the .comment-dropdown-contentbox div
}

function replacePlaceholder(destinationID, target, replacement){
	//console.log("in here");  //for debugging
	var zeroold=$("#"+destinationID).html();  //get all html inside the #first span
	var zerocontent=zeroold.replace(target, replacement);  //replace the placeholder text to empty space in order to hold the span and clickable for the user
	$("#" + destinationID).css("opacity","1");
	$("#" + destinationID).css("color","black");
	$("#" + destinationID).html(zerocontent); //update the html content inside the #first span
	checkempty = 1; //indicate the comment box has been clicked and that the placeholder is already replaced
}

$(document).ready(function(e)
{
	/*$(document).on('dragover', '[id^="comment_dropdown_contentbox_"]', function(e) {
  		var dt = e.originalEvent.dataTransfer;
  		if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
		    console.log("Over here");
		}
  	});
	$(document).on("keyup", '.comment-dropdown-contentbox', function(e) //perform the same properties as below .on("keyup") event
	{    console.log("phone input");
	});*/

	//Replace empty space when first enter character, and detect "@" to trigger dropdown menu
	$(document).on("keyup", '[id^="comment_dropdown_contentbox_"]', function(e) //trigger after pressing a key inside the .comment-dropdown-contentbox div
	{
		console.log("e.keyCode"+ e.keyCode);
		//if it is trigger from arrow key (not content) then ignore it
		//keyCode chart: http://www.javascripter.net/faq/keycodes.htm
		//if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 27){}
		// 8 = backspace; 32 = space; 222 = single quote; 229 = 
		if (e.keyCode <= 90 && e.keyCode >= 48 || e.keyCode == 32 || e.keyCode == 39 || e.keyCode == 37 
		|| e.keyCode == 222 || e.keyCode == 8|| e.keyCode == 229) //mobile always trigger keyCode 229
       	{
       		var idName = $(this).attr('id');
       		var el = document.getElementById(idName);
			console.log("keycode: " + e.keyCode);
			console.log(idName);
			var innerText = $(this).text();
			var innerHTML = $(this).html();
			console.log(innerText);
			console.log(innerHTML);
			console.log("Caret position: " + getCaretCharacterOffsetWithin(el));
			console.log("@BFindex: "+innerText.indexOf("@"));
			// if @ is present
			if (innerText.indexOf('@')>-1){
				console.log(immediatePointer);
				window.searchWord = innerText.slice(innerText.indexOf("@")+1, getCaretCharacterOffsetWithin(el));
				console.log("@index: "+innerText.indexOf("@"));
				console.log("searchWord: "+window.searchWord);
				showDisplayBox = true;
			}
			else{
				showDisplayBox = false;
				immediatePointer = 0;
				searchWord = "";
				console.log("searchWord: "+window.searchWord);
			}
			var htmlContent = $(this).html();
			var number = $(this).attr('id').replace("comment_dropdown_contentbox_", "");
			checkTag(idName, innerText, htmlContent, number, window.searchWord); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
			//checkTag(idName); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
			window.displayBoxIndex = -1;
			e.stopPropagation();
		}
	});

	$(document).on("mouseup", '[id^="comment_dropdown_contentbox_"]', function(e) //trigger after pressing a key inside the .comment-dropdown-contentbox div
	{
		var idName = $(this).attr('id');
		var el = document.getElementById(idName);
		console.log("keycode: " + e.keyCode);
		console.log(idName);
		var innerText = $(this).text();
		var innerHTML = $(this).html();
		console.log(innerText);
		console.log(innerHTML);
		console.log("Caret position: " + getCaretCharacterOffsetWithin(el));
		console.log("@BFindex: "+innerText.indexOf("@"));
		if (innerText.indexOf('@')>-1){
			console.log(immediatePointer);
			window.searchWord = innerText.slice(innerText.indexOf("@")+1, getCaretCharacterOffsetWithin(el));
			console.log("@index: "+innerText.indexOf("@"));
			console.log("searchWord: "+window.searchWord);
			showDisplayBox = true;
		}
		else{
			showDisplayBox = false;
			immediatePointer = 0;
			window.searchWord = "";
			console.log("searchWord: "+window.searchWord);
		}
		var htmlContent = $(this).html();
		var number = $(this).attr('id').replace("comment_dropdown_contentbox_", "");
		checkTag(idName, innerText, htmlContent, number, window.searchWord); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
		//checkTag(idName); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
		window.displayBoxIndex = -1;
		e.stopPropagation();
	});


	//Click from dropdown menu to add tag into the comment.
	$(document).on("click", ".dropdown-display-box", function(e)  //Trigger when click on any item in the dropdown menu
	{
		var dropdownBoxID = $(this).closest('div[class="dropdown-display"]').attr('id');
		var dropdownBoxNumber = dropdownBoxID.replace("dropdown_display_", "");
		console.log(dropdownBoxID);
		console.log(dropdownBoxNumber);
		//$('br[type=_moz]').remove();	//for removing crazy firefox shit
		insertCount+=1;  //indicate a brand/product is being inserted
		var username=$(this).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
		var brandProductClassifier = $(this).find('div').attr('class');
		var productID = $(this).find('a').attr('pid');
		var brandID = $(this).find('a').attr('bid');
		var urllink = $(this).find('a').attr('href');
		console.log(username);
		console.log(brandProductClassifier);
		console.log(urllink);
		console.log(productID);
		//brandArray.push(username);  //append brand name everytime we click from dropdown list, but need to find a way to remove it if user deleted the tag
		var stringlength = name.length;  //
		console.log("string length: " + stringlength);
		var old=$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html();  //get html content from .comment-dropdown-contentbox div for replacing the @abc search word
		console.log("old: "+ old);
		var prestring = old.substring(0, at);  //get section of comment before the "@" sign
		var endstring = old.substr(at+stringlength+1);  //get section of comment after the "@" sign
		console.log("prestring: " + prestring);
		console.log("endstring: " + endstring);	
		var content=old.replace(window.searchWord,""); //replacing @abc to empty
		$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(content);  //update the content inside the comment box as comment but without @abc

		//contract the tag
		var E="<a class=" + brandProductClassifier + " pid=" + productID + " bid=" + brandID + " id="+username.replace(/ /gi, "").concat(insertCount.toString())+" contenteditable='false' href=\"" + urllink+"\" >"+username+"</a>";  //E is the tag that will get inserted into the comment
		console.log("E: " + E);

		var tempcontent = $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(content);  //get html content from .comment-dropdown-contentbox div for slicing it to 3 parts
		
		//Old tagging method
		if(endstring == "</span>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
			$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + endstring + "<span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
		}
		else if(endstring == ""){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
			console.log("Indeed in here");
			$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "<span>" + E + "</span><span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
		}
		else if(endstring == "</span></div>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
			$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + "</span><span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span></div>");  //create a span with empty space as placeholder for user to type after it
		}
		else{  //user is inserting brand/product in the middle of the comment
			$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + "<span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space')) + "></span>" + endstring);  //no need to create empty span at the end
		}

		//New tag handling
		//remove @
		//highlight all text
		//set space behind

		//$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + endstring);  //no need to create empty span at the end
		$("#"+dropdownBoxID).hide();  //hide the dropdown menu
		//var elem = document.getElementById(username.replace(/ /gi, "").concat(insertCount.toString()));
		var elem = document.getElementById(username.replace(/ /gi, "").concat(insertCount.toString().concat("space")));
		//var elem = document.getElementById(username.replace(/ /gi, "").concat(insertCount.toString()));
		console.log(elem);
		placeCaretAtEnd(elem); //place the input caret to the end of the #first span, need to change to the end of the tag span later
		//document.getElementById(dropdownBoxID).focus();
		showDisplayBox=false;
		flagForFirstAT = true;
		window.displayBoxIndex = -1;
		e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
		e.stopPropagation();
	});

window.displayBoxIndex = -1;

	$(document).on("input keydown", '[id^="comment_dropdown_contentbox_"]', function(e){
		var dropdownContentBoxID = $(this).attr('id');
		var dropdownContentBoxNumber = dropdownContentBoxID.replace("comment_dropdown_contentbox_", "");
        if (showDisplayBox==true){
	        if (e.keyCode == 40) 
	        {  
	            Navigate(dropdownContentBoxNumber, 1);
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        else if(e.keyCode == 38)
	        {
	            Navigate(dropdownContentBoxNumber, -1);
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        //Escape key
	        else if(e.keyCode == 27)
	        {
	            $("#dropdown_display_"+dropdownContentBoxNumber).hide();
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        //enter key
	        else if(e.keyCode == 13)
	        {
	        	//$('br[type=_moz]').remove();	//for removing crazy firefox shit
				insertCount+=1;  //indicate a brand/product is being inserted
				var username=$("#dropdown_display_"+dropdownContentBoxNumber+" .dropdown-display-box").eq(displayBoxIndex).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
				//brandArray.push(username);  //append brand name everytime we click from dropdown list, but need to find a way to remove it if user deleted the tag
				var brandProductClassifier = $("#dropdown_display_"+dropdownContentBoxNumber+" .dropdown-display-box").eq(displayBoxIndex).find('div').attr('class');
				console.log(brandProductClassifier);
				var productID = $("#dropdown_display_"+dropdownContentBoxNumber+" .dropdown-display-box").eq(displayBoxIndex).find('a').attr('pid');
				var brandID = $("#dropdown_display_"+dropdownContentBoxNumber+" .dropdown-display-box").eq(displayBoxIndex).find('a').attr('bid');
				var urllink = $("#dropdown_display_"+dropdownContentBoxNumber+" .dropdown-display-box").eq(displayBoxIndex).find('a').attr('href');
				console.log(productID);
				var stringlength = name.length;  //
				console.log(stringlength);
				var old=$("#"+dropdownContentBoxID).html();  //get html content from .comment-dropdown-contentbox div for replacing the @abc search word
				console.log(old);
				var prestring = old.substring(0, at);  //get section of comment before the "@" sign
				var endstring = old.substr(at+stringlength+1);  //get section of comment after the "@" sign
				console.log(prestring);
				console.log(endstring);	
				var content=old.replace(window.searchWord,""); //replacing @abc to empty
				$("#"+dropdownContentBoxID).html(content);  //update the content inside the comment box as comment but without @abc
				var E="<a class=" + brandProductClassifier + " pid=" + productID + " bid=" + brandID + " id="+username.replace(/ /gi, "").concat(insertCount.toString())+" contenteditable='false' href=\"" + urllink+"\" >"+username+"</a>";  //E is the tag that will get inserted into the comment
				console.log(E);
				var tempcontent = $(".comment-dropdown-contentbox").html(content);  //get html content from .comment-dropdown-contentbox div for slicing it to 3 parts
				if(endstring == "</span>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
					$("#"+dropdownContentBoxID).html(prestring + "</span><span>" + E + endstring + "<span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
				}	
				else if(endstring == ""){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
					console.log("Indeed in here");
					$("#"+dropdownContentBoxID).html(prestring + "<span>" + E + "</span><span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
				}
				else if(endstring == "</span></div>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
					$("#"+dropdownContentBoxID).html(prestring + "</span><span>" + E + "</span><span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span></div>");  //create a span with empty space as placeholder for user to type after it
				}
				else if(endstring == "nbsp;"){  //user is inserting brand/product in the middle of the comment
					$("#"+dropdownContentBoxID).html(prestring + "<span>" + E + "</span><span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+"></span>");  //no need to create empty span at the end
				}
				else{  //user is inserting brand/product in the middle of the comment
					$("#"+dropdownContentBoxID).html(prestring + "</span><span>" + E + "<span id="+username.replace(/ /gi, "").concat(insertCount.toString().concat('space')) + "></span>" + endstring);  //no need to create empty span at the end
				}
				$("#dropdown_display_"+dropdownContentBoxNumber).hide();  //hide the dropdown menu
				//var elem = document.getElementById(username.replace(/ /gi, "").concat(insertCount.toString()));
				var elem = document.getElementById(username.replace(/ /gi, "").concat(insertCount.toString().concat("space")));
				console.log(elem);
				placeCaretAtEnd(elem); //place the input caret to the end of the #first span, need to change to the end of the tag span later
				showDisplayBox=false;
				flagForFirstAT = true;
				window.displayBoxIndex = -1;
				e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	    }
	});

	var Navigate = function(currNumber, diff) {
	    displayBoxIndex += diff;
	    dropdownContentBoxNumber = currNumber;
	    var oBoxCollection = $("#dropdown_display_"+dropdownContentBoxNumber+" .dropdown-display-box");
	    if (displayBoxIndex >= oBoxCollection.length)
	         displayBoxIndex = 0;
	    if (displayBoxIndex < 0)
	         displayBoxIndex = oBoxCollection.length - 1;
	    var cssClass = "display_box_hover";
	    oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
	    }
});

