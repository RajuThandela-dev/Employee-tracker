<?php
   include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
   header("Access-Control-Max-Age:1000");
   header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
   $_POST =json_decode(file_get_contents("php://input"),true);
   if(isset($_POST)){
    $shopName=$_POST['SHOP_NAME'];
    $ownerName=$_POST['SHOP_OWNER_NAME'];
    $phoneNumber=$_POST['PHONE_NUMBER'];
    $email=$_POST['SHOP_EMAIL'];
    $adress=$_POST['SHOP_ADRESS'];
    $location=$_POST['SHOP_LOCATION'];
    $id=$_POST['ID'];
  
    if( $shopName===''||$ownerName===''||$phoneNumber===''||$email===''||$adress===''|| $location===''){
        echo 0;
    }else{
        $routeLocation=explode(',',$location);
        $routeLat= bcadd($routeLocation[0],'0',2);
        $routeLong=bcadd($routeLocation[1],'0',2);
        $result1=mysqli_query($con,"SELECT  `routeId` FROM `assign_route` WHERE `emp_id`='$id'");
        if(mysqli_num_rows($result1)>0){
            $ROUTEID=mysqli_fetch_array($result1)[0];
            $LOC=mysqli_fetch_array(mysqli_query($con,"SELECT  `location` FROM `route_table` WHERE `routeid`='$ROUTEID'"))[0];
            $DBLOC=explode(',',$LOC);
            $DBLAT= bcadd($DBLOC[0],'0',2);
            $DBLONG=bcadd($DBLOC[1],'0',2);
            if($routeLat==$DBLAT&&$routeLong==$DBLONG){
                $result=mysqli_query($con,"SELECT `Shop_id`, `Shop_name`, `Shop_ownername`, `Owner_phoneno`, `Shop_email`, `Shop_location`, `Shop_adress`,`routeid` FROM `shop_information` WHERE `Shop_location`='$location'");
                  if(mysqli_num_rows($result)>0){
                      echo 666;
                  }else{
                      mysqli_query($con,"INSERT INTO `shop_information`(`Shop_id`, `Shop_name`, `Shop_ownername`, `Owner_phoneno`, `Shop_email`, `Shop_location`, `Shop_adress`,`routeid`) VALUES ('','$shopName','$ownerName','$phoneNumber','$email','$location','$adress','$ROUTEID')");
                      echo 1;
                  }
                }else{
                  echo 555;
                }

        }else{
          echo 000;
        }
      
      
    }
   }
    