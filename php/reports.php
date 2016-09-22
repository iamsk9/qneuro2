<?php

include ('connection.php');

$postdata = file_get_contents("php://input");

	if (isset($postdata)) {
		$request = json_decode($postdata);

		$correctanswers = $request->correctAnswers;
    $totaltime = $request->totalTime;
    $missedquestions = $request->missedQuestions;
    $totalquestions = $request->totalQuestions;

    $query = "INSERT INTO reports (correctanswers, totaltime, missedquestions, totalquestions) VALUES ('$correctanswers', '$totaltime','$missedquestions','$totalquestions')";
    mysqli_query($conn, $query);

    echo $correctanswers." ".$totaltime." ".$missedquestions." ".$totalquestions;
  }
  mysqli_close($conn);
?>
