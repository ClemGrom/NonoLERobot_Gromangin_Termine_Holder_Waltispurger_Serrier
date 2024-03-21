SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `parties`;

CREATE TABLE `parties`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `environnement_id`   varchar(128) NOT NULL,
    `user_email` varchar(128) NOT NULL,
    `status`     varchar(25),
    `token`      varchar(128),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;