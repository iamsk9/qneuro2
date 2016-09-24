<?php
include ('connection.php');
$postdata = file_get_contents("php://input");
 if (isset($postdata)) {
    $request = json_decode($postdata);
    $id = $request->id;
    $query  = "SELECT * FROM childdetails WHERE userid='$id'";
    $res = mysqli_query($conn, $query);
    $c= mysqli_num_rows($res);
    echo $c;
  }
  mysqli_close($conn);
?>
