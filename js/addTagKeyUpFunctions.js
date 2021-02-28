//trigger from search_dropdown.js
function checkProductTag(WORD, HTMLContent) {
	name = WORD;
	var dataString = 'searchword='+ name;
	//If searchtext available
	if(name.length <=0){
		showDisplayBox = false;
		console.log("I'm here");
		$("#addProduct_dropdown_display").hide();
	}
	else
	{
		//if searchtext avalable
		console.log("Name: "+name);
		//showDisplayBox = true;
		$.ajax({
			type: "POST",
			url: "/php/datahandling/addProduct_search.php", // Database name search
			data: dataString,
			cache: false,
			success: function(data)
			{
				$("#addProduct_dropdown_display").css("position","relative");
				$("#addProduct_dropdown_display").css("z-index","200");
				$("#addProduct_dropdown_display").css("overflow","auto");
				$("#addProduct_dropdown_display").css("max-height","400px");
				$("#addProduct_dropdown_display").html(data).slideDown('show');
			}
		});
	}
}