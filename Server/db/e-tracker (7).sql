-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2019 at 11:05 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `assign_route`
--

CREATE TABLE `assign_route` (
  `id` int(8) NOT NULL,
  `routeId` int(8) NOT NULL,
  `emp_id` int(8) NOT NULL,
  `Date1` date NOT NULL,
  `time1` time NOT NULL,
  `markAttendence` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assign_route`
--

INSERT INTO `assign_route` (`id`, `routeId`, `emp_id`, `Date1`, `time1`, `markAttendence`) VALUES
(3, 49, 100002, '2019-03-12', '16:05:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `attendence_table`
--

CREATE TABLE `attendence_table` (
  `id` int(8) NOT NULL,
  `emp_id` int(8) NOT NULL,
  `location` varchar(30) NOT NULL,
  `date1` date NOT NULL,
  `time1` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendence_table`
--

INSERT INTO `attendence_table` (`id`, `emp_id`, `location`, `date1`, `time1`) VALUES
(2, 100002, '12.9654784,77.6011776', '2019-03-11', '09:45:31');

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `cat_id` int(8) NOT NULL,
  `cat_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catagory`
--

INSERT INTO `catagory` (`cat_id`, `cat_name`) VALUES
(1, 'electronics'),
(3, 'soup'),
(20, 'fdte'),
(21, 'ryuyut'),
(22, 'addew'),
(23, 'ddddd'),
(24, 'gggg'),
(25, 'ddddddddd');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(8) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `emp_sex` varchar(10) NOT NULL,
  `emp_email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emp_dob` date NOT NULL,
  `emp_doj` date NOT NULL,
  `emp_phone` varchar(12) NOT NULL,
  `emp_adress` varchar(50) NOT NULL,
  `pass` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `emp_sex`, `emp_email`, `emp_dob`, `emp_doj`, `emp_phone`, `emp_adress`, `pass`) VALUES
(100001, 'admin', 'male', 'admin@gmail.com', '1995-05-24', '2000-05-13', '9741418699', 'gangolly', 'admin'),
(100002, 'MAHESH', 'male', 'rajuthandela@gmail.c', '1995-09-19', '2019-02-01', '9741418699', ' wef', '2'),
(100003, 'RAJU THANDELA', 'male', 'rah@mail.com', '1999-03-03', '2019-03-17', '9090909090', 'qdd', 'nmqvwlac');

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` int(8) NOT NULL,
  `E_id` int(8) NOT NULL,
  `Date1` date NOT NULL,
  `Time1` time NOT NULL,
  `msg` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`id`, `E_id`, `Date1`, `Time1`, `msg`) VALUES
(3, 100002, '2019-03-17', '12:29:07', 'wfwfwfrfrr');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Item_id` int(8) NOT NULL,
  `Item_name` varchar(20) NOT NULL,
  `cat_id` int(8) NOT NULL,
  `Item_date` date NOT NULL,
  `Item_time` time NOT NULL,
  `Rate` double(10,2) NOT NULL,
  `Qty` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Item_id`, `Item_name`, `cat_id`, `Item_date`, `Item_time`, `Rate`, `Qty`) VALUES
(33, 'mouse', 1, '2019-01-23', '05:42:00', 300.00, 4),
(34, 'shashi', 3, '2019-02-01', '08:02:00', 400.00, 3),
(35, 'monitor', 1, '2019-02-02', '12:57:00', 1000.00, 4),
(48, 'DSFS', 3, '2019-03-01', '11:33:00', 33.00, 333),
(49, 'DWEDWE', 3, '2019-03-01', '11:33:00', 333.00, 3),
(50, 'GGER', 1, '2019-03-01', '11:35:00', 34.00, 2),
(51, 'EFEFE', 1, '2019-03-01', '11:44:00', 3333.00, 33),
(52, 'DWEE', 1, '2019-03-01', '11:45:00', 44444.00, 33),
(53, 'GNGFF', 1, '2019-03-01', '11:53:00', 55.00, 44),
(54, 'TEU4Y4', 3, '2019-03-01', '11:57:00', 3453.00, 44),
(55, 'FEREFE', 1, '2019-03-01', '12:01:00', 3443.00, 334),
(56, 'WSQWD', 3, '2019-03-01', '12:09:00', 334.00, 22),
(57, 'FSGFDG', 1, '2019-03-01', '12:11:00', 34.00, 343),
(58, 'TERTE', 1, '2019-03-01', '12:12:00', 543.00, 54),
(59, '333E', 1, '2019-03-01', '12:14:00', 3333.00, 33),
(60, 'SDFEE', 3, '2019-03-01', '12:16:00', 324.00, 33),
(61, 'EWEWE', 1, '2019-03-01', '12:18:00', 3333.00, 2),
(62, 'EEEE', 1, '2019-03-01', '12:18:00', 32.00, 32),
(63, 'SFSD', 1, '2019-03-01', '12:19:00', 45.00, 3),
(64, 'SFFS', 1, '2019-03-01', '12:20:00', 43.00, 3),
(65, 'FSFSDSSF', 21, '2019-03-01', '12:20:00', 4344.00, 34),
(66, '4EEWW', 1, '2019-03-01', '12:22:00', 4333.00, 343),
(67, 'VSFF', 1, '2019-03-01', '12:24:00', 43.00, 33),
(68, 'EDWEDW', 1, '2019-03-01', '12:25:00', 43.00, 33),
(69, 'RTERT', 1, '2019-03-01', '12:31:00', 34334.00, 5),
(70, 'WERFW', 1, '2019-03-01', '12:33:00', 43.00, 43),
(71, 'FSFSF', 3, '2019-03-01', '12:34:00', 43.00, 23),
(72, 'PANCH', 1, '2019-03-01', '02:44:00', 500.00, 4),
(73, 'WFWR', 1, '2019-03-01', '03:16:00', 34.00, 3),
(74, 'YYYYY', 3, '2019-03-06', '03:22:00', 500.00, 2),
(75, 'SFGDFG', 3, '2019-03-08', '09:02:00', 45.00, 4),
(76, 'SSSSSSS', 25, '2019-03-10', '08:22:00', 300.00, 3),
(77, 'WQEDQ', 1, '2019-03-11', '09:53:00', 44.00, 54);

-- --------------------------------------------------------

--
-- Table structure for table `leave_table`
--

CREATE TABLE `leave_table` (
  `id` int(8) NOT NULL,
  `E_id` int(8) NOT NULL,
  `date1` date NOT NULL,
  `time1` time NOT NULL,
  `L_date` date NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `confirm` int(8) NOT NULL,
  `reject` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_table`
