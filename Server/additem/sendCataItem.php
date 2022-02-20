<?php
include("../connection/connection.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$result=mysqli_query($con,"SELECT `cat_name` FROM `catagory` WHERE 1");
if(mysqli_num_rows($result)>0){
	$array['catagory']=array();
	while($rows=mysqli_fetch_array($result)){
		$temp=array();
		$temp['cat_name']=$rows[0];
		array_push($array['catagory'],$temp);
	}
	echo json_encode($array);
}else{
	echo 0;
}