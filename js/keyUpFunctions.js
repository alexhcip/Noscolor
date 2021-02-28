//trigger from dropdown.js
function checkTag(entireContentBoxID, Content, HTMLContent, NUMBER, WORD) {
	var content = Content; //Content Box Data
	//console.log(content);
	var htmlcontent = HTMLContent;
	var number = NUMBER;
	//name= content.match(word); //Content Matching @abc
	name = WORD;
	// console.log("number: " + number)
	// console.log("name: " + name)
	var dataString = 'searchword='+ name;
	//If @ available
	if(content.indexOf('@')>-1 && name != ""){
		at = htmlcontent.indexOf("@");
		//console.log(at);
		//showDisplayBox = true;
		$.ajax({
			type: "POST",
			url: "/php/datahandling/search.php", // Database name search
			data: dataString,
			cache: false,
			success: function(data)
			{
				$("#dropdown_display_"+number).css("position","relative");
				$("#dropdown_display_"+number).css("z-index","200");
				$("#dropdown_display_"+number).css("overflow","auto");
				$("#dropdown_display_"+number).css("max-height","400px");
				$("#dropdown_display_"+number).html(data).slideDown('show');
			}
		});
	}
	else
	{
		$("#dropdown_display_"+number).hide();
	}
}