//trigger from search_dropdown.js
function checkBrandTag(WORD, HTMLContent) {
	name = WORD;
	var dataString = 'searchword='+ name;
	//If searchtext available
	if(name.length <=0){
		showDisplayBox = false;
		console.log("I'm here");
		$("#addBrand_dropdown_display").hide();
	}
	else
	{
		//if searchtext avalable
		console.log("Name: "+name);
		//showDisplayBox = true;
		$.ajax({
			type: "POST",
			url: "/php/datahandling/addBrand_search.php", // Database name search
			data: dataString,
			cache: false,
			success: function(data)
			{
				$("#addBrand_dropdown_display").css("position","relative");
				$("#addBrand_dropdown_display").css("z-index","200");
				$("#addBrand_dropdown_display").css("overflow","auto");
				$("#addBrand_dropdown_display").css("max-height","400px");
				$("#addBrand_dropdown_display").html(data).slideDown('show');
			}
		});
	}
}