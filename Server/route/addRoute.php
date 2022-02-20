 <?php
 include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    // print_r($_POST);
    if(isset($_POST)){
    	$name=$_POST['ROUTE_NAME'];
    	$longitude=$_POST['LONGITUDE'];
    	$latitude=$_POST['LOCATION'];
    	if($name===''||$latitude==='err-latitude'||$longitude==='err-longitude'||$latitude==''||$longitude==''){
    		echo 0;
    	}else{
    		$location=$latitude.','.$longitude;
    		$result=mysqli_query($con,"SELECT *  FROM `route_table` WHERE `route_table`.`location`='$location'");
    		if(mysqli_num_rows($result)>0){
    			echo 111;
    		}
    		else{
    			$result1=mysqli_query($con,"INSERT INTO `route_table`(`routeid`, `locationName`, `location`) VALUES ('','$name','$location')");
    			if($result1){
    				echo 1;
	    		}else{
	    			echo 0;
	    		}
    		}
    		
    	}
    }