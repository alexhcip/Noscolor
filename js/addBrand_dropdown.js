//All global variables for use in referenced functions
var brandArray = [];  //brand array, append when click from drop down
var productArray = [];  //product array, append when click from drop down
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

var word = "";
var immediatePointer = 0;
var flagForFirstAT = true;


var originalPlaceholder = 'Share with us your thought!';//All global variables for use in referenced functions
var brandArray = [];  //brand array, append when click from drop down
var productArray = [];  //product array, append when click from drop down
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

var word = "";
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

$(document).ready(function()
{
	//Replace empty space when first enter character, and detect "@" to trigger dropdown menu
	$(document).on("keyup", '#addTag_brand', function(e) //trigger after pressing a key inside the .comment-dropdown-contentbox div
	{
		//if it is trigger from arrow key (not content) then ignore it
		//keyCode chart: http://www.javascripter.net/faq/keycodes.htm
		//if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 27){}
		if (e.keyCode <= 90 && e.keyCode >= 48 || e.keyCode == 32 || e.keyCode == 222 || e.keyCode == 8)
       	{
			var idName = $(this).attr('id');
			console.log(idName);
			var innerText = $(this).val();
			console.log(innerText);
			console.log(innerText.length);
			if (innerText.length){
				showDisplayBox = true;
				word = innerText;
				//word.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
				console.log("word: "+word);
			}
			else{
				showDisplayBox = false;
				immediatePointer = 0;
				var word = "";
			}
			checkBrandTag(word); // Detect "@"sign inside the .comment-dropdown-contentbox (in "keyUpFunctions.js")
			//checkTag(idName); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
			window.displayBoxIndex = -1;
			e.stopPropagation();
		}
	});


	//Click from dropdown menu to add tag into the comment.
	$(document).on("click", ".addBrand-dropdown-display-box", function(e)  //Trigger when click on any item in the dropdown menu
	{
		var dropdownBox = "addBrand_dropdown_display";
		var brandSelector = $(this).find('div.brand');
		var brandText = brandSelector.find('span.name-div');
		var brandID = $(this).find('div.brand').find('a').attr('bid');  // how to handle if they delete and they select another brand by typing more text...
		console.log(brandID);
		$("#addTag_brand").val($.trim(brandText.text()));  //update the content inside the comment box as comment but without @abc
		document.getElementById("addTag_brand").setAttribute("bid", brandID); //instead of adding number, better to check character by character when they submit
		//still have benefit --> check bid if it match exactly with the brandname, otherwise ignore and add as new brand (may shorten the time of database search query time)
		$("#"+dropdownBox).hide();  //hide the dropdown menu
		window.displayBoxIndex = -1;
		e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
		console.log("done");
		e.stopPropagation();
		return false;
	});

window.displayBoxIndex = -1;
arrowPressed = false;

	$(document).on("keydown", '#addTag_brand', function(e){
        if (showDisplayBox==true){
	        if (e.keyCode == 40) //Down arrow
	        {  
	            Navigate(1);
	            arrowPressed = true;
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        else if(e.keyCode == 38)
	        {
	            Navigate(-1);
	            arrowPressed = true;
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        //Escape key
	        else if(e.keyCode == 27)
	        {
	            $("#addBrand_dropdown_display").hide();
	            arrowPressed = false;
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        //enter key
	        else if(e.keyCode == 13)
	        {
	        	if (arrowPressed){
	        		var dropdownBoxID = "addTag_brand";
					console.log(dropdownBoxID);
					//$('br[type=_moz]').remove();	//for removing crazy firefox shit
					var username=$(".searchbox-dropdown-display-box").eq(displayBoxIndex).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
					var brandProductClassifier = $(".searchbox-dropdown-display-box").eq(displayBoxIndex).find('div').attr('class');
					console.log(brandProductClassifier);
					var urllink = $(".searchbox-dropdown-display-box").eq(displayBoxIndex).find('a').attr('href');
					// window.location = "https://www.noscolor.com" + urllink
					$(".searchbox-dropdown-display-box").hide();  //hide the dropdown menu
					showDisplayBox=false;
					flagForFirstAT = true;
					window.displayBoxIndex = -1;
					e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
					e.stopPropagation();
	        	}
	        	else{
	        		var searchText = $("#addTag_brand").val();
	        		console.log(searchText.replace(/\s/g, "").length);
	        		if(searchText.replace(/\s/g, "").length > 0){document.search.submit();}
	        		else{
	        			window.displayBoxIndex = -1;
	        			e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
						e.stopPropagation();
	        		}
	        	}
	        	
	        }
	    }
	});

	var Navigate = function(diff) {
	    displayBoxIndex += diff;
	    console.log(displayBoxIndex);
	    var oBoxCollection = $(".searchbox-dropdown-display-box");
	    if (displayBoxIndex >= oBoxCollection.length)
	         displayBoxIndex = 0;
	    if (displayBoxIndex < 0)
	         displayBoxIndex = oBoxCollection.length - 1;
	    var cssClass = "display_box_hover";
	    oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
	    }

});
