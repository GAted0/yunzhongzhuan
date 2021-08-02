CREATE DATABASE  IF NOT EXISTS `inthenas` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `inthenas`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: inthenas
-- ------------------------------------------------------
-- Server version	5.6.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UID` int(11) NOT NULL,
  `Username` varchar(200) NOT NULL,
  `CreateDatetime` datetime NOT NULL,
  `FileSize` bigint(20) NOT NULL,
  `FileName` text NOT NULL,
  `Hash` text NOT NULL,
  `FolderOf` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (20,5,'1234','2021-08-02 03:07:43',1909534,'Cover.jpg','d9a7c3ae622702a8eec8e37a159d4363f25b662265f4ddc58d09c90b801c4e2081b04a9067df88389dc925a872d372e7770d7ec194829789ba1dff9185aa5e36b3cba87b4d5131187e343e6a93278eaced71aa058c1de7301a00be1b95',0),(21,5,'1234','2021-08-02 03:09:25',4811424,'操场0.jpg','d9a7c3ae622702a8eec8e37a159d4363f25b662265f4ddc58d5e995882194d24dbbe459467d68d3acccc70a3278075e1275c259390d3c78cb810fcc38eac5c35efcdfc784f03324c7a623e6dc175d8febc22ac568a1cb1661602a3f7a3',0),(26,7,'520','2021-08-02 03:59:30',303034,'中华人民共和国国旗.png','d2614d6de0ed3c03b12ceeb23bb0ad9d75989d4f51c2e22e6a232bd87595313aa4545cb5bcd7fd1fce405415edb6454b7ac2b569b4bf804aaa4b377bacea55bfa97ad265493a99cef79bd08be7ea14345f10749927e91ab4e1f32c02e774ea',0),(27,8,'1477675561','2021-08-02 04:09:02',8230462,'HTML5植物大战僵尸.zip','d9a7c3ae622702a8eec8fd354f8a4c65e75d6e366afbd4dec355870a841e4b21dce245943cd38d69c59925fb27d07ee7790e299d948396d8bc1cae918baa0863e99da9794c00631f7e626739c22edbaeec75ac578d4ab5621a50d90294b51f',0),(28,9,'361683590@qq.com','2021-08-02 06:18:10',142966650,'共和国之辉.exe','d2614d6de0ed3c03b12ceeb23bb0ad9d75989d4f51c2e22e6a232b8a2ace606cf05507e4e082aa1dc9460313b1e712197991e83ee7bcd44ba814652dafea09bdfa2dd565476d90c9f1cb8688b5eb44375b147c9c72ef4ab9e1f770030d0c5e',0),(29,10,'sjjsjj','2021-08-02 08:41:53',1615189,'Screenshot_20210801_215212_com.huawei.android.launcher.jpg','d9a7c3ae622702a8eec8fd354f8a4c65e75d6e366afbd4dec355870dd4484c71dab340c66dd1d06dc8ce27fc20d176e4205c7cc197d491d8bd47adc68ea20c37bfcdab73490639492c613e3f9570d0a8e422ac01df16e0661c51de00d4fd18',0),(30,11,'2823323209','2021-08-02 11:32:36',2463888,'Shell_20210802-092832-638.png','d9a7c3ae622702a8eec8fd354f8a4c65e75d6e366afbd4dec3558758d912482c8cbf46956686da3dc9cd71aa768026eb735b78c4c08395d9bd10fbc28daa5466bccbab29185366442c65376fc427d9feb875aa50841be2364f02db00f56b22',0),(31,12,'intnet','2021-08-02 11:40:24',13969201,'InetDownloadManager6.39.2.exe','d2614d6de0ed3c03b12ceeb23bb0ad9d75989d4f51c2e22e6a232bd826cf3633f50f54b2b4d3fc1f9f415344e4e746472c94e66ee2bcd140af18672caeba59bff9278762136d98c0a3c8d18de6ba4068584476cb24e54eb5e7a32d04919975',0);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FolderName` text NOT NULL,
  `CreateDatetime` datetime NOT NULL,
  `Of` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
INSERT INTO `folders` VALUES (7,'软件','2021-08-02 03:14:39',0,5),(8,'音乐','2021-08-02 03:14:51',0,5);
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `httpslinks`
--

