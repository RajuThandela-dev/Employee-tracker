<?php
	include('../connection/connection.php');
	header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    // print_r($_POST);
    if(isset($_POST)){
    	   $id=$_POST['id'];
    $lat=$_POST['latitude'];
    $long=$_POST['longitude'];
   
		    if($id==''|| $lat==''||$long==''){
		    	echo 'empty';
		    }else{
		    	if($id!=100001){
 					$currentDate=date('Y-m-d');
				    $currentTime=date('h:i:s');
				    $location=$lat.",".$long;
				     $result=mysqli_query($con,"SELECT `id`, `emp_id`, `location`, `date1`, `time1` FROM `attendence_table` WHERE `emp_id`='$id'");
				    if(mysqli_num_rows($result)>0){
				    	mysqli_query($con,"UPDATE `attendence_table` SET `location`='$location',`date1`='$currentDate',`time1`='$currentTime' WHERE `emp_id`='$id'");
				    }else{

    			mysqli_query($con,"INSERT INTO `attendence_table`(`id`, `emp_id`, `location`, `date1`, `time1`) VALUES ('','$id','$location','$currentDate','$currentTime')");
    			}
		    	}else{
		    		echo "id error";
		    	}
		    	
		    }
   
    }
 