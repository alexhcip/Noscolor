//trigger from search_dropdown.js
function checkText(WORD, HTMLContent) {
	name = WORD;
	var dataString = 'searchword='+ name;
	//If searchtext available
	if(name.length <=0){
		showDisplayBox = false;
		$("#searchBox_dropdown_display").hide();
	}
	else
	{
		//if searchtext avalable
		//console.log("Name: "+name);
		//showDisplayBox = true;
		$.ajax({
			type: "POST",
			url: "/php/datahandling/searchbox_search.php", // Database name search
			data: dataString,
			cache: false,
			success: function(data)
			{
				$("#searchBox_dropdown_display").css("position","relative");
				$("#searchBox_dropdown_display").css("z-index","200");
				$("#searchBox_dropdown_display").css("overflow","auto");
				$("#searchBox_dropdown_display").css("max-height","400px");
				$("#searchBox_dropdown_display").html(data).slideDown('show');
			}
		});
	}
}