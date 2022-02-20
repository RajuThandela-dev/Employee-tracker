<?php
	include("../connection/connection.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$_POST =json_decode(file_get_contents("php://input"),true);
// print_r($_POST);
if($_POST['check']==1){
	$from=$_POST['fromDate'];
	$to=$_POST['toDate'];
	$result=mysqli_query($con,"SELECT `id`, `E_id`, `date1`, `time1`, `L_date`, `purpose`, `confirm`, `reject` FROM `leave_table` WHERE `L_date` BETWEEN '$from' AND '$to' AND confirm=1");
	if(mysqli_num_rows($result)>0){
		$chekDate['checkDate']=array();
		while($row=mysqli_fetch_array($result)){
			$temp=array();
			$empId=$row['E_id'];
			$empName=mysqli_fetch_array(mysqli_query($con,"SELECT `emp_name` FROM `employee` WHERE `emp_id`='$empId'"))[0];
			$temp['empId']=$empId;
			$temp['name']=$empName;
			$temp['lDate']=$row['L_date'];
			array_push($chekDate['checkDate'],$temp);

			// $temp['E_id']=$_POST['E_id'];
		}
		echo json_encode($chekDate);
	}else{
		echo 0;
	}

}

