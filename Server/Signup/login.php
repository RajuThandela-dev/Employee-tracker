<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$_POST =json_decode(file_get_contents("php://input"),true);
//print_r($_POST);
$userName=$_POST['username'];
$password=$_POST['userpass'];
$con=mysqli_connect('localhost', 'root', '', 'e-tracker');
if($userName===''||$password===''){
    echo 0;
}else{
    
	$qry="SELECT * FROM `employee` WHERE  `emp_id`='$userName' OR `emp_name`='$userName'";
	$result=mysqli_query($con,$qry);
	if(mysqli_num_rows($result)>0){
		while($raw=mysqli_fetch_array($result)){
            $emp_id=$raw[0];
            $emp_name=$raw[1];
            $emp_sex=$raw[2];
            $emp_email=$raw[3];
            $emp_dob=$raw[4];
            $emp_doj=$raw[5];
            $emp_phone=$raw[6];
            $emp_adress=$raw[7];
            $emp_pass=$raw[8];
           
	    }
		if(($userName===$emp_id)&&$password===$emp_pass){
           
			class ob{
                public $empId,$empName,$empSex,$empEmail,$empDob,$empPhone, $empAdress,$Doj,$pass,$sucess,$loggedIn;
			}
            $obj=new ob();
            $obj->empId=$emp_id;
            $obj->empName= $emp_name;
            $obj->empSex=  $emp_sex;
            $obj->empEmail= $emp_email;
            $obj->empDob= $emp_dob;
            $obj->empPhone= $emp_phone;
            $obj->empAdress= $emp_adress;
            $obj->Doj=$emp_doj;
            $obj->pass=$emp_pass;
            $obj->sucess=1;
            $obj->loggedIn=true;
            echo json_encode($obj);
		}
		else
		{
			echo 0;
		}
	}
	else{
		echo 0;
	}
}