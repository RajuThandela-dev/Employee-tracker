<?php
        //include('./../connection/connection.php');
        header("Access-Control-Allow-Origin:*");
        header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
        header("Access-Control-Max-Age:1000");
        header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
        $_POST =json_decode(file_get_contents("php://input"),true);
       // print_r($_POST);
       if(isset($_POST)){
            $username="root";
            $password="";
            $conn = mysqli_connect('localhost',$username, $password,'e-tracker');
            $id=mysqli_fetch_array(mysqli_query($conn,"select emp_id from employee order by emp_id desc"))[0];
            $id++;
            $empName=$_POST['EMPLOYEE_NAME'];
            $empEmail=$_POST['EMPLOYEE_EMAIL'];
            $empSex=$_POST['EMPLOYEE_GENDER'];
            $DOB=$_POST['EMPLOYEE_DOB'];
            $phone=$_POST['PHONE_NUMBER'];
            $adress=$_POST['ADRESS'];
            $DOR=date("Y-m-d");
            $pass=$_POST['PASSWORD'];
            if( $empName===''|| $empEmail===''|| $empSex===''|| $DOB===''||$phone===''|| $adress===''|| $DOR===''|| $pass===''){
                  echo 0;
            }else{
                  $result=mysqli_query($conn,"SELECT * FROM `employee` WHERE `employee`.`emp_email`='$empEmail'");
                  $result1=mysqli_query($conn,"SELECT * FROM `employee` WHERE `employee`.`emp_phone`='$phone'");
                  if(mysqli_num_rows($result)>0){
                      echo 111;

                  }
                  elseif(mysqli_num_rows($result1)>0){
                      echo 222;
                  }else{
                      $qry = "INSERT INTO `employee`(`emp_id`, `emp_name`, `emp_sex`, `emp_email`, `emp_dob`, `emp_doj`, `emp_phone`, `emp_adress`, `pass`) VALUES ('$id','$empName','$empSex','$empEmail','$DOB','$DOR','$phone','$adress','$pass')";
                       $result2=mysqli_query($conn,$qry);
                        if($result2){
                          echo 1;
                        }else{
                           echo 00;
                        }
                 
                  }
                 
            
            }
       }
        
       
        mysqli_close($conn);
