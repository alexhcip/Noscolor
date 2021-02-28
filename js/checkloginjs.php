function isloggedin()
{
	<?php
	session_start();
	//Check if logged in
	if(isset($_SESSION['username'])){
    ?>
    return true;
    <?php
	}else{
	?>
	return false;
	<?php
	}
	ob_end_flush();
	?>
}