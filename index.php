<?php
	include("./php/header_login.php");
?>
<!DOCTYPE html>

<?php
	require_once('./php/class/class_config.php');
	require_once('./php/class/class_function.php');
?>
<html>

    <head>

    	<!-- Event snippet for Website traffic conversion page -->
			<script>
			  gtag('event', 'conversion', {'send_to': 'AW-746277675/L9JeCLPytNcBEKuW7eMC'});
			</script>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Homepage | NOSCOLOR</title>
        <meta name="description" content="NOSCOLOR - An All-In-One platform for all cosmetic enthusiasts to check out information on beauty products, share latest trends, rate and review favourite brands and products." />
		<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "Organization",
		  "url": "https://www.noscolor.com",
		  "name": "NOSCOLOR",
		  "logo": "https://www.noscolor.com/logo.png",
		  "sameAs": [
		    "https://www.facebook.com/noscolor",
		    "https://www.instagram.com/noscolor",
		    "https://twitter.com/noscolor"
		  ]
		  }
		}
		</script>
    </head>
    <body>
    <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-5708456558983422">
    </amp-auto-ads>
		<main class="Content-Without-Footer">
		<?php
		include("./php/header.php");
		?>
		<?php include("./php/template.php") ?>
		<link rel="stylesheet" type="text/css" href="/css/index.css">
		<link rel="stylesheet" type="text/css" href="/css/searchBox.css">

		<?php if($isLoggedInresult) { }
		else{?>
			<div class="container-fluid" style="padding-left:0px; padding-right:0px;background-color: #212e45;height: 400px;">
				<?php
					include("./php/welcome_blurb.php");
				?>
			</div>
			<link rel="stylesheet" type="text/css" href="/css/welcome_blurb.css">
		<?php } ?>
		
		<link rel="stylesheet" type="text/css" href="/css/intro.css">

		<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

  		<script async src="/js/index_changeLanguage.js"></script>

		<link rel="stylesheet" type="text/css" href="/css/index_forum.css">
		<div class="container-fluid" style="padding-left:0px; padding-right:0px;background-color:#ffffff">
			<?php
				include("./php/index-forum.php");
			?>
		</div>

		<div class="container-fluid" style="padding-left:0px; padding-right:0px;background-color:#ffffff" align="center">
			<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<!-- auto responsive ads -->
				<ins class="adsbygoogle example_responsive_1"
				     style="display:block"
				     data-ad-client="ca-pub-5708456558983422"
				     data-ad-slot="7044202845"
				     data-full-width-responsive="true"></ins>
				<script>
				(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		</div>

		<div class="container-fluid" style="padding-left:0px; padding-right:0px;background-color:#ffffff">
			<?php
				include("./php/index-product.php");
			?>
		</div>
		<link rel="stylesheet" type="text/css" href="/css/index_product.css">

		<div class="container-fluid" style="padding-left:0px; padding-right:0px;background-color:#ffffff" align="center">
			<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<!-- auto responsive ads -->
				<ins class="adsbygoogle example_responsive_1"
				     style="display:block"
				     data-ad-client="ca-pub-5708456558983422"
				     data-ad-slot="7044202845"
				     data-full-width-responsive="true"></ins>
				<script>
				(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		</div>

		<div class="container-fluid" style="padding-left:0px; padding-right:0px;background-color:#ffffff;">
			<?php
				include("./php/index-brand.php");
			?>
		</div>
		<link rel="stylesheet" type="text/css" href="/css/index_brand.css">
		
	</main>
	<?php
	include("./php/footer.php");
	?>

    </body>

</html>

