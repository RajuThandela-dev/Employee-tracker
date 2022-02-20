<?php
   include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
   header("Access-Control-Max-Age:1000");
   header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
   $_POST =json_decode(file_get_contents("php://input"),true);
	// print_r($_POST);
   if($_POST['check']==1){

   	 $catName=$_POST['catName'];
	$catID=mysqli_fetch_array(mysqli_query($con,"SELECT `cat_id` FROM `catagory` WHERE `cat_name`='$catName'"))[0];
	$result=mysqli_query($con,"SELECT `Item_name` FROM `item` WHERE  `cat_id`='$catID'");
	if(mysqli_num_rows($result)>0){
			$array['itemInfo']=array();
			while($rows=mysqli_fetch_array($result)){
				$temp=array();
				$temp['Item_name']=$rows['Item_name'];
				
				array_push($array['itemInfo'],$temp);

			}
			echo json_encode($array);
	}else{
		echo 0;
	}
   }
   if($_POST['check']===2){
   		$itemName=$_POST['itemName'];
   		$result=mysqli_query($con,"SELECT `Rate` FROM `item` WHERE  `Item_name`='$itemName'");
   		if(mysqli_num_rows($result)>0){
   			$array['ItemName']=array();
   			while($rows=mysqli_fetch_array($result)){
   				$temp=array();
   				$temp['rate']=$rows[0];
   				array_push($array['ItemName'],$temp);
   			}
   			echo json_encode($array);
   		}else{
   			echo 0;
   		}
   }
	