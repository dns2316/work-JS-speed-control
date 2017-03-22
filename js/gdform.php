<?php
	// VALUES FROM THE FORM
	$name = $_POST['FirstName'] . '  ' . $_POST['LastName'];
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

ini_set('date.timezone', 'Europe/London');

	// CREATE THE EMAIL
	$recipient	= "info@lorem.com";
 	$headers	= "Content-Type: text/plain; Content-Transfer-Encoding: quoted-printable; charset=utf-8\nFrom: HS lorem" ." <".$recipient.">" . "\r\n" . "Reply-To: ".$email;
	$subject	= "HS lorem. Contact From ".$email;
	$subjectCopy	= "Contact From ".$email.". Copy message";
	$sendMessage = "This is to confirm that H S lorem have received the following message from you.\r\n\r\nYour name: ".$name."\r\n\r\nYour message:\r\n\r\n";
	$sendMessage .= wordwrap($message, 1024);
	$sendMessage .= "\r\n\r\n\r\n".date('H:i', time() - date('Z'))."\r\n\r\nThankyou";
	$to = $recipient.", ".$email;
	ini_set('sendmail_from', 'info@lorem.com');

	// SEND THE EMAIL
	mail($to, $subject, $sendMessage, $headers);

	// REDIRECT TO THE THANKS PAGE
	header('Location:http://lorem.com/thanks.html');
?>
