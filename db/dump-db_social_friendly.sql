/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: db_social_friendly
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB

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
-- Table structure for table `sf_tc_gender`
--

DROP TABLE IF EXISTS `sf_tc_gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tc_gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tc_gender`
--

LOCK TABLES `sf_tc_gender` WRITE;
/*!40000 ALTER TABLE `sf_tc_gender` DISABLE KEYS */;
INSERT INTO `sf_tc_gender` VALUES
(1,'Hombre',1),
(2,'Mujer',1),
(3,'Prefiero no decirlo',1);
/*!40000 ALTER TABLE `sf_tc_gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tc_interest_name`
--

DROP TABLE IF EXISTS `sf_tc_interest_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tc_interest_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_interest_type` int(11) DEFAULT NULL,
  `interest_name` varchar(10) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sf_tc_interest_type_name_sf_tc_interest_name_FK` (`interest_name`),
  CONSTRAINT `sf_tc_interest_type_sf_tc_type_interest_FK` FOREIGN KEY (`id`) REFERENCES `sf_tc_type_interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tc_interest_name`
--

LOCK TABLES `sf_tc_interest_name` WRITE;
/*!40000 ALTER TABLE `sf_tc_interest_name` DISABLE KEYS */;
/*!40000 ALTER TABLE `sf_tc_interest_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tc_type_interest`
--

DROP TABLE IF EXISTS `sf_tc_type_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tc_type_interest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tc_type_interest`
--

LOCK TABLES `sf_tc_type_interest` WRITE;
/*!40000 ALTER TABLE `sf_tc_type_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `sf_tc_type_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tr_conversation`
--

DROP TABLE IF EXISTS `sf_tr_conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tr_conversation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tr_conversation`
--

LOCK TABLES `sf_tr_conversation` WRITE;
/*!40000 ALTER TABLE `sf_tr_conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `sf_tr_conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tr_messages`
--

DROP TABLE IF EXISTS `sf_tr_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tr_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_conversation` int(11) DEFAULT NULL,
  `message_text` text DEFAULT NULL,
  `send_at` timestamp NULL DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sf_tr_messages_sf_tr_user_FK` (`id_user`),
  KEY `sf_tr_messages_sf_tr_conversation_FK` (`id_conversation`),
  CONSTRAINT `sf_tr_messages_sf_tr_conversation_FK` FOREIGN KEY (`id_conversation`) REFERENCES `sf_tr_conversation` (`id`),
  CONSTRAINT `sf_tr_messages_sf_tr_user_FK` FOREIGN KEY (`id_user`) REFERENCES `sf_tr_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tr_messages`
--

LOCK TABLES `sf_tr_messages` WRITE;
/*!40000 ALTER TABLE `sf_tr_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `sf_tr_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tr_profile`
--

DROP TABLE IF EXISTS `sf_tr_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tr_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_gender` int(11) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `sf_tr_profile_sf_tc_gender_FK` (`id_gender`),
  KEY `sf_tr_profile_sf_tr_user_FK` (`id_user`),
  CONSTRAINT `sf_tr_profile_sf_tc_gender_FK` FOREIGN KEY (`id_gender`) REFERENCES `sf_tc_gender` (`id`),
  CONSTRAINT `sf_tr_profile_sf_tr_user_FK` FOREIGN KEY (`id_user`) REFERENCES `sf_tr_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tr_profile`
--

LOCK TABLES `sf_tr_profile` WRITE;
/*!40000 ALTER TABLE `sf_tr_profile` DISABLE KEYS */;
INSERT INTO `sf_tr_profile` VALUES
(1,3,1,'Hola, soy un chico',NULL,1),
(2,4,NULL,'Hola, soy divertida y me gusta la naturaleza',NULL,1),
(3,5,1,'Mi pasión es el arte',NULL,1),
(4,6,1,'Soy muy bueno con los juegos de azar',NULL,1),
(5,7,2,'Me gustan las películas románticas',NULL,1),
(6,8,1,'Soy inteligente y amigable',NULL,1),
(7,9,2,'Me gustan los videojuegos',NULL,1),
(8,10,1,'Estoy buscando amigos',NULL,1),
(9,11,2,'Me gusta hacer planes con mis amigos',NULL,1),
(10,12,1,'Soy curioso',NULL,1),
(11,13,1,'Me gustan las artes marciales',NULL,1);
/*!40000 ALTER TABLE `sf_tr_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tr_user`
--

DROP TABLE IF EXISTS `sf_tr_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tr_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(60) NOT NULL,
  `username` varchar(250) NOT NULL,
  `date_of_birthday` date NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tr_user`
--

LOCK TABLES `sf_tr_user` WRITE;
/*!40000 ALTER TABLE `sf_tr_user` DISABLE KEYS */;
INSERT INTO `sf_tr_user` VALUES
(3,'Dónovan Alonso Hernández','donovitali167','2003-05-17','donovanhdz167@gmail.com','$2a$10$0s7yQWiuI9qTTq2ZFbVvluN1bPIEqbi.2Dt6xgbc./QZnRHsxtpi2',1),
(4,'Alice Johnson','alicej','1990-04-03','alice.johnson@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(5,'Bob Smith','bobsmith','1985-09-23','bob.smith@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(6,'Charlie Brown','charlieb','1992-11-30','charlie.brown@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(7,'Diana Prince','dianap','1988-06-18','diana.prince@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(8,'Edward Norton','edwardn','1991-12-14','edward.norton@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(9,'Fiona Gallagher','fionag','1993-03-08','fiona.gallagher@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(10,'George Martin','georgem','1980-07-25','george.martin@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(11,'Hannah Williams','hannahw','1987-10-03','hannah.williams@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(12,'Isaac Newton','isaacn','1975-01-04','isaac.newton@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1),
(13,'Jackie Chan','jackiec','1960-04-07','jackie.chan@example.com','$2a$10$2oF7/Lf7TZBbEwmytT/a.ORgXpEnuHaWbtzs1rxCfRFDR7DdUyi2u',1);
/*!40000 ALTER TABLE `sf_tr_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sf_tr_user_interest`
--

DROP TABLE IF EXISTS `sf_tr_user_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sf_tr_user_interest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `interest_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `sf_tr_user_interest_sf_tc_interest_FK` (`interest_id`),
  KEY `sf_tr_user_interest_sf_tr_user_FK` (`user_id`),
  CONSTRAINT `sf_tr_user_interest_sf_tc_interest_FK` FOREIGN KEY (`interest_id`) REFERENCES `sf_tc_interest_name` (`id`),
  CONSTRAINT `sf_tr_user_interest_sf_tr_user_FK` FOREIGN KEY (`user_id`) REFERENCES `sf_tr_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sf_tr_user_interest`
--

LOCK TABLES `sf_tr_user_interest` WRITE;
/*!40000 ALTER TABLE `sf_tr_user_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `sf_tr_user_interest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 12:58:45
