<?php 
include("../connection/connection.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$_POST =json_decode(file_get_contents("php://input"),true);
// print_r($_POST);
$catagory=$_POST['data'];
$catId=mysqli_fetch_array(mysqli_query($con,"SELECT  `cat_id` FROM `catagory` WHERE  `cat_name`='$catagory'"))[0];
// $con=mysqli_connect('localhost','root','','e-tracker');
$qry="select * from item where  `cat_id`='$catId'";
$result=mysqli_query($con,$qry);
if(mysqli_num_rows($result)>0){
    $res['data']=array();
    while($raws=mysqli_fetch_array($result)){
        $temp=array();
        $temp['itemname']=$raws['Item_name'];
        $catId=$raws['cat_id'];
        $catname=mysqli_fetch_array(mysqli_query($con,"SELECT `cat_name` FROM `catagory` WHERE `cat_id`='$catId'"))[0];
        $temp['cat_name']= $catname;
        $temp['item_date']=$raws['Item_date'];
        $temp['item_time']=$raws['Item_time'];
        $temp['Rate']=$raws['Rate'];
        $temp['quantity']=$raws['Qty'];
       
        $temp['res']=true;
        array_push($res['data'],$temp);


    }
    echo json_encode($res);
}
else{
    echo 0;
}