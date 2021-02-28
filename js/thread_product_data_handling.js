function thread_add_Tag(){
    $.ajax({
        type: 'POST',
        url: '/php/datahandling/addTag/addTag.php',
        data: { url : $('#thread_url').val() , brand : $('#thread_addTag_brand').val() , product : $('#thread_addTag_product').val() , category : $('#thread_category').val()},
        success: function(response){
        	console.log(response);
            if(response === 'emptyUrl'){
            		$('.addTag-messageText').empty()
            		//$('.register_messageImage').empty()
	           	 	$('.addTag-messageText').append('Please provide links to official product page.');
	           	 	//$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	           	 	$('.addTag-message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'inCorrrectURL'){
            		$('.addTag-messageText').empty()
            		//$('.register_messageImage').empty()
	            	$('.addTag-messageText').append('Please fill in the correct url');
	            	//$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
	            	$('.addTag-message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'emptybrand'){
                    $('.addTag-messageText').empty()
                    //$('.register_messageImage').empty()
                    $('.addTag-messageText').append('Please fill in brand name');
                    //$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.addTag-message').slideDown(400).delay(10000).fadeOut(400)
            }  
            else if(response === 'emptyproduct'){
                    $('.addTag-messageText').empty()
                    //$('.register_messageImage').empty()
                    $('.addTag-messageText').append('Please fill in product name');
                    //$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.addTag-message').slideDown(400).delay(10000).fadeOut(400)
            }
            else if(response === 'productExist'){
                    $('.addTag-messageText').empty()
                    //$('.register_messageImage').empty()
                    $('.addTag-messageText').append('This product already exist in this website');
                    //$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                    $('.addTag-message').slideDown(400).delay(10000).fadeOut(400)
            }
            else {
                    $('.addTag-messageText').empty()
                    //$('.register_messageImage').empty()
                    $('.addTag-messageText').append('Product added, we are directing you to the product page');
                    //$(".register_messageImage").append('<img src="images/success.png" height="50" width="50">');
                    $(".modalcontainer").hide();
                    $('.addTag-message').slideDown(400).delay(10000);
                    //close modal form
                    document.getElementById('thread_addTag').style.display='none';

                    //tag @content with newly created tag
                    var dropdownBoxID = $(this).closest('div[class="dropdown-display"]').attr('id');
                    var dropdownBoxNumber = dropdownBoxID.replace("dropdown_display_", "");
                    console.log(dropdownBoxID);
                    console.log(dropdownBoxNumber);
                    //$('br[type=_moz]').remove();  //for removing crazy firefox shit
                    insertCount+=1;  //indicate a brand/product is being inserted

                    //old --> change to database query for new product info
                    // var productName=$(this).attr('title');  //get content inside the "title" attribute in "search.php" for brand/product name
                    // var brandProductClassifier = $(this).find('div').attr('class');
                    // var productID = $(this).find('a').attr('pid');
                    // var brandID = $(this).find('a').attr('bid');
                    // var urllink = $(this).find('a').attr('href');

                    //new method
                    var productInfo = getProductTagInfo($('#thread_addTag_product').val());
                    var productName = $('#thread_addTag_product').val();
                    var brandProductClassifier = "product";
                    var productID = productInfo[0];
                    var brandID = productInfo[1];
                    var urllink = "/product/"+productID;
                    
                    console.log(productName);
                    console.log(brandProductClassifier);
                    console.log(urllink);
                    console.log(productID);
                    //brandArray.push(productName);  //append brand name everytime we click from dropdown list, but need to find a way to remove it if user deleted the tag
                    var stringlength = name.length;  //
                    console.log("string length: " + stringlength);
                    var old=$("#comment_dropdown_contentbox_"+dropdownBoxNumber).html();  //get html content from .comment-dropdown-contentbox div for replacing the @abc search word
                    console.log("old: "+ old);
                    var prestring = old.substring(0, at);  //get section of comment before the "@" sign
                    var endstring = old.substr(at+stringlength+1);  //get section of comment after the "@" sign
                    console.log("prestring: " + prestring);
                    console.log("endstring: " + endstring); 
                    var content=old.replace(word,""); //replacing @abc to empty
                    $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(content);  //update the content inside the comment box as comment but without @abc

                    //contract the tag
                    var E="<a class=" + brandProductClassifier + " pid=" + productID + " bid=" + brandID + " id="+productName.replace(/ /gi, "").concat(insertCount.toString())+" contenteditable='false' href=\"" + urllink+"\" >"+productName+"</a>";  //E is the tag that will get inserted into the comment
                    console.log("E: " + E);

                    var tempcontent = $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(content);  //get html content from .comment-dropdown-contentbox div for slicing it to 3 parts
                    
                    //Old tagging method
                    if(endstring == "</span>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
                        $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + endstring + "<span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
                    }
                    else if(endstring == ""){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
                        console.log("Indeed in here");
                        $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "<span>" + E + "</span><span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span>");  //create a span with empty space as placeholder for user to type after it
                    }
                    else if(endstring == "</span></div>"){  //User insert brand/product at the end of the comment, 7 = "</span>", meaning is the end of the html extract
                        $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + "</span><span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space'))+">&nbsp;</span></div>");  //create a span with empty space as placeholder for user to type after it
                    }
                    else{  //user is inserting brand/product in the middle of the comment
                        $("#comment_dropdown_contentbox_"+dropdownBoxNumber).html(prestring + "</span><span>" + E + "<span id="+productName.replace(/ /gi, "").concat(insertCount.toString().concat('space')) + "></span>" + endstring);  //no need to create empty span at the end
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
        }
    });
};