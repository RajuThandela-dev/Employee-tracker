<?php
	include('../connection/connection.php');
	header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    if(isset($_POST)){
    	$empId=$_POST['empid'];
    	$result=mysqli_query($con,"SELECT `routeId` FROM `assign_route` WHERE `emp_id`='$empId'");  
    	if(mysqli_num_rows($result)>0){
    		$array=array();
    		while($raw=mysqli_fetch_array($result)){
		    			$routeId=$raw[0];
		    			$raw['arr']=array();
		    		$routeName=mysqli_fetch_array(mysqli_query($con,"SELECT `locationName` FROM `route_table` WHERE `routeid`='$routeId'"))[0];
		    		$raw['routeName']=$routeName;
		    		$routeLocation=mysqli_fetch_array(mysqli_query($con,"SELECT `location` FROM `route_table` WHERE `routeid`='$routeId'"))[0];
		    		$routeLocation=explode(',',$routeLocation);
		    		$routeLat= bcadd($routeLocation[0],'0',2);
		    		$routeLong=bcadd($routeLocation[1],'0',2);
		    		$resultShop=mysqli_query($con,"SELECT `Shop_id`, `Shop_name`, `Shop_ownername`, `Owner_phoneno`, `Shop_email`, `Shop_location`, `Shop_adress`,`routeid` FROM `shop_information` ");
				    		if(mysqli_num_rows($resultShop)>0){
				    			while($row=mysqli_fetch_array($resultShop)){
				    				$shopLocation=explode(',',$row['Shop_location']);
				    				$shopLat=bcadd($shopLocation[0],'0',2);
				    				$shopLong=bcadd($shopLocation[1],'0',2);
						    				if($routeLat==$shopLat&&$routeLong==$shopLong){
						    					$row['shopLoc']=$row['Shop_location'];
						    					// $row['json']=$row;

						    					// $row['json']=json_encode($row['json']);
						    					// json_decode($row['json'],true);
						    					// json_decode($row,true);
						    					
						    					array_push($raw['arr'],$row);
						    				}
						    				else{
						    					// echo 0;
						    				}
						    				
				    			}
				    			
				    		
				    		}else{
				    			// echo 0;
				    		}
				 array_push($array,$raw);

		    }
    		if($routeLat==$shopLat&&$routeLong==$shopLong){
    				echo json_encode($array);
    			}else{
    					echo json_encode($array);
    			}
    		
    	}else{
    		echo 0;
    	}

    }
