<?php
include("../connection/connection.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$_POST =json_decode(file_get_contents("php://input"),true);
if(isset($_POST)){
// print_r($_POST);
$itemName=$_POST['ITEM_NAME'];
$itemCatagory=$_POST['ITEM_CATAGORY'];
$itemDate=date("Y-m-d");
$itemTime=date("h:i:s");
$itemRate=$_POST['ITEM_RATE'];
$itemQty=$_POST['ITEM_QUANTITY'];
if($itemName===''||$itemCatagory===''||$itemDate===''||$itemTime===''||$itemRate==='')
{
    echo 0;
}else{
	$result=mysqli_query($con,"SELECT * FROM `item` WHERE `Item_name`='$itemName'");
	if(mysqli_num_rows($result)>0){
		echo 0;
	}else{
				$catId=mysqli_fetch_array(mysqli_query($con,"SELECT `cat_id` FROM `catagory` WHERE `cat_name`='$itemCatagory'"))[0];
		    // $con=mysqli_connect('localhost', 'root', '', 'e-tracker');
		    $qry="INSERT INTO `item`(`Item_id`, `Item_name`, `cat_id`, `Item_date`, `Item_time`, `Rate`, `Qty`) VALUES ('','$itemName','$catId','$itemDate','$itemTime','$itemRate','$itemQty')";
		    if(mysqli_query($con,$qry)){
		       echo 1;
		    }
		    else{
		        echo 0;
   			 }
	}
	
}
}


mysqli_close($con);
?>