DROP TABLE IF EXISTS `httpslinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `httpslinks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UID` int(11) NOT NULL,
  `Datetime` datetime NOT NULL,
  `FileID` int(11) NOT NULL,
  `RandVerifyString` varchar(500) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `httpslinks`
--

LOCK TABLES `httpslinks` WRITE;
/*!40000 ALTER TABLE `httpslinks` DISABLE KEYS */;
INSERT INTO `httpslinks` VALUES (1,5,'2021-08-02 01:47:16',1,'A2dNjYJv'),(2,5,'2021-08-02 01:51:03',2,'TTfkDl7f'),(3,5,'2021-08-02 01:52:45',3,'cKJwxO66'),(4,5,'2021-08-02 01:52:57',4,'Xx6BL2l7'),(5,5,'2021-08-02 01:53:09',5,'pMUq4rcm'),(6,5,'2021-08-02 01:54:02',6,'JhV9qTJy'),(7,5,'2021-08-02 02:04:11',7,'Y8OMDRi2'),(8,5,'2021-08-02 02:04:11',8,'1DNTF3CM'),(9,5,'2021-08-02 02:04:12',9,'YfDV7CzL'),(10,5,'2021-08-02 02:04:12',10,'uldm6qWZ'),(11,5,'2021-08-02 02:04:12',11,'iHgJMKCY'),(12,5,'2021-08-02 02:07:06',12,'h5ltcNRn'),(13,5,'2021-08-02 02:20:04',13,'H0lS2EU3'),(14,5,'2021-08-02 02:20:04',14,'uB2pThrO'),(15,5,'2021-08-02 02:20:04',15,'2Y3KrFP7'),(16,5,'2021-08-02 02:22:30',16,'mMUBLors'),(17,5,'2021-08-02 02:24:30',17,'tzBE8a02'),(18,5,'2021-08-02 02:40:24',18,'7OWk1owT'),(19,5,'2021-08-02 02:42:21',19,'4KxTDs2V'),(20,5,'2021-08-02 03:07:43',20,'zaDtSuVe'),(21,5,'2021-08-02 03:09:25',21,'GoWAqefc'),(22,7,'2021-08-02 03:37:22',22,'k18Z8biu'),(23,7,'2021-08-02 03:38:28',23,'B9TH4kvm'),(24,7,'2021-08-02 03:50:28',24,'nie2Y0hh'),(25,7,'2021-08-02 03:50:31',25,'ou05lH03'),(26,7,'2021-08-02 03:59:30',26,'lqarqBtH'),(27,8,'2021-08-02 04:09:02',27,'JshcJuOz'),(28,9,'2021-08-02 06:18:10',28,'pY333t23'),(29,10,'2021-08-02 08:41:53',29,'BRGgaAZq'),(30,11,'2021-08-02 11:32:36',30,'UW2ArSGX'),(31,12,'2021-08-02 11:40:24',31,'ew8uaktR');
/*!40000 ALTER TABLE `httpslinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharefiles`
--

DROP TABLE IF EXISTS `sharefiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sharefiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FileID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `Datetime` datetime NOT NULL,
  `RandVerifyString` varchar(10000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharefiles`
--

LOCK TABLES `sharefiles` WRITE;
/*!40000 ALTER TABLE `sharefiles` DISABLE KEYS */;
INSERT INTO `sharefiles` VALUES (1,1,5,'2021-08-02 01:47:19','M9TgruVm'),(2,2,5,'2021-08-02 01:51:04','wrHsgb4U'),(3,3,5,'2021-08-02 01:52:47','zaw4Q7sq'),(4,4,5,'2021-08-02 01:52:58','M6f3GEF9'),(5,5,5,'2021-08-02 01:53:10','PrmnlHyF'),(6,6,5,'2021-08-02 01:54:04','psfvKrfx'),(7,9,5,'2021-08-02 02:04:13','CbnF9Yeq'),(8,10,5,'2021-08-02 02:04:18','jyA5tpFY'),(9,11,5,'2021-08-02 02:04:18','qqAvbm69'),(10,7,5,'2021-08-02 02:04:18','EfzCBbzj'),(11,8,5,'2021-08-02 02:04:18','awJH9ymP'),(12,12,5,'2021-08-02 02:07:07','zBtQFp5g'),(13,13,5,'2021-08-02 02:20:05','AxXELVZm'),(14,14,5,'2021-08-02 02:20:15','xSANfR24'),(15,15,5,'2021-08-02 02:20:15','YKUCuxHR'),(16,16,5,'2021-08-02 02:22:31','tKH4kKsl'),(17,17,5,'2021-08-02 02:24:32','WRyqtiI1'),(18,18,5,'2021-08-02 02:40:25','m9K9GlKi'),(19,19,5,'2021-08-02 02:42:22','wVKYpEaX'),(20,20,5,'2021-08-02 03:07:44','DLP30cdv'),(21,21,5,'2021-08-02 03:09:26','U2wJZxvM'),(22,22,7,'2021-08-02 03:37:23','ZNid1Nzy'),(23,23,7,'2021-08-02 03:38:29','l3BDV8g4'),(24,25,7,'2021-08-02 03:50:31','tJgzVNG3'),(25,24,7,'2021-08-02 03:55:56','Ckug9ju2'),(26,26,7,'2021-08-02 03:59:31','OMrRxSJ9'),(27,27,8,'2021-08-02 04:09:03','VVx0NLCR'),(28,28,9,'2021-08-02 06:18:11','T8l5WUrY'),(29,29,10,'2021-08-02 08:41:53','7Gi3Ykto'),(30,30,11,'2021-08-02 11:32:38','B1E2Ztta'),(31,31,12,'2021-08-02 11:40:26','EKzPdaEZ');
/*!40000 ALTER TABLE `sharefiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(200) NOT NULL,
  `Password` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`,`Username`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'demo','demo'),(4,'123','123'),(5,'1234','1234'),(6,'12345','123'),(7,'520','520'),(8,'1477675561','lixiaorui.123'),(9,'361683590@qq.com','aabbc123456'),(10,'sjjsjj','200707276913et'),(11,'2823323209','wzb132452'),(12,'intnet','cbb123456');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-02 12:30:51
