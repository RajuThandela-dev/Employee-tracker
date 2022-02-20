<?php
	 include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
   
    if(isset($_POST)){
			 $empId=$_POST[0]['empId'];
			 $currentDate=date('Y-m-d');
			    $currentTime=date('h:i:s');
		    $array['order']=array();
		    $array['noOfOrders']=count($_POST);
		    for($i=0;$i<count($_POST);$i++){
		    	$tem=array();
		    	$temp=array();
		    	$temp['shopName']=$_POST[$i]['shopName'];
			    $temp['catagory']=$_POST[$i]['catagory'];
			    $temp['itemName']=$_POST[$i]['itemName'];
			    $temp['rate']=$_POST[$i]['rate'];
			    $temp['qty']=$_POST[$i]['qty'];
			    $temp['total']=$_POST[$i]['total'];
			    
			    $tem['noOfOrders']=count($_POST);
			    
			    array_push($array['order'],$temp);
			   
			   
		    }
		    $encode=json_encode($array);
		    // $sum= $encode.$noOforder;
		    if(mysqli_query($con,"INSERT INTO `order_table`(`id`, `empID`, `currentDate`, `currentTime`, `jsonString`) VALUES  ('','$empId','$currentDate','$currentTime','$encode')")){
		    	echo 1;
		    }else{
		    	echo 0;
		    }
    }
   
