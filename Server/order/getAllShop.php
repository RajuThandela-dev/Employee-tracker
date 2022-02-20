 <?php
 include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
   header("Access-Control-Max-Age:1000");
   header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
     $_POST =json_decode(file_get_contents("php://input"),true);
    
  	$empId=$_POST['empId'];
  
	$resu=mysqli_query($con,"SELECT * FROM `assign_route` WHERE `emp_id`='$empId'");
	if(mysqli_num_rows($resu)>0){
			$routeID=mysqli_fetch_array(mysqli_query($con,"SELECT  `routeId` FROM `assign_route` WHERE `emp_id`='$empId'"))[0];
			$location=mysqli_fetch_array(mysqli_query($con,"SELECT  `location` FROM `route_table` WHERE `routeid`='$routeID'"))[0];
			$latLong=explode(',',$location);
                $lat= bcadd($latLong[0],'0',2);
                $long=bcadd($latLong[1],'0',2);

			 $result=mysqli_query($con,"SELECT `Shop_id`, `Shop_name`, `Shop_ownername`, `Owner_phoneno`, `Shop_email`, `Shop_location`, `Shop_adress` FROM `shop_information` WHERE 1");
			if(mysqli_num_rows($result)>0){
				$array['shopInfo']=array();
	   		while($rows=mysqli_fetch_array($result)){
	   			$temp=array();
	   			$shopLoc=$rows['Shop_location'];
	   			$shopLatLong=explode(',',$shopLoc);
                $shoplat= bcadd($shopLatLong[0],'0',2);
                $shoplong=bcadd($shopLatLong[1],'0',2);
                if($lat==$shoplat&&$long==$shoplong){
					$temp['shopName']=$rows['Shop_name'];
	   				array_push($array['shopInfo'],$temp);
                }
              
	   		
	   		}
	   		echo json_encode($array);

	   }else{
	   	 echo 0;
	   }
	}else{
		echo 2;
	}
   		