<?php

  include ('connection.php');

  $postdata = file_get_contents("php://input");

   if (isset($postdata)) {
      $request = json_decode($postdata);
      $email = $request->email;
      $password = $request->password;

      $query  = "SELECT id FROM user WHERE email='$email' AND password='$password'";
      $res = mysqli_query($conn, $query);
      while($row = mysqli_fetch_array($res)){
       $id = $row['id'];
      }
      echo $id;
    }
    mysqli_close($conn);
?>
