function add_Tag(){
    document.getElementById('addBrand_dropdown_display').style.display='none';
    document.getElementById('addProduct_dropdown_display').style.display='none';
    console.log($('#addTag_image_display').attr('src'));
    var source = "";
    if(document.getElementById('search_modal').style.display === 'block'){
        source = "header";

        $.ajax({
            type: 'POST',
            url: '/php/datahandling/addTag/addTag.php',
            data: { source : source, url : $('#url').val() , brand : $('#addTag_brand').val() , product : $('#addTag_product').val() , category : $('#category').val(), thumbnail : $('#addTag_image_display').attr('src')},
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
                else{
                        $('.addTag-messageText').empty()
                        if(response.includes('productExist')){
                            var productInfo = response.split('|');
                            var productID = productInfo[1];
                            //$('.register_messageImage').empty()
                            $('.addTag-messageText').append('This product already exist in this website');
                            $('.addTag-message').slideDown(400).delay(10000).fadeOut(400)

                            $('.addTag-message').slideDown(400).delay(10000);
                            console.log("www.noscolor.com/product/"+productID);
                            setTimeout(function() {                        
                                window.location.href ="/product/"+productID;
                            }, 4000);
                        }
                        else{
                            $('.addTag-messageText').append('Product added, we are directing you to the product page');
                            //$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                            $('.addTag-message').slideDown(400).delay(10000).fadeOut(400)

                            $('.addTag-message').slideDown(400).delay(10000);
                            console.log("www.noscolor.com/product/"+response);
                            setTimeout(function() {                        
                                window.location.href ="/product/"+response;
                            }, 4000);
                        }
                }
            }
        });
    }
    else if(document.getElementById('replyPopUp').style.display === 'block'){
        source = "thread";

        $.ajax({
            type: 'POST',
            url: '/php/datahandling/addTag/addTag.php',
            data: { source : source, url : $('#url').val() , brand : $('#addTag_brand').val() , product : $('#addTag_product').val() , category : $('#category').val(), thumbnail : $('#addTag_image_display').attr('src')},
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
                else{
                        $('.addTag-messageText').empty()
                        if(response === 'productExist'){
                            //$('.register_messageImage').empty()
                            $('.addTag-messageText').append('This product already exist in this website');
                        }else{
                            //response with product details
                            //decode
                            var productInfo = response.split('|');
                            $('.addTag-messageText').append('Product added, we are directing you to the product page');
                            
                            refreshModal();
                            // document.getElementById('addTag').style.display='none';
                            // //reset modal form
                            // document.getElementById('url').value='';
                            // document.getElementById('addTag_brand').value='';
                            // document.getElementById("addTag_brand").disabled = true;
                            // document.getElementById('addBrand_dropdown_display').style.display='none';
                            // document.getElementById('addTag_product').value='';
                            // document.getElementById("addTag_product").disabled = true;
                            // document.getElementById('addProduct_dropdown_display').style.display='none';
                            // var targetLaebl = document.getElementsByClassName('modal-category');
                            // var target = document.getElementById('category');
                            // targetLaebl[0].style.display = 'none';
                            // target.style.display = 'none';

                            //tag product
                              var dropdownBoxID = $('.dropdown-display').attr('id');
                              console.log(dropdownBoxID);
                              var dropdownBoxNumber = dropdownBoxID.replace("dropdown_display_", "");
                              console.log(dropdownBoxNumber);
                              //$('br[type=_moz]').remove();  //for removing crazy firefox shit
                              insertCount+=1;  //indicate a brand/product is being inserted

                              //new method
                              var productID = productInfo[0];
                              var productName = productInfo[1];
                              var brandProductClassifier = "product";
                              var brandID = productInfo[2];
                              var urllink = "/product/"+productID;
                              
                              console.log(productName);
                              console.log(brandProductClassifier);
                              console.log(urllink);
                              console.log(productID);

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
                              //e.preventDefault();  //prevent moving the entire page up to the top everytime we select something from the dropdown menu
                              //e.stopPropagation();
                        }
                        //$(".register_messageImage").append('<img src="images/error.png" height="50" width="50">');
                        $('.addTag-message').slideDown(400).delay(10000).fadeOut(400)

                        //close modal
                        //document.getElementById('addTag').style.display='none';
                }
            }
        });
    }
};

function getOgImage(){
    document.getElementById('addTag_image_display').src = "";
    $.ajax({
        type: 'POST',
        url: '/php/datahandling/addTag/getOgImage.php',
        data: { url : $('#url').val()},
        success: function(response){
            console.log(response);
            if(response != ''){
                document.getElementById('addTag_image_display').style.display='inline-block';
                document.getElementById("addTag_image_display").src = response;
                document.getElementById('delete_ogImage').style.display='block';
            }
            else{
                    
            }
        }
    });

};