--

INSERT INTO `leave_table` (`id`, `E_id`, `date1`, `time1`, `L_date`, `purpose`, `confirm`, `reject`) VALUES
(64, 100002, '2019-03-07', '10:45:00', '2019-03-10', 'Have to attend family function', 1, 0),
(65, 100002, '2019-03-10', '11:39:00', '2019-03-13', 'ssssss', 1, 0),
(66, 100002, '2019-03-11', '12:22:00', '2019-03-13', 'Gdhsjsj', 1, 0),
(67, 100002, '2019-03-17', '12:23:00', '2019-03-18', 'sswdfdsfsf', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int(8) NOT NULL,
  `empID` int(8) NOT NULL,
  `currentDate` date NOT NULL,
  `currentTime` time NOT NULL,
  `jsonString` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`id`, `empID`, `currentDate`, `currentTime`, `jsonString`) VALUES
(42, 100002, '2019-03-01', '04:24:00', '{\"order\":[{\"shopName\":\"venkateshwara\",\"catagory\":\"electronics\",\"itemName\":\"monitor\",\"rate\":\"1000.00\",\"qty\":\"4\",\"total\":4000}],\"noOfOrders\":1}'),
(43, 100002, '2019-03-01', '07:03:00', '{\"order\":[{\"shopName\":\"venkateshwara\",\"catagory\":\"soup\",\"itemName\":\"shashi\",\"rate\":\"400.00\",\"qty\":\"3\",\"total\":1200}],\"noOfOrders\":1}'),
(44, 100002, '2019-03-01', '07:04:00', '{\"order\":[{\"shopName\":\"venkateshwara\",\"catagory\":\"electronics\",\"itemName\":\"mouse\",\"rate\":\"300.00\",\"qty\":\"6\",\"total\":1800}],\"noOfOrders\":1}'),
(45, 100002, '2019-03-06', '03:26:00', '{\"order\":[{\"shopName\":\"venkateshwara\",\"catagory\":\"electronics\",\"itemName\":\"monitor\",\"rate\":\"1000.00\",\"qty\":\"2\",\"total\":2000}],\"noOfOrders\":1}'),
(46, 100002, '2019-03-11', '03:34:00', '{\"order\":[{\"shopName\":\"venkateshwara\",\"catagory\":\"electronics\",\"itemName\":\"mouse\",\"rate\":\"300.00\",\"qty\":\"5\",\"total\":1500},{\"shopName\":\" electro\",\"catagory\":\"electronics\",\"itemName\":\"monitor\",\"rate\":\"1000.00\",\"qty\":\"6\",\"total\":6000},{\"shopName\":\"HHHHH\",\"catagory\":\"ryuyut\",\"itemName\":\"FSFSDSSF\",\"rate\":\"4344.00\",\"qty\":\"6\",\"total\":26064}],\"noOfOrders\":3}'),
(47, 100002, '2019-03-11', '09:46:00', '{\"order\":[{\"shopName\":\"HHHHH\",\"catagory\":\"electronics\",\"itemName\":\"EFEFE\",\"rate\":\"3333.00\",\"qty\":\"4\",\"total\":13332},{\"shopName\":\"HHHHH\",\"catagory\":\"soup\",\"itemName\":\"DWEDWE\",\"rate\":\"333.00\",\"qty\":\"6\",\"total\":1998},{\"shopName\":\"HHHHH\",\"catagory\":\"ryuyut\",\"itemName\":\"FSFSDSSF\",\"rate\":\"4344.00\",\"qty\":\"7\",\"total\":30408}],\"noOfOrders\":3}'),
(48, 100002, '2019-03-11', '09:48:00', '{\"order\":[{\"shopName\":\"BUISSNESS\",\"catagory\":\"electronics\",\"itemName\":\"EWEWE\",\"rate\":\"3333.00\",\"qty\":\"6\",\"total\":19998},{\"shopName\":\"BUISSNESS\",\"catagory\":\"ryuyut\",\"itemName\":\"FSFSDSSF\",\"rate\":\"4344.00\",\"qty\":\"7\",\"total\":30408},{\"shopName\":\"BUISSNESS\",\"catagory\":\"soup\",\"itemName\":\"DWEDWE\",\"rate\":\"333.00\",\"qty\":\"7\",\"total\":2331}],\"noOfOrders\":3}'),
(49, 100002, '2019-03-17', '01:28:29', '{\"order\":[{\"shopName\":\"HHHHH\",\"catagory\":\"soup\",\"itemName\":\"DSFS\",\"rate\":\"33.00\",\"qty\":\"9\",\"total\":297}],\"noOfOrders\":1}');

