<?php
require_once("TableModel.php");

class Score extends TableModel
{
    public static function getTopTenScores($conn)
    {
        $query = "select * from scores order by score desc limit 10 ";
        $result = $conn->query($query);
        $scores = [];
        if( $result->num_rows > 0)
        {

            while( $row = $result->fetch_assoc())
            {
                $score = new Score($row);
                $scores[] = $score;
            }
        }
        return $scores;
    }

    public static function getTopTenScoresGivenUser($conn,$username)
    {
        $query = "select * from scores where (username='" .$username. "') order by score desc limit 10 ";
        $result = $conn->query($query);
        $scores = [];
        if( $result->num_rows > 0)
        {

            while( $row = $result->fetch_assoc())
            {
                $score = new Score($row);
                $scores[] = $score;
            }
        }
        return $scores;
    }

    public static function insertScore($conn,$username,$score)
    {
        $query = "Insert into scores" . "(username,score)" .
            "values (?,?)";
        $statement = $conn->prepare($query);
        $statement->bind_param("si",$username,$score);
        $statement->execute();
        $statement->close();
        return $conn->insert_id;
    }

}