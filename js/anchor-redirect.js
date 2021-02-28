function threadredirect(tid, anchor){
$.ajax({
    type: "GET",
    url: "/php/thread-anchor-redirect.php",
    data: {tid: tid, anchor : anchor},
	dataType: 'text',
    cache: false,
    success: function(response){
    	console.log(response)
    	window.location = "/thread/"+response;
        
	},
    error: function(data){
    	console.log(data);
    }
});
}