-- --------------------------------------------------------

--
-- Table structure for table `route_table`
--

CREATE TABLE `route_table` (
  `routeid` int(8) NOT NULL,
  `locationName` varchar(20) NOT NULL,
  `location` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `route_table`
--

INSERT INTO `route_table` (`routeid`, `locationName`, `location`) VALUES
(13, 'cetra', '13.622157,74.689789'),
(14, 'central', '10.6221611,74.6897947'),
(15, 'ce', '13.621848,74.6927859'),
(16, 'Pu lab ', '13.621891,74.6928819'),
(17, 'Aaaa', '13.6215855,74.6898249'),
(18, 'central lab', '13.6233501,74.691051'),
(19, '123456adfh', '13.6632061,74.6559566'),
(43, 'CENTRA', '12.9662976,77.6036352'),
(44, 'CENTRAL LB', '13.6236645,74.681161'),
(45, 'PPPP', '12.9507328,77.6134656'),
(46, 'KUNDAPUR', '13.622157,74.6893461'),
(47, 'RRRR', '12.9736704,77.602816'),
(48, 'CLAB 1', '12.9687552,77.6134656'),
(49, 'LABBU', '12.9654784,77.6011776');

-- --------------------------------------------------------

--
-- Table structure for table `shop_information`
--

CREATE TABLE `shop_information` (
  `Shop_id` int(8) NOT NULL,
  `Shop_name` varchar(20) NOT NULL,
  `Shop_ownername` varchar(30) NOT NULL,
  `Owner_phoneno` varchar(12) NOT NULL,
  `Shop_email` varchar(20) NOT NULL,
  `Shop_location` varchar(30) NOT NULL,
  `Shop_adress` varchar(50) NOT NULL,
  `routeid` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shop_information`
--

INSERT INTO `shop_information` (`Shop_id`, `Shop_name`, `Shop_ownername`, `Owner_phoneno`, `Shop_email`, `Shop_location`, `Shop_adress`, `routeid`) VALUES
(1, 'venkateshwara', ' mahesh', ' 9741418699', 'mookambika@gmail.com', '13.622157,74.689789', 'mysore', 0),
(2, ' electro', ' mahadeva', ' 7878787873', 'electro@gmail.com', '13.626777,74.689889', 'gangolly', 0),
(3, ' Alex', ' Alex', ' 1234567890', 'alex@gmail.com', ' 13.6373729,74.6978995', 'Abcdef', 0),
(27, 'HHHHH', 'GGGGG', '9889899898', 's@f.in', '12.966297599999999,77.6036352', 'sWS', 43),
(28, 'VENKANTE', 'TEKKATE', '9741564156', 'dh@gmail.com', '13.6233845,74.6905908', 'Gooo', 44),
(29, 'BUISSNESS', 'RAJU THAND', '9898989898', 'arr@g.in', '12.9654784,77.6011776', 'fgertg', 49);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign_route`
--
ALTER TABLE `assign_route`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendence_table`
--
ALTER TABLE `attendence_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`Item_id`);

--
-- Indexes for table `leave_table`
--
ALTER TABLE `leave_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `route_table`
--
ALTER TABLE `route_table`
  ADD PRIMARY KEY (`routeid`);

--
-- Indexes for table `shop_information`
--
ALTER TABLE `shop_information`
  ADD PRIMARY KEY (`Shop_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign_route`
--
ALTER TABLE `assign_route`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendence_table`
--
ALTER TABLE `attendence_table`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `cat_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100004;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `Item_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `leave_table`
--
ALTER TABLE `leave_table`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `route_table`
--
ALTER TABLE `route_table`
  MODIFY `routeid` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `shop_information`
--
ALTER TABLE `shop_information`
  MODIFY `Shop_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
