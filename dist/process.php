<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
            
    $to = '<your@email.com>';
    // Asunto
    $subject = 'Message from web';
    
    // Cabecera que especifica que es un HMTL
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf8' . "\r\n";
    
    // Cabeceras adicionales
    $text = '
    <html>
    <head>
        <title>Message from web</title>
    </head>
    <body>
        <p>A new message from web !<br />
        * Don t respond directly to this email  * <br />
        Use the customer contact e-mail instead<br />
        ------------------------------------------------------------------------</p>
        <b>Customer data</b> <br />
        <b>Name:</b> '.$name.' <br />
        <b>E-Mail:</b> '.$email.' <br />
        <b>Phone:</b> '.$phone.' <br />
        <b>Message:</b> '.$message.' <br />
    </body>
    </html>
    ';
            
    if (mail($to, $subject, $text, $headers)) {
        $response = ['response' => 'success'];
    } else {
        $response = ['response' => 'error'];
    }
    
    echo json_encode($response);
?>
  