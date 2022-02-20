<?php
include("../connection/connection.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
// $con=mysqli_connect('localhost','root','','e-tracker');

$qry='SELECT DISTINCT  `cat_id` FROM `item` WHERE 1';
$result=mysqli_query($con,$qry);
if(mysqli_num_rows($result)>0){
		$response=array();
		while($raw=mysqli_fetch_array($result)){
			
            $catId=$raw['cat_id'];
            $raw['cat_name']=mysqli_fetch_array(mysqli_query($con,"SELECT `cat_name` FROM `catagory` WHERE `cat_id`='$catId'"))[0];
            
            
            array_push($response, $raw);

		}
       // $count=count($response);
       //  $arr=array();
       //  for($i=0;$i<$count;$i++){
            
       //      array_push($arr,$response[$i]['cat_name']);
       //  }
       //  $array=array();

       //   $a['cat']=array();
       //   array_push($a['cat'],array_unique($arr));
         
         echo json_encode($response);
    }
    else{
        echo 0;
    }