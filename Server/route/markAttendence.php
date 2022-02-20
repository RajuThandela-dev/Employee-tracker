<?php
	include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    // print_r( $_POST);
    // if(isset($_POST)){

    	$latitude=$_POST['lat'];
    	$longitude=$_POST['long'];
    	$empId=$_POST['emp_id'];
        $latt=$_POST['state']['latitude'];
        $longg=$_POST['state']['longitude'];
        // $latitude=13.6236645;
        // $longitude=74.681161;
        // $empId='100002';
        $lo=$latt.','.$longg;
     
       
        $currentDate=date('Y-m-d');
        $currentTime=date('h:i:s');
    	if($latitude==''||$longitude==''||$empId==''){
    		echo 0;
    	}else{
    		$result=mysqli_query($con,"SELECT `id`, `routeId`, `emp_id`, `Date1`, `time1` FROM `assign_route` WHERE  `emp_id`='$empId'");
    		if(mysqli_num_rows($result)>0){
    			$raw=mysqli_fetch_array($result);
    			$routeId=$raw['routeId'];
                $date=$raw['Date1'];
                $time=$raw['time1'];
             
                $current=new DateTime();
                $assign=new DateTime($date." ".$time);
                
                   $raw['lat-long']=mysqli_fetch_array(mysqli_query($con,"SELECT `location` FROM `route_table` WHERE `routeid`='$routeId'"))[0];
                   $loc= $raw['lat-long'];
                $latLong=explode(',',$raw['lat-long']);
                $lat= bcadd($latLong[0],'0',2);
                $long=bcadd($latLong[1],'0',2);
                if($latitude==$lat&&$longitude==$long){
                    $res=mysqli_query($con,"SELECT * FROM `assign_route` WHERE `emp_id`='$empId' AND `markAttendence`=1");
                    if(mysqli_num_rows($res)>0){
                        echo 999;
                    }else{
                         if($current<=$assign){
                        mysqli_query($con,"UPDATE `assign_route` SET `markAttendence`=1 WHERE `emp_id`='$empId'");
                     mysqli_query($con,"INSERT INTO `attendence_table`(`id`, `emp_id`, `location`, `date1`, `time1`) VALUES ('','$empId','$lo','$currentDate','$currentTime')");
                         echo 111;
                     }else{
                         echo  555;;
                     }
                    }
                   
                }else{
                    echo 000;
                }
             
    			
    			
    		}else{
    			echo 444;
    		}

    	}
    	
    // }