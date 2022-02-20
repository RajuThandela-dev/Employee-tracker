<?php
include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");

	$qry="SELECT `emp_id`, `emp_name`, `emp_sex`, `emp_email`, `emp_dob`, `emp_doj`, `emp_phone`, `emp_adress`, `pass` FROM `employee` WHERE emp_id NOT IN(select emp_id  from assign_route)";
	$result=mysqli_query($con,$qry);
	if(mysqli_num_rows($result)>1){
		$response['user']=array();
		while($raw=mysqli_fetch_array($result)){
			$temp=array();
            $temp['emp_id']=$raw['emp_id'];
            $temp['emp_email']=$raw['emp_email'];
            $temp['emp_name']=$raw['emp_name'];
            $temp['emp_sex']=$raw['emp_sex'];
            $temp['emp_dob']=$raw['emp_dob'];
            $temp['emp_phone']=$raw['emp_phone'];
            $temp['emp_adress']=$raw['emp_adress'];
			$temp['emp_doj']=$raw['emp_doj'];
			$temp['success']=1;
            $temp['pass']=$raw['pass'];
            array_push($response['user'], $temp);

		}
		array_shift($response['user']);
		echo json_encode($response);
	}
	else{
		echo 0;
	}
    mysqli_close($con);
?>