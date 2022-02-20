<?php
	include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
   $fromDate=$_POST['fromDate'];
    $toDate=$_POST['toDate'];
   
    // echo $toDate." ". $fromDate;
    // $t=explode('-',$toDate);
    // $t=date($t[0]."-".$t[1]."-".$t[2]);
    // $f=explode('-',$fromDate);
    // $f=date($f[0]."-".$f[1]."-".$f[2]);
   
    $empId=$_POST['empId'];
   
    $result=mysqli_query($con,"SELECT `id`, `empID`, `currentDate`, `currentTime`, `jsonString` FROM `order_table` WHERE `currentDate` BETWEEN '$fromDate' AND '$toDate' AND `empID`='$empId'");
   
   if(mysqli_num_rows($result)>0){
    	$array=array();
    	while($row=mysqli_fetch_array($result)){
    		$empID=$row['empID'];
 			$row['emp_name']=mysqli_fetch_array(mysqli_query($con,"SELECT `emp_name` FROM `employee` WHERE `emp_id`='$empID'"))[0];
    		$row['json']=json_decode($row['jsonString'],true);
    		array_push($array,$row);
    	}
    	echo json_encode($array);
    }else{
    	echo 0;
    }
