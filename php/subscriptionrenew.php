<?php

  include ('connection.php');

  $postdata = file_get_contents("php://input");

  if (isset($postdata)) {
  $request = json_decode($postdata);

  $userId = $request->userId;
  $planNo = $request->planNo;

   $query  = "UPDATE subscriptions SET planno='$planNo' WHERE userid= '$userId'";
   mysqli_query($conn, $query);
 }
 mysqli_close($conn);
?>
