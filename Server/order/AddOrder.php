 <?php
 	 include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    
   if(isset($_POST)){
   	  // 	$shopName=$_POST['shopName'];
	   //  $catagory=$_POST['catagory'];
	   //  $itemName=$_POST['itemName'];
	   //  $rate=$_POST['rate'];
	   //  $qty=$_POST['qty'];
	   //  $total=$_POST['total'];
	   //  $currentDate=date('Y-m-d');
	   //  $currentTime=date('h:i');
 	for($i=0;$i<count($_POST);$i++){
 		$shopName=$_POST[$i]['shopName'];
	    $catagory=$_POST[$i]['catagory'];
	    $itemName=$_POST[$i]['itemName'];
	    $rate=$_POST[$i]['rate'];
	    $qty=$_POST[$i]['qty'];
	    $total=$_POST[$i]['total'];
	    $empId=$_POST[$i]['empId'];
	    $currentDate=date('Y-m-d');
	    $currentTime=date('h:i:s');
	    if(mysqli_num_rows(mysqli_query($con,"SELECT `Shop_id` FROM `shop_information` WHERE `Shop_name`='$shopName'"))>0){
		$shopID=mysqli_fetch_array(mysqli_query($con,"SELECT `Shop_id` FROM `shop_information` WHERE `Shop_name`='$shopName'"))[0];
	  	  	$catId=mysqli_fetch_array(mysqli_query($con,"SELECT `cat_id` FROM `catagory` WHERE `cat_name`='$catagory'"))[0];
    	$itemId=mysqli_fetch_array(mysqli_query($con,"SELECT `Item_id` from `item` WHERE `Item_name`='$itemName'"))[0];
    	$result=mysqli_query($con,"SELECT `Item_id`, `Item_name`, `cat_id`, `Item_date`, `Item_time`, `Rate`, `Qty`, `Total_amt` FROM `item` WHERE `cat_id`='$catId' AND  `Item_name`='$itemName'");

			if(mysqli_num_rows($result)>0){
				if(mysqli_query($con,"INSERT INTO `order_table`(`id`, `empId`, `Shop_id`, `Item_id`, `currentDate`, `currentTime`, `Rate`, `Qty`, `Total`) VALUES ('','$empId','$shopID','$itemId','$currentDate','$currentTime','$rate','$qty','$total')")){
					echo 1;
				}else{
					echo 0;
				}
			}else{
				echo 0;

			}
	    }else{
	    	echo 0;
	    }
	  

    }

   }
    
   
    // if($_POST['check']==1){
  
	   //  if($shopName==''||$catagory==''||$itemName==''||$rate==''||$qty==''){
	   //  		echo "0";
	   //  }else{
	   //  	$shopID=mysqli_fetch_array(mysqli_query($con,"SELECT `Shop_id` FROM `shop_information` WHERE `Shop_name`='$shopName'"))[0];
	  

	   //  }

    // }
   

    