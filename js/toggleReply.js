function toggleReplyShowHideText(id){
	  if (id.getAttribute('aria-expanded')==="false"){
	  	$(id).text(id.text.replace("Show","Hide"))
	  }
	  else{
	  	$(id).text(id.text.replace("Hide","Show"))
	  }
}