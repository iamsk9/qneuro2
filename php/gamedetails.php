<?php

  include ('connection.php');

  $postdata = file_get_contents("php://input");

   if (isset($postdata)) {
      $request = json_decode($postdata);
      $id = $request->id;
      $gameid = $request->game;

      $query  = "SELECT * FROM reports WHERE userid='$id' AND game_id='$gameid'";
      $res = mysqli_query($conn, $query);
      echo $query;
      echo $res;
      if($res){
      while($row = mysqli_fetch_assoc($res)){
         echo $row['correctanswers'];
         echo $row['totalquestions'];
         echo $row['missedquestions'];
         echo $row['totaltime'];
      }
     }
     else
       echo 'not ok';
    }
    mysqli_close($conn);
?>
