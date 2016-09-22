<?php

include ('connection.php');

$postdata = file_get_contents("php://input");

	if (isset($postdata)) {
		$request = json_decode($postdata);

		$userid = $request->userId;
    $planno = $request->planNo;


    $query = "INSERT INTO subscriptions (userid, planno) VALUES ('$userid', '$planno')";
    mysqli_query($conn, $query);

    echo $userid." ".$planno;
  }
  mysqli_close($conn);
?>
