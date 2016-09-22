<?php

  include ('connection.php');

  $postdata = file_get_contents("php://input");

  if (isset($postdata)) {
  $request = json_decode($postdata);

  $username = $request->userName;
   $fullname = $request->fullName;

   $query  = "UPDATE childdetails SET deleted_at=now() WHERE username = '$username' AND fullname='$fullname'";
   mysqli_query($conn, $query);
 }
 mysqli_close($conn);
?>
