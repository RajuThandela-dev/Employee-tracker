<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$_POST =json_decode(file_get_contents("php://input"),true);
// print_r($_POST);
if(isset($_POST)){
    $category=$_POST['CATAGORY'];
// echo $category;
$con=mysqli_connect("localhost","root","","e-tracker");
if($category===''){
    echo 0;
}else{
    $qry="select * from catagory where cat_name='$category'";
    $result=mysqli_query($con,$qry);
    if(mysqli_num_rows($result)>0){
        echo 0;
    }
    else{
       $qry1="INSERT INTO `catagory`(`cat_id`, `cat_name`) VALUES ('','$category')";
       mysqli_query($con,$qry1);
       echo 1;
    }
}
}
