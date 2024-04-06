SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `parties`;

CREATE TABLE `parties`
(
    `id`                INT(11) NOT NULL AUTO_INCREMENT,
    `environnement_id`  VARCHAR(128) NOT NULL,
    `user_email`        VARCHAR(128) NOT NULL,
    `status`            VARCHAR(25),
    `temps`             TIME,
    `niveau`            INT,
    `score`             FLOAT,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
