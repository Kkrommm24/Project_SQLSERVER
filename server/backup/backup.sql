-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: QLPK
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allcodes`
--

DROP TABLE IF EXISTS `allcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allcodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `valueEn` varchar(255) DEFAULT NULL,
  `valueVi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allcodes`
--

LOCK TABLES `allcodes` WRITE;
/*!40000 ALTER TABLE `allcodes` DISABLE KEYS */;
INSERT INTO `allcodes` VALUES (1,'M','GENDER','Male','Nam','2023-07-08 19:57:21','2023-07-08 19:57:21'),(2,'F','GENDER','Female','Nữ','2023-07-08 19:57:21','2023-07-08 19:57:21'),(3,'O','GENDER','Other','Khác','2023-07-08 19:57:21','2023-07-08 19:57:21'),(4,'S1','STATUS','Pending','Chờ xác nhận','2023-07-08 19:57:21','2023-07-08 19:57:21'),(5,'S2','STATUS','Confirmed','Đã xác nhận','2023-07-08 19:57:21','2023-07-08 19:57:21'),(6,'S3','STATUS','Done','Đã khám xong','2023-07-08 19:57:21','2023-07-08 19:57:21'),(7,'S4','STATUS','Cancel','Đã hủy','2023-07-08 19:57:21','2023-07-08 19:57:21'),(8,'T1','TIME','8:00 AM - 9:00 AM','8:00 - 9:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(9,'T2','TIME','9:00 AM - 10:00 AM','9:00 - 10:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(10,'T3','TIME','10:00 AM - 11:00 AM','10:00 - 11:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(11,'T4','TIME','11:00 AM - 12:00 PM','11:00 - 12:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(12,'T5','TIME','1:00 PM - 2:00 PM','13:00 - 14:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(13,'T6','TIME','2:00 PM - 3:00 PM','14:00 - 15:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(14,'T7','TIME','3:00 PM - 4:00 PM','15:00 - 16:00','2023-07-08 19:57:21','2023-07-08 19:57:21'),(15,'T8','TIME','4:00 PM - 5:00 PM','16:00 - 17:00','2023-07-08 19:57:21','2023-07-08 19:57:21');
/*!40000 ALTER TABLE `allcodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `StatusId` int(11) NOT NULL,
  `DoctorId` int(11) NOT NULL,
  `PatientId` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `timeType` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`DoctorId`,`PatientId`),
  KEY `bookings_ibfk_patients` (`PatientId`),
  KEY `bookings_ibfk_allcodes_status` (`StatusId`),
  KEY `bookings_ibfk_allcodes_timeType` (`timeType`),
  KEY `bookings_ibfk_doctors` (`DoctorId`),
  CONSTRAINT `bookings_ibfk_allcodes_status` FOREIGN KEY (`StatusId`) REFERENCES `allcodes` (`id`),
  CONSTRAINT `bookings_ibfk_allcodes_timeType` FOREIGN KEY (`timeType`) REFERENCES `allcodes` (`id`),
  CONSTRAINT `bookings_ibfk_doctors` FOREIGN KEY (`DoctorId`) REFERENCES `doctors` (`id`),
  CONSTRAINT `bookings_ibfk_patients` FOREIGN KEY (`PatientId`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,6,30,1,'2023-07-17',8,'2023-07-17 21:09:37','2023-07-17 22:40:14'),(2,7,30,1,'2023-07-18',9,'2023-07-17 21:10:07','2023-07-18 11:02:53'),(3,7,4,1,'2023-07-18',14,'2023-07-17 21:10:23','2023-07-17 21:10:33'),(4,7,4,1,'2023-09-18',14,'2023-07-17 22:56:01','2023-07-17 22:57:57'),(5,6,30,1,'2023-07-18',13,'2023-07-17 23:10:06','2023-07-18 11:03:23'),(13,4,30,1,'2023-07-19',11,'2023-07-18 11:06:10','2023-07-18 11:06:10');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinics`
--

DROP TABLE IF EXISTS `clinics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Clinic_address` varchar(255) DEFAULT NULL,
  `Clinic_name` varchar(255) DEFAULT NULL,
  `Clinic_description` text DEFAULT NULL,
  `Clinic_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinics`
--

LOCK TABLES `clinics` WRITE;
/*!40000 ALTER TABLE `clinics` DISABLE KEYS */;
INSERT INTO `clinics` VALUES (1,'123 Clinic Street, City','Phòng khám đa khoa - Cơ sở 1','Cơ sở 1 của Phòng khám đa khoa được trang bị các thiết bị y tế hiện đại và có đội ngũ bác sĩ chuyên nghiệp và giàu kinh nghiệm để đảm bảo cung cấp dịch vụ chăm sóc sức khỏe chất lượng cho bệnh nhân.','clinic1.jpg','2023-07-08 19:57:33','2023-07-08 19:57:33'),(2,'456 Clinic Street, City','Phòng khám đa khoa - Cơ sở 2','Cơ sở 2 của Phòng khám đa khoa được trang bị các phòng khám chuyên khoa đa dạng và đội ngũ bác sĩ có chuyên môn cao để đáp ứng nhu cầu chăm sóc sức khỏe đa dạng của bệnh nhân.','clinic2.jpg','2023-07-08 19:57:33','2023-07-08 19:57:33'),(3,'789 Clinic Street, City','Phòng khám đa khoa - Cơ sở 3','Cơ sở 3 của Phòng khám đa khoa có không gian rộng rãi và thoải mái, cùng với trang thiết bị y tế tiên tiến để đảm bảo cung cấp dịch vụ chăm sóc sức khỏe tốt nhất cho bệnh nhân.','clinic3.jpg','2023-07-08 19:57:33','2023-07-08 19:57:33'),(4,'ABC Clinic Street, City','Phòng khám đa khoa - Cơ sở 4','Cơ sở 4 của Phòng khám đa khoa có đội ngũ bác sĩ chất lượng cao và có kinh nghiệm trong các lĩnh vực khám bệnh và điều trị bệnh lý đa dạng, giúp bệnh nhân nhận được sự chăm sóc y tế tốt nhất.','clinic4.jpg','2023-07-08 19:57:33','2023-07-08 19:57:33'),(5,'XYZ Clinic Street, City','Phòng khám đa khoa - Cơ sở 5','Cơ sở 5 của Phòng khám đa khoa được thiết kế hiện đại và có các phòng khám tiện nghi, đảm bảo mang đến một môi trường chăm sóc sức khỏe thoải mái và an toàn cho bệnh nhân.','clinic5.jpg','2023-07-08 19:57:33','2023-07-08 19:57:33');
/*!40000 ALTER TABLE `clinics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `ClinicId` int(11) DEFAULT NULL,
  `SpecializationId` int(11) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `Doctor_firstName` varchar(255) DEFAULT NULL,
  `Doctor_lastName` varchar(255) DEFAULT NULL,
  `Doctor_address` varchar(255) DEFAULT NULL,
  `Doctor_gender` int(11) NOT NULL,
  `Doctor_age` int(11) DEFAULT NULL,
  `Doctor_phoneNumber` varchar(255) DEFAULT NULL,
  `Doctor_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `doctors_ibfk_clinics` (`ClinicId`),
  KEY `doctors_ibfk_specializations` (`SpecializationId`),
  KEY `doctors_ibfk_allcodes` (`Doctor_gender`),
  CONSTRAINT `doctors_ibfk_allcodes` FOREIGN KEY (`Doctor_gender`) REFERENCES `allcodes` (`id`),
  CONSTRAINT `doctors_ibfk_clinics` FOREIGN KEY (`ClinicId`) REFERENCES `clinics` (`id`),
  CONSTRAINT `doctors_ibfk_logins` FOREIGN KEY (`email`) REFERENCES `logins` (`email`),
  CONSTRAINT `doctors_ibfk_specializations` FOREIGN KEY (`SpecializationId`) REFERENCES `specializations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'andrew12@gmail.com',1,5,'Doctor','Olivia','Emily','456 Medical Avenue',2,34,'092-263-3019','doctor1.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(2,'andrew7@gmail.com',5,4,'Doctor','Matthew','Emily','789 Healthcare Lane',2,43,'044-111-9127','doctor2.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(3,'ava1@gmail.com',3,1,'Doctor','Ava','Abigail','123 Doctor Street',1,30,'066-504-3346','doctor3.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(4,'ava25@gmail.com',1,1,'Doctor','Charlotte','Emma','789 Healthcare Lane',3,35,'073-142-5434','doctor4.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(5,'ava28@gmail.com',5,5,'Doctor','James','Abigail','321 Clinic Road',1,47,'064-332-4059','doctor5.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(6,'ava5@gmail.com',3,4,'Doctor','John','Sophia','123 Doctor Street',1,42,'082-841-0546','doctor6.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(7,'ava6@gmail.com',2,2,'Doctor','Mia','William','789 Healthcare Lane',2,41,'076-015-5456','doctor7.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(8,'ava9@gmail.com',5,5,'Doctor','William','Christopher','123 Doctor Street',2,40,'018-933-9386','doctor8.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(9,'charlotte20@gmail.com',4,1,'Doctor','Jane','Olivia','321 Clinic Road',3,39,'082-341-6165','doctor9.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(10,'charlotte26@gmail.com',3,4,'Doctor','Christopher','Sophia','789 Healthcare Lane',1,47,'007-935-6731','doctor10.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(11,'christopher2@gmail.com',5,5,'Doctor','Matthew','Emma','321 Clinic Road',2,30,'027-017-3529','doctor11.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(12,'christopher30@gmail.com',1,1,'Doctor','David','Joseph','321 Clinic Road',2,42,'064-484-5540','doctor12.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(13,'daniel27@gmail.com',3,4,'Doctor','Andrew','Olivia','987 Hospital Drive',3,42,'057-753-7887','doctor13.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(14,'daniel3@gmail.com',1,2,'Doctor','Charlotte','William','123 Doctor Street',1,46,'043-200-5493','doctor14.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(15,'david16@gmail.com',3,5,'Doctor','Abigail','Jane','987 Hospital Drive',3,40,'021-765-4143','doctor15.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(16,'david17@gmail.com',5,5,'Doctor','Emma','Matthew','987 Hospital Drive',2,33,'008-490-7850','doctor16.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(17,'emma10@gmail.com',2,2,'Doctor','John','Sophia','789 Healthcare Lane',3,34,'072-549-3215','doctor17.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(18,'isabella23@gmail.com',1,5,'Doctor','Christopher','Olivia','123 Doctor Street',2,34,'041-721-0675','doctor18.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(19,'james24@gmail.com',1,1,'Doctor','Emily','Emma','789 Healthcare Lane',3,47,'033-088-0104','doctor19.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(20,'jane22@gmail.com',5,4,'Doctor','Jane','Jane','321 Clinic Road',1,41,'038-309-2162','doctor20.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(21,'joseph13@gmail.com',4,1,'Doctor','Joseph','Charlotte','321 Clinic Road',3,37,'077-817-2670','doctor21.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(22,'joseph4@gmail.com',1,2,'Doctor','Ava','Joseph','789 Healthcare Lane',1,43,'064-630-8328','doctor22.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(23,'matthew14@gmail.com',2,5,'Doctor','Christopher','Jane','123 Doctor Street',3,44,'087-717-0275','doctor23.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(24,'matthew21@gmail.com',5,3,'Doctor','Christopher','Jane','789 Healthcare Lane',2,42,'074-435-8499','doctor24.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(25,'mia11@gmail.com',3,2,'Doctor','David','Matthew','123 Doctor Street',2,41,'079-363-1776','doctor25.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(26,'mia18@gmail.com',5,5,'Doctor','Mia','Emma','789 Healthcare Lane',2,32,'032-760-6079','doctor26.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(27,'mia8@gmail.com',3,3,'Doctor','Isabella','Emily','321 Clinic Road',1,43,'016-054-1514','doctor27.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(28,'sophia15@gmail.com',4,4,'Doctor','Isabella','Michael','789 Healthcare Lane',3,34,'047-247-4636','doctor28.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(29,'sophia19@gmail.com',3,3,'Doctor','Emma','Mia','456 Medical Avenue',2,32,'052-148-9504','doctor29.jpg','2023-07-08 19:57:59','2023-07-08 19:57:59'),(30,'doctor@test.com',3,3,'Doctor','Bác','Sĩ 1','321 Street',2,56,'0123456789',NULL,'2023-07-16 00:34:32','2023-07-18 11:03:46');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `histories`
--

DROP TABLE IF EXISTS `histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PatientId` int(11) NOT NULL,
  `DoctorId` int(11) NOT NULL,
  `BookingId` int(11) NOT NULL,
  `History_description` text DEFAULT NULL,
  `History_files` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `histories_ibfk_patients` (`PatientId`),
  KEY `histories_ibfk_bookings` (`BookingId`),
  KEY `histories_ibfk_doctors` (`DoctorId`),
  CONSTRAINT `histories_ibfk_bookings` FOREIGN KEY (`BookingId`) REFERENCES `bookings` (`id`),
  CONSTRAINT `histories_ibfk_doctors` FOREIGN KEY (`DoctorId`) REFERENCES `doctors` (`id`),
  CONSTRAINT `histories_ibfk_patients` FOREIGN KEY (`PatientId`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `histories`
--

LOCK TABLES `histories` WRITE;
/*!40000 ALTER TABLE `histories` DISABLE KEYS */;
INSERT INTO `histories` VALUES (1,1,4,3,'Bận',NULL,'2023-07-17 21:10:33','2023-07-17 21:10:33'),(2,1,30,1,'ok',NULL,'2023-07-17 22:40:14','2023-07-17 22:40:14'),(3,1,4,4,'bác sĩ bận',NULL,'2023-07-17 22:57:57','2023-07-17 22:57:57'),(4,1,30,2,'Có việc bận\n',NULL,'2023-07-18 11:02:53','2023-07-18 11:02:53'),(5,1,30,5,'đã khám xong',NULL,'2023-07-18 11:03:23','2023-07-18 11:03:23');
/*!40000 ALTER TABLE `histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (0,'admin@test.com','$2a$10$O7FsdOrpf5XYBSMsI4PL2.h0LI3LQe7CutloJ2iYvbHft.Z1GS2za','Admin','2023-07-15 17:16:53','2023-07-15 17:16:53'),(1,'ava1@gmail.com','$2b$10$Dmk25x56YoXI7soFC5eqeOeV7I86qOp8OZklBvNOIWyrnnu1mcNfK','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(2,'christopher2@gmail.com','$2b$10$Zvu9rUkmvBD06Wg3tSLhx.erM5vmVeQZOeW5in.otMsSgC5nG8pby','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(3,'daniel3@gmail.com','$2b$10$R3zzAd8hRudwfWpgXw8yP.46iS8u1Wf9sUwg6KgeN1AQsvcZelzI.','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(4,'joseph4@gmail.com','$2b$10$4DsgiEY41TT5TRm3YduV/esWD8OH41h17e2wkcNcdLiL7YIDTTeQ2','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(5,'ava5@gmail.com','$2b$10$gy0Bd/xa/FPuiwcoX1QvyOFsEy/m6/eTpLNRwHqI6cu8sppHy89WS','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(6,'ava6@gmail.com','$2b$10$v37XWLMpBx7/4yXJde9.iu0zVpf/Roi1ahyyso14xOgVcXCmdp3Nu','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(7,'andrew7@gmail.com','$2b$10$jPFNFzGZDNb.AKsP.8eH2Ob1i1jdVLvRqLgEQoExe/IFWRkLOUs.6','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(8,'mia8@gmail.com','$2b$10$rSDhASCBoNpK.trC62EHnueycE155YOsEQWdHtqmO98E8k/umaA9K','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(9,'ava9@gmail.com','$2b$10$pfLxB2sDtF4UJsAqgEqt9uq/Gx.urIqfaeMzAdraQI5tg5akSoAeW','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(10,'emma10@gmail.com','$2b$10$KqNXMWpqN67FBXBF4twMdePrVvIeckOUMnaYYk8/pkIkxBpZ9eYX.','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(11,'mia11@gmail.com','$2b$10$mUiy9TDgPGf/jkmszhdKHupOTkwevTdlB7i2H9ci4c18BJ7T3aHJm','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(12,'andrew12@gmail.com','$2b$10$NCFzGN4zRcVf/0zJ4UDP0.D2R9F/LFwB8LufDEhqvoF0dfmn9vjz2','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(13,'joseph13@gmail.com','$2b$10$iPJC3VKJ2ctgKuKlG9CIce/H8LWOG.mPhXVNFCYil58ulxSDy/nVq','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(14,'matthew14@gmail.com','$2b$10$VpXLHEbs535YTvNw4FzVRO4AHnho8pdl1oT26sef1T8nTm8UKLs1S','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(15,'sophia15@gmail.com','$2b$10$cBeKehVLFsQaAWqgeWPFoObM54lvQV6OUzt/DrHSW0WH1szYagIja','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(16,'david16@gmail.com','$2b$10$/Fe9rJPSAy.RjXiXSue3keAa0JUNWCphCUNdozmzXIZj6ifgF149q','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(17,'david17@gmail.com','$2b$10$52h6NvA2iPu/bKg.frkfI.b5WAimLknOtOLa82OOZkoJpfgMBSOIq','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(18,'mia18@gmail.com','$2b$10$ZINSwrB21Scx/mZQ8io88OuF6Ttool4TTYeknwi.efT/VllFLwp1a','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(19,'sophia19@gmail.com','$2b$10$aR3qJKsNVsrVxg1.hgQIYeJRo5amxq8gskBDtTuiBF5/W3bv8oQgK','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(20,'charlotte20@gmail.com','$2b$10$hIZcRF/RnAOZiozcST7speSyeZgNlDtQZ9iTcbGlcX9U2C22Fyz0i','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(21,'matthew21@gmail.com','$2b$10$BmeR7iKBuCudFdA7kme6JumO4bkIisQ5ufGSlOSYrcqTc4kZG4w2m','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(22,'jane22@gmail.com','$2b$10$TPqIjqN5WBwLT6VJLWzcf.xBuxsI.vmKnwlKAjcgeMPtacV.yLZOm','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(23,'isabella23@gmail.com','$2b$10$mu85YN3EZgRrTqg7W3oEeOM./uS0RiTa0dgqjnYtkT/tYnj2/rkeu','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(24,'james24@gmail.com','$2b$10$gCizfql8m2agEO6HIdzWZOWfpJe5UNJhFUEirJt3rLPRMCgCSdPpG','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(25,'ava25@gmail.com','$2b$10$77vQt8s2kzeAK/cbIcL9aeK2FbyUYVIFD9hsyXKLBdk1AkfbIDkya','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(26,'charlotte26@gmail.com','$2b$10$g9edJ7D/RcTmqLslUTn7Y.uvFMYzeNZc3mrGEUSu/i/UpuAW7EOEO','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(27,'daniel27@gmail.com','$2b$10$hQnM0FD5NlhEWgvunO5lFejwokuzipddsaK5tMyFVXVPGRklcDue6','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(28,'ava28@gmail.com','$2b$10$CrqvldcHZL6EUyqk8L5hTeZpc8zYzmhabM2j1tdqhszeH31MMxK5W','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(29,'christopher30@gmail.com','$2b$10$8irWFLRbnUsGMqaWj6JZk.urLLyXgKOdCJFDHn.STr/CQtGOWPCuC','Doctor','2023-07-08 19:57:59','2023-07-08 19:57:59'),(30,'doctor@test.com','$2a$10$Uw.UWOe7JgJdjxdS1OAY3Op30rFJihwe20NjIg.Uxd8l4Eti2QqEu','Doctor','2023-07-16 00:34:32','2023-07-18 11:03:56'),(31,'patient@test.com','$2a$10$uP9rbqgL0g/1loJmaf6Yu.xEcw9WnVx5YxONWennx5A0xC6L6mwiO','Patient','2023-07-17 00:50:41','2023-07-17 00:50:41');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `Patient_firstName` varchar(255) DEFAULT NULL,
  `Patient_lastName` varchar(255) DEFAULT NULL,
  `Patient_address` varchar(255) DEFAULT NULL,
  `Patient_gender` int(11) NOT NULL,
  `Patient_age` int(11) DEFAULT NULL,
  `Patient_phoneNumber` varchar(255) DEFAULT NULL,
  `Patient_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `patients_ibfk_allcodes` (`Patient_gender`),
  CONSTRAINT `patients_ibfk_allcodes` FOREIGN KEY (`Patient_gender`) REFERENCES `allcodes` (`id`),
  CONSTRAINT `patients_ibfk_logins` FOREIGN KEY (`email`) REFERENCES `logins` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Patient','patient@test.com','Bệnh','Nhân','123 Street',1,45,'0987654132',NULL,'2023-07-17 00:50:41','2023-07-17 01:00:10');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('1_migration-create-allcode.js'),('1_migration-create-booking.js'),('2_migration-create-clinic.js'),('2_migration-create-history.js'),('3_migration-create-specialization.js'),('4_migration-create-login.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializations`
--

DROP TABLE IF EXISTS `specializations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specializations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Specialization_description` text DEFAULT NULL,
  `Specialization_image` varchar(255) DEFAULT NULL,
  `Specialization_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializations`
--

LOCK TABLES `specializations` WRITE;
/*!40000 ALTER TABLE `specializations` DISABLE KEYS */;
INSERT INTO `specializations` VALUES (1,'Chuyên khoa Tim mạch chuyên về chuẩn đoán và điều trị các bệnh lý về tim mạch.','image1.jpg','Tim mạch','2023-07-08 19:57:46','2023-07-08 19:57:46'),(2,'Chuyên khoa Nội khoa chăm sóc và điều trị các bệnh nội khoa như bệnh tiểu đường, huyết áp cao, bệnh lý tiêu hóa và các bệnh nội tiết.','image2.jpg','Nội khoa','2023-07-08 19:57:46','2023-07-08 19:57:46'),(3,'Chuyên khoa Da liễu chăm sóc và điều trị các vấn đề liên quan đến da, tóc và móng.','image3.jpg','Da liễu','2023-07-08 19:57:46','2023-07-08 19:57:46'),(4,'Chuyên khoa Răng hàm mặt chăm sóc và điều trị các vấn đề về răng, miệng và quầng hàm.','image4.jpg','Răng hàm mặt','2023-07-08 19:57:46','2023-07-08 19:57:46'),(5,'Chuyên khoa Sản phụ khoa chăm sóc và điều trị các vấn đề liên quan đến sức khỏe phụ nữ, thai sản và phụ khoa.','image5.jpg','Sản phụ khoa','2023-07-08 19:57:46','2023-07-08 19:57:46');
/*!40000 ALTER TABLE `specializations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 11:25:05
