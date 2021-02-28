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
	$(document).on("keyup", '#header_search_space', function(e) //trigger after pressing a key inside the .comment-dropdown-contentbox div
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
			checkText(word); // Detect "@"sign inside the .comment-dropdown-contentbox (in "keyUpFunctions.js")
			//checkTag(idName); // Detect "@"sign inside the .comment-dropdown-contentbox (from "keyUpFunctions.js")
			window.displayBoxIndex = -1;
			e.stopPropagation();
		}
	});


	//Click from dropdown menu to add tag into the comment.
	$(document).on("click", ".searchbox-dropdown-display-box", function(e)  //Trigger when click on any item in the dropdown menu
	{
		if(document.getElementById('search_modal').style.display === 'block'){
			var username=$(this).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
			console.log(username);
			var brandProductClassifier = $(this).find('div').attr('class');
			console.log(brandProductClassifier);
			var urllink = $(this).find('a').attr('href');
			console.log(urllink);
			window.location = "https://www.noscolor.com" + urllink
			$(".dropdown-display-box").hide();  //hide the dropdown menu
			showDisplayBox=false;
			flagForFirstAT = true;
			window.displayBoxIndex = -1;
			e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
			e.stopPropagation();
		}
		else if(document.getElementById('replyPopUp').style.display === 'block'){                
            //get all data i need from dropdown selection
            var productName=$(this).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
			var brandProductClassifier = $(this).find('div').attr('class');
			var productID = $(this).find('a').attr('pid');
			var brandID = $(this).find('a').attr('bid');
			var urllink = $(this).find('a').attr('href');
			console.log(productName);
			console.log(brandProductClassifier);
			console.log(urllink);
			console.log(productID);

			//close and refresh modal form
			document.getElementById('addTag').style.display='none';
            document.getElementById('url').value='';
            document.getElementById('addTag_brand').value='';
            document.getElementById("addTag_brand").disabled = true;
            document.getElementById('addBrand_dropdown_display').style.display='none';
            document.getElementById('addTag_product').value='';
            document.getElementById("addTag_product").disabled = true;
            document.getElementById('addProduct_dropdown_display').style.display='none';
            var targetLaebl = document.getElementsByClassName('modal-category');
            var target = document.getElementById('category');
            targetLaebl[0].style.display = 'none';
      		target.style.display = 'none';

            //focus on commentbox
            var dropdownBoxID = $('.dropdown-display').attr('id');
	          console.log(dropdownBoxID);
	          var dropdownBoxNumber = dropdownBoxID.replace("dropdown_display_", "");
	          console.log(dropdownBoxNumber);
	          //$('br[type=_moz]').remove();  //for removing crazy firefox shit
	          insertCount+=1;  //indicate a brand/product is being inserted

	          //new method
	          var commentBoxID = "#comment_dropdown_contentbox_"+dropdownBoxNumber;

	          var stringlength = window.searchWord.length;  //
	          console.log("string length: " + stringlength);
	          var old=$(commentBoxID).html();  //get html content from .comment-dropdown-contentbox div for replacing the @abc search word
	          console.log("old: "+ old);
	          at = old.indexOf("@");
	          var prestring = old.substring(0, at);  //get section of comment before the "@" sign
	          var endstring = old.substr(at+stringlength+1);  //get section of comment after the "@" sign
	          console.log("prestring: " + prestring);
	          console.log("endstring: " + endstring); 
	          console.log("Search Word: " + window.searchWord);
	          var content=old.replace(window.searchWord,""); //replacing @abc to empty
	          console.log(content);
	          $(commentBoxID).html(content);  //update the content inside the comment box as comment but without @abc

	          //contract the tag
	          var E="<a class=" + brandProductClassifier + " pid=" + productID + " bid=" + brandID + " id="+productName.replace(/ /gi, "").concat(insertCount.toString())+" contenteditable='false' href=\"" + urllink+"\" >"+productName+"</a>";  //E is the tag that will get inserted into the comment
	          console.log("E: " + E);

	          var tempcontent = $(commentBoxID).html(content);  //get html content from .comment-dropdown-contentbox div for slicing it to 3 parts
	          
	          //Old tagging method
	          if(endstring == "</span>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
	            $(commentBoxID).html(prestring + "</span><span>" + E + endstring + "<span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
	          }
	          else if(endstring == ""){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
	            console.log("Indeed in here");
	            $(commentBoxID).html(prestring + "<span>" + E + "</span><span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
	          }
	          else if(endstring == "</span></div>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
	            $(commentBoxID).html(prestring + "</span><span>" + E + "</span><span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span></div>");  //create a span with empty space as placeholder for user to type after it
	          }
	          else{  //user is inserting brand/product in the middle of the comment
	            $(commentBoxID).html(prestring + "</span><span>" + E + "<span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space')) + "></span>" + endstring);  //no need to create empty span at the end
	          }

	          //New tag handling
	          //remove @
	          //highlight all text
	          //set space behind

	          //$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + endstring);  //no need to create empty span at the end
	          $("#"+dropdownBoxID).hide();  //hide the dropdown menu
	          //var elem = document.getElementById(productName.replace(/ /gi, "").concat(insertCount.toString()));
	          var elem = document.getElementById(productName.replace(/ /gi, "").concat(insertCount.toString().concat("space")));
	          //var elem = document.getElementById(productName.replace(/ /gi, "").concat(insertCount.toString()));
	          console.log(elem);
	          placeCaretAtEnd(elem); //place the input caret to the end of the #first span, need to change to the end of the tag span later
	          //document.getElementById(dropdownBoxID).focus();
	          showDisplayBox=false;
	          flagForFirstAT = true;
	          window.displayBoxIndex = -1;
	          e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
	          e.stopPropagation();
		}
	});

window.displayBoxIndex = -1;
arrowPressed = false;

	$(document).on("keydown", '#header_search_space', function(e){
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
	            $("#searchBox_dropdown_display").hide();
	            arrowPressed = false;
	            e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
				e.stopPropagation();
	        }
	        //enter key
	        else if(e.keyCode == 13)
	        {
	        	if (arrowPressed){
	        		var dropdownBoxID = "header_search_space";
					console.log(dropdownBoxID);
					//$('br[type=_moz]').remove();	//for removing crazy firefox shit
					var username=$(".searchbox-dropdown-display-box").eq(displayBoxIndex).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
					var brandProductClassifier = $(".searchbox-dropdown-display-box").eq(displayBoxIndex).find('div').attr('class');
					console.log(brandProductClassifier);
					var urllink = $(".searchbox-dropdown-display-box").eq(displayBoxIndex).find('a').attr('href');
					window.location = "https://www.noscolor.com" + urllink
					$(".searchbox-dropdown-display-box").hide();  //hide the dropdown menu
					showDisplayBox=false;
					flagForFirstAT = true;
					window.displayBoxIndex = -1;
					e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
					e.stopPropagation();
	        	}
	        	else{
	        		var searchText = $("#header_search_space").val();
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

