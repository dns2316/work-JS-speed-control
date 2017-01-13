<?php
	// VALUES FROM THE FORM
	$name = $_POST['FirstName'] . ' ' . $_POST['LastName'];
	$email = $_POST['email'];
	$message = $_POST['msg'];

	// ERROR & SECURITY CHECKS
	if ( ( !$email ) ||
		 ( strlen($_POST['email']) > 200 ) ||
	     ( !preg_match("#^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$#", $email) )
       )
	{
		print "Error: Invalid E-Mail Address";
		exit;
	}
	if ( ( !$name ) ||
		 ( strlen($name) > 100 )
		//  || ( preg_match("/[:=@\<\>]/", $name) )
	   )
	{
		print "Error: Invalid Name";
		exit;
	}
	if ( preg_match("#cc:#i", $message, $matches) )
	{
		print "Error: Found Invalid Header Field";
		exit;
	}
	if ( !$message )
	{
		print "Error: No Message";
		exit;
	}
	if (eregi("\r",$email) || eregi("\n",$email)){
		print "Error: Invalid E-Mail Address";
		exit;
	}
	if (FALSE) {
		print "Error: You cannot send to an email address on the same domain.";
		exit;
	}


	// CREATE THE EMAIL
	$recipient	= "info@londonscr.co.uk";
	$headers	= "Content-Type: text/html; charset=utf-8\nFrom: London & SCR Limited" ." <".$recipient.">" . "\r\n" . "Reply-To: " . $email . "\r\n" . "Cc: " ."<jao914@yandex.com>, <clucas2174@gmail.com>, ".$email."\r\n";
	$subject	= "Contact From londonscr.co.uk";
	$sendMessage = wordwrap($message, 1024);

	ini_set('sendmail_from', 'info@londonscr.co.uk');

	// SEND THE EMAIL
	mail($recipient, $subject, $sendMessage, $headers);
	// REDIRECT TO THE THANKS PAGE
	header('Location:http://www.londonscr.co.uk/thanks.html');
?>
