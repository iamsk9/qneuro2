<?php

  include ('connection.php');

    $postdata = file_get_contents("php://input");

	if (isset($postdata)) {
		$request = json_decode($postdata);

		$username = $request->userName;
    $fullname = $request->fullName;
    $dob = $request->dob;
    $grade = $request->grade;
    $gender = $request->gender;
    $userid = $request->userId;
    $created_at = $request->created_at;
    $updated_at = $request->updated_at;

    $query = "INSERT INTO childdetails (userid , username, fullname, dob, gender, grade, created_at, updated_at) VALUES ('$userid', '$username', '$fullname','$dob','$grade','$gender', '$created_at', '$updated_at')";
    mysqli_query($conn, $query);

    echo $username." ".$dob." ".$grade." ".$gender;
  }
  mysqli_close($conn);
?>
