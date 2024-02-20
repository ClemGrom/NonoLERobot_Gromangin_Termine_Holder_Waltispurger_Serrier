-- Adminer 4.8.1 MySQL 5.5.5-10.3.11-MariaDB-1:10.3.11+maria~bionic dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    `email`                              varchar(128) NOT NULL,
    `password`                           varchar(256) NOT NULL,
    `active`                             tinyint(4)   NOT NULL DEFAULT 0,
    `activation_token`                   varchar(64)           DEFAULT NULL,
    `activation_token_expiration_date`   timestamp    NULL     DEFAULT NULL,
    `refresh_token`                      varchar(64)          DEFAULT NULL,
    `refresh_token_expiration_date`      timestamp    NULL     DEFAULT NULL,
    `username`                           varchar(64)           DEFAULT NULL,
    PRIMARY KEY (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Adminer 4.8.1 MySQL 5.5.5-10.3.11-MariaDB-1:10.3.11+maria~bionic dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

INSERT INTO `users` (`email`, `password`, `active`, `activation_token`, `activation_token_expiration_date`,
                     `refresh_token`, `refresh_token_expiration_date`, `username`)
VALUES ('AlixPerrot@free.fr', '$2y$10$3irjl.hOiQp5QAyTOAINpe7FfabDvIDmuVCOZ49dHM7rdDY1jQiCC', 0, NULL, NULL,
        'ac590b521c41d3d4dd0c901b040d1b6317817b693a7b830b5f1d1e010e411a9a', '2023-09-29 09:12:52',
        'AlixPerrot')