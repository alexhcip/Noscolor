//like comment
function like(cid) // no ';' here
{
	//console.log("likecid_"+cid);
    var likeno = document.getElementById("likecid_"+cid);
    var button = document.getElementById("likebuttoncid_"+cid);
    if (isloggedin()){
	    var sendmsg = toggleButton(button, likeno);
	    send_like(cid, sendmsg);
	}
	else{
		document.getElementById('warningPopUp').style.display='block';
		console.log("not logged in for like");
	}
};

function send_like(cid, sendmsg){
    $.ajax(
	   {
		type:'GET',
		url:'/php/datahandling/sendlike.php',
		data:"cid="+cid+"&msg="+sendmsg,
		success: function(data){
			console.log(data);
		}
	   }
	);
};

function toggleButton(element, likeno) {
	// Check to see if the button is pressed
	var pressed = (element.getAttribute("aria-pressed") === "true");
	// Change aria-pressed to the opposite state
	element.setAttribute("aria-pressed", !pressed);
	if (!pressed){
		likeno.textContent=parseInt(likeno.textContent)+1;
		return "sendlike";
	}
	else{
		likeno.textContent=parseInt(likeno.textContent)-1;
		return "sendunlike"
	}
};

//like product
function like_product(pid) // no ';' here
{
	//console.log("likecid_"+cid);
    var likeno = document.getElementById("likepid_"+pid);
    var button = document.getElementById("likebuttonpid_"+pid);
    if (isloggedin()){
	    var sendmsg = toggleButton(button, likeno);
	    send_like_product(pid, sendmsg);
	}
	else{
		document.getElementById('warningPopUp').style.display='block';
		console.log("not logged in for like");
	}
};

function send_like_product(pid, sendmsg){
    $.ajax(
	   {
		type:'GET',
		url:'/php/datahandling/sendlike.php',
		data:"pid="+pid+"&msg="+sendmsg,
		success: function(data){
			console.log(data);
		}
	   }
	);
};

//like topic
function like_topic(tid) // no ';' here
{
    var likeno = document.getElementById("liketid_"+tid);
    var button = document.getElementById("likebuttontid_"+tid);
    if (isloggedin()){
	    var sendmsg = toggleButton(button, likeno);
	    send_like_topic(tid, sendmsg);
	}
	else{
		document.getElementById('warningPopUp').style.display='block';
		console.log("not logged in for like");
	}
};

function send_like_topic(tid, sendmsg){
    $.ajax(
	   {
		type:'GET',
		url:'/php/datahandling/sendlike.php',
		data:"tid="+tid+"&msg="+sendmsg,
		success: function(data){
			console.log(data);
		}
	   }
	);
};