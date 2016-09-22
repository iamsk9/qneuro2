<?php

  include ('connection.php');

  $postdata = file_get_contents("php://input");

   if (isset($postdata)) {
     $request = json_decode($postdata);
      $email = $request->email;
      $mobile = $request->mobile;
echo $mobile." ".$email;
      $query  = "SELECT id FROM user WHERE email='$email' AND mobile='$mobile'";
      echo $query;
      $res = mysqli_query($conn,$query);
      $id = 0;
      while($row = mysqli_fetch_array($res)){
      $id = $row['id'];
      }
      echo $id;
    }
    mysqli_close($conn);
?>
