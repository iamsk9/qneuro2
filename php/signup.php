<?php

  include ('connection.php');

    $postdata = file_get_contents("php://input");

	if (isset($postdata)) {
		$request = json_decode($postdata);

		$username = $request->userName;
    $fullname = $request->fullName;
    $email = $request->email;
    $mobile = $request->mobile;
    $address = $request->address;
    $password = $request->password;
    $created_at = $request->created_at;

    $query = "INSERT INTO user (username, fullname, email, address, mobile,password, created_at) VALUES ('$username', '$fullname','$email','$address', '$mobile','$password', '$created_at')";
    mysqli_query($conn, $query);

    echo $username." ".$email." ".$mobile." ".$address;
  }
  mysqli_close($conn);
?>
