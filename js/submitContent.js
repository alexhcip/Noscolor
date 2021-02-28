function loadlatestpage(){
	window.location.search = 'page=latest';
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function submitContent(id){
	console.log(id);
	var splitDetail = id.split("_");
	var firstData = splitDetail[3];
	var secondData = splitDetail[4];

	var fromBrandPage = "";
	var fromProductPage = "";


	if (firstData.charAt(0)=='b'){
		var currentBrand = firstData.substring(1, firstData.length);
		var currentProduct = secondData;
		console.log(currentBrand);
		brandArray.push(currentBrand);
		if(currentProduct){
			console.log(currentProduct);
			idArray.push(currentProduct);
		}
		// assume if exist product id, then from product page, else from brand page
		if (secondData>0){
			fromProductPage = currentProduct;
		}
		else{
			fromBrandPage = currentBrand;
		}
	}else{
		var Tid = firstData.substring(1, firstData.length);
		var Cid = secondData;
	}
	
	//This is the sourceIDNumber
	sourceIDNumber = id.replace("comment_dropdown_form_", "");
	var text = document.getElementById("comment_dropdown_contentbox_"+sourceIDNumber).innerHTML;
	console.log(text);
	text = text.replace(/&nbsp;/g, " ");
	console.log("text2: " + text);
	if (text == ""){
		alert("Content must be filled out");
	}
	else{
		var getFocus = document.getElementById("comment_dropdown_contentbox_"+sourceIDNumber);
		var getAllBrands = getFocus.getElementsByClassName("brand");
		var getAllProducts = getFocus.getElementsByClassName("product");
		Array.from(getAllBrands).forEach(function(el) { brandArray.push(el.getAttribute("bid")); });
		uniquebrandArray = Array.from(new Set(brandArray.filter(String))).filter(function(n){ return n != undefined });
		Array.from(getAllProducts).forEach(function(el) { idArray.push(el.getAttribute("pid")); });
		uniqueidArray = Array.from(new Set(idArray)).filter(function(n){ return n != undefined });
	    $.ajax({
	        type: "POST",
	        url: "/php/datahandling/inputcomment.php",
	        data: {brandData : uniquebrandArray, idNumber : uniqueidArray, comment : text, TID : Tid, CID : Cid, FromBrandPage : fromBrandPage, FromProductPage : fromProductPage}, 
			dataType: 'text',
	        cache: false,
	        success: function(data){
	        	console.log(data);
				if(data === 'not logged in')
					alert("Please log in");
				else
					if(data.search('finish insert') > -1){
						console.log("done");
					}
					else{
						console.log("success error");
					}
					if (parseInt(Cid) > 0){
						//add reply in thread page or add comment in brand/product page
						location.reload();
					}
					else{
						//add coment to thread
						loadlatestpage();
					}
	   				
	        },
	        error:function(x,e) {
			    if (x.status==0) {
			        alert('You are offline!!\n Please Check Your Network.');
			    } else if(x.status==404) {
			        alert('Requested URL not found.');
			    } else if(x.status==500) {
			        alert('Internel Server Error.');
			    } else if(e=='parsererror') {
			        alert('Error.\nParsing JSON Request failed.');
			    } else if(e=='timeout'){
			        alert('Request Time out.');
			    } else {
			        alert('Unknow Error.\n'+x.responseText);
			    }
	   			if (parseInt(Cid) > 0){
					//add reply in thread page or add comment in brand/product page
					location.reload();
				}
				else{
					//add coment to thread
					loadlatestpage();
				}
			}
	    });
	}

}