if (typeof (imgbb_add_text) == 'undefined') {
    var imgbb_lang = "en";

    var imgbb_add_text = "Add image to post";

    var imgbb_style = "padding:15px 0px 15px 0px;";

    if (imgbb_lang == "en") {
        imgbb_lang = "";
    } else if (imgbb_lang.indexOf(".") === -1) {
        imgbb_lang += ".";
    }
    if (window.location.hash) {
        var imgbb_text;
        var imgbb_hash;
        if (window.name.indexOf("imgbb_") === -1) {
            imgbb_text = window.name;
            imgbb_hash = window.location.hash.substring(1).split("_");
        } else {
            imgbb_text = window.location.hash.substring(1);
            imgbb_hash = window.name.split("_");
        }
        function checkNoAds(string) {
            return string.includes("[img]");
        }
        if (imgbb_text != "" && imgbb_hash.length > 1) {
            if (imgbb_hash[0] == "imgbb") {
                var imgbb_id = imgbb_hash[1];
                imgbb_text = decodeURIComponent(imgbb_text);
                imgbb_text = imgbb_text.split("\n").filter(checkNoAds).join("\n\n"); // ban ads links
                if (imgbb_text.length > 20) {
                    if (opener != null && !opener.closed) {
                        var imgbb_area = opener.document.getElementsByClassName('comment-dropdown-contentbox');
                        for (var i = 0; i < imgbb_area.length; i++) {
                            if (i == imgbb_id) {
                                if (opener.editorHandlemessage && opener.editorHandlemessage.bRichTextEnabled) {
                                    opener.editorHandlemessage.insertText(imgbb_text.replace(new RegExp("\n",'g'), "<br />"), false);
                                } else {
                                    imgbb_area[i].innerHTML += imgbb_text;
                                }
                                opener.focus();
                                window.close();
                            }
                        }
                    }
                }
                window.location.replace("//" + imgbb_lang + "imgbb.com/upload?mode=code&url=" + encodeURIComponent(document.location.href));
            }
        }
    }
    function imgbb_insert() {
        var imgbb_area = document.getElementsByClassName('comment-dropdown-contentbox');
        console.log(imgbb_area);
        for (var i = 0; i < imgbb_area.length; i++) {
        	console.log(imgbb_area[i].className);
            if (imgbb_area[i].className) {
                var attr = imgbb_area[i].getAttribute('data-imgbb');
                if (attr != "true") {
                	console.log(imgbb_area[i].parentNode.parentNode.parentNode);

                    var imgbb_a = imgbb_area[i].parentNode.parentNode.parentNode.getElementsByClassName('addimagebtn')[0];
                    imgbb_a.href = "javascript:imgbb_upload(" + i + ");";

                    imgbb_area[i].setAttribute('data-imgbb', "true");
                    
                    
                }
            }
        }
    }
    function imgbb_upload(areaid) {
        //thumbnail
        //window.open("//" + imgbb_lang + "imgbb.com/upload?mode=website&url=" + encodeURIComponent(document.location.href), "imgbb_" + areaid, "resizable=yes,width=720,height=540");
        //original size
        window.open("//" + imgbb_lang + "imgbb.com/upload?mode=website&code=hotlink&url=" + encodeURIComponent(document.location.href), "imgbb_" + areaid, "resizable=yes,width=720,height=550");
        return void (0);
    }
    function update_imgbb_btn() {
    	var imgbb_area = document.getElementsByClassName('comment-dropdown-contentbox');

        for (var i = 0; i < imgbb_area.length; i++) {
            if (imgbb_area[i].className) {
                var attr = imgbb_area[i].getAttribute('data-imgbb');
                if (attr == "true") {
                    imgbb_area[i].setAttribute('data-imgbb', "false");
                }
            }
        }
        imgbb_insert();
    }
    if (typeof (window.addEventListener) == 'function') {
        window.addEventListener('DOMContentLoaded', imgbb_insert, false);
        window.addEventListener('load', imgbb_insert, false);
    } else if (typeof (window.attachEvent) == 'function') {
        window.attachEvent('onload', imgbb_insert);
    } else {
        if (window.onload != null) {
            var old_onload = window.onload;
            window.onload = function(e) {
                old_onload(e);
                imgbb_insert();
            }
            ;
        } else {
            window.onload = imgbb_insert;
        }
    }
    for (var i = 1; i < 12; i += 2) {
        setTimeout("imgbb_insert()", i * 1000);
    }
    imgbb_insert();
}