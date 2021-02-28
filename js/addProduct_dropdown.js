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
	$(document).on("keyup", '#addTag_product', function(e) //trigger after pressing a key inside the .comment-dropdown-contentbox div
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
			checkProductTag(word); // Detect "@"sign inside the .comment-dropdown-contentbox (in "keyUpFunctions.js")
			//checkTag(idName); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
			window.displayBoxIndex = -1;
			e.stopPropagation();
		}
	});
});

