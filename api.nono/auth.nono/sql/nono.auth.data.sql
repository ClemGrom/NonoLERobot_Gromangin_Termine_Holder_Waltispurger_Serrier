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
    `refresh_token`                      varchar(512)          DEFAULT NULL,
    `refresh_token_expiration_date`      timestamp    NULL     DEFAULT NULL,
    `reset_passwd_token`                 varchar(64)           DEFAULT NULL,
    `reset_passwd_token_expiration_date` timestamp    NULL     DEFAULT NULL,
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
                     `refresh_token`, `refresh_token_expiration_date`, `reset_passwd_token`,
                     `reset_passwd_token_expiration_date`, `username`)
VALUES ('AlixPerrot@free.fr', '$2y$10$3irjl.hOiQp5QAyTOAINpe7FfabDvIDmuVCOZ49dHM7rdDY1jQiCC', 0, NULL, NULL,
        'ac590b521c41d3d4dd0c901b040d1b6317817b693a7b830b5f1d1e010e411a9a', '2023-09-29 09:12:52', NULL, NULL,
        'AlixPerrot'),
       ('AlphonseFleury@sfr.fr', '$2y$10$0d2eTE0uQq9B8cJNy7jcIeoj1VqQa6aUzFsj0TDVC4BR.0VWn1wJK', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'AlphonseFleury'),
       ('ArnaudeLeblanc@hotmail.fr', '$2y$10$FQkz7Li8ajyZYnpz9x8wLODQg1FTP9FKW88MrvjCC.XPgbcrHMkji', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'ArnaudeLeblanc'),
       ('BertrandMallet@orange.fr', '$2y$10$94/.33E4qQBxuPXKIbg1rO59s/0zwyakQ15zqiPvAb/gxRK2HwKC.', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'BertrandMallet'),
       ('BrigitteRenard@sfr.fr', '$2y$10$hu7oRms9tQ0ynKCQUFFbeOT8EmaaqFFXIZtI9Mgz0rf9UAciBOzsO', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'BrigitteRenard'),
       ('CélinaDeschamps@club-internet.fr', '$2y$10$Pm.kgmLNL7/pbcPPMFGW8.Q4d/2CTlOt8uoeC3DDTR7mqyvpkkh7a', 0, NULL,
        NULL, NULL, NULL, NULL, NULL, 'CélinaDeschamps'),
       ('EmmanuelBlin@dbmail.com', '$2y$10$UL9Zusuwtun41JV8p60SQu93Ei6MLyKXOZ4d1IzJj/evyR9mLhZhq', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'EmmanuelBlin'),
       ('ÉtienneGuyon@gmail.com', '$2y$10$gX/mbuhi8mmPwe2RO0TkDuV86Q6xdBPeV75z5pv8z2LjVwXQA6yYm', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'ÉtienneGuyon'),
       ('EugèneClement@sfr.fr', '$2y$10$iqXsDM4DpGJXa8qm/YFJYOeCJp5jhRGbTF.2VTVA0ZD6xjTjRzMty', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'EugèneClement'),
       ('FranckRemy@noos.fr', '$2y$10$rhw52V7AoKLApTZCLt/n2eM77UMNYBMxVSbn4WNsyKKNf0gkSy5tC', 0, NULL, NULL, NULL, NULL,
        NULL, NULL, 'FranckRemy'),
       ('FrançoiseFischer@sfr.fr', '$2y$10$J6rH6.PLZ4jxwo/55L.t3OYKwEkHitWCa2fL5yPUFFcaZmVZ7Rh4G', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'FrançoiseFischer'),
       ('GeorgesGuichard@laposte.net', '$2y$10$YdN/EsRKPvWxv1tN./w5BeybSL2QpP97TVCkn0zVn6OvO6uDlICeu', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'GeorgesGuichard'),
       ('GérardMartins@sfr.fr', '$2y$10$/YC503irOBWvdzCQJIFda.Q9PPDAGkKkCFx7TPxf5XGP56aerwK8W', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'GérardMartins'),
       ('GrégoireDupont@tele2.fr', '$2y$10$K/cU6nd4WMo8xdp5WyqeFOgLTEP/SPNQhO5kTG.EeuOELy/loK3Dq', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'GrégoireDupont'),
       ('GuillaumePerret@live.com', '$2y$10$ZiCvJyuRaFmtV.tcYQQKseArUdw0mMVACenmPeEIxJa7hC3LXSGVa', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'GuillaumePerret'),
       ('GuyBoutin@sfr.fr', '$2y$10$AeX3wfqIgfAZL1k7bN5UYOq6/3S9RUdYatvYm3fHTgo.khj01HQQi', 0, NULL, NULL, NULL, NULL,
        NULL, NULL, 'GuyBoutin'),
       ('HélèneCoulon@orange.fr', '$2y$10$JfQMwtLnC4S/H.3oI2nFh.fp3avI4Bbm/y4Ow2rRWfdm0W6ETlSOK', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'HélèneCoulon'),
       ('HélèneGuillaume@hotmail.fr', '$2y$10$GDYWCEQXcOICGNyzusWOIebiIX4hdyEL833Oe.eyI8F0lR1cX9HIO', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'HélèneGuillaume'),
       ('LaurenceLambert@live.com', '$2y$10$MHtR3/1t9u03ciFBHUTHNuw/zwfsXGKTz.rXFHN2abjxS/.sDCvTi', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'LaurenceLambert'),
       ('LucasBailly@yahoo.fr', '$2y$10$8Mp8DsGsnzBpm3PhE8/jsOl//6e5apK3EqhZ1pqkqqIF5wSdJwTfO', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'LucasBailly'),
       ('LuceNicolas@club-internet.fr', '$2y$10$ANnWccVflqVS9Glhb8Wpp.nCaBOOM/2nFKxCZJxBEZSw73/kFcJYm', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'LuceNicolas'),
       ('LucyColas@yahoo.fr', '$2y$10$6hvaZycILFplRMYNbhPla.iqQY18RUtTYSf5qDzUlFbEhE4uQd.vW', 0, NULL, NULL, NULL, NULL,
        NULL, NULL, 'LucyColas'),
       ('MarcMarin@gmail.com', '$2y$10$FUD03owDBoqVFRv95rDNzOU8WiOzQEbpgg2OS/PkaV6v27t3Qdg66', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'MarcMarin'),
       ('MargaudGodard@free.fr', '$2y$10$6V5.xTOXoQkiBHNN1Rookui47UO2sxnKwRMlAkpXurAkNiR81P4oq', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'MargaudGodard'),
       ('MathildePayet@orange.fr', '$2y$10$588fkGsR50RwUKQx.YZ9be1z2RAGhT5BhVFcUd07OrYaQZSq/plK6', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'MathildePayet'),
       ('MauriceRobin@yahoo.fr', '$2y$10$/nLsu6nUVGXCrZdtA6K6puVXLzDss5007SkaaR70SDtqRaRRLF02S', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'MauriceRobin'),
       ('miche@gmal.com', '$2y$10$LNMJg5yT260Nw47lpoEzb.33hQgGaOLJ5deUTCnjtQAg8FTkSgwpK', 0, NULL, NULL, NULL, NULL,
        NULL, NULL, 'miche'),
       ('OcéaneBonnin@live.com', '$2y$10$Fzvr/K/2UMU7KmrduTqzB.3KYt2sX.FSbAYJ.uKdB1aBC8QE.B8Oi', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'OcéaneBonnin'),
       ('OlivieGillet@club-internet.fr', '$2y$10$t6uAykTNe.iuHD5rzi796uJz1sDKD3uQYJy5fy22VwGm5kTpB4c.u', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'OlivieGillet'),
       ('PaulRemy@noos.fr', '$2y$10$lQff7xsrqTv5rhChp6ETmuEUAY23np4R46.YxcHUF2RqCAleGoiQW', 0, NULL, NULL, NULL, NULL,
        NULL, NULL, 'PaulRemy'),
       ('RenéePeron@yahoo.fr', '$2y$10$d.Us4EfEIrmmMUfrtCTlUepXx.uEdfqc2HVCJAZyeBLn4m.2qoquK', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'RenéePeron'),
       ('RobertRey@dbmail.com', '$2y$10$lTi9jVGxzLDT58jvU4TnC.sZ0F5K6PnfeC/E8TPWnlXrIet33ECL6', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'RobertRey'),
       ('RogerCarlier@wanadoo.fr', '$2y$10$SwKUW.M2O2GDhgKxaf03veUpXzrwuEa9xuNNXqU0gozowwTv/OJQm', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'RogerCarlier'),
       ('RolandSchmitt@club-internet.fr', '$2y$10$SXHNQk0WTlNIMWFd9UIB0u2q5iid04g5SiLAdCwSbLQU6kNY6HQEq', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'RolandSchmitt'),
       ('StéphaneLouis@club-internet.fr', '$2y$10$q3yDkut22TPflM7N0qj6DOq2qAhNDOadYYkx9ym7p9J2pC4tc/08q', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'StéphaneLouis'),
       ('SusanneCouturier@tele2.fr', '$2y$10$45uxloI2VnX93DNp8YQ.UeIEALpWgfo0LXcoRadB4AwGcpZEv.t2G', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'SusanneCouturier'),
       ('ThéodoreLeger@sfr.fr', '$2y$10$8g3tYH53KJ0wT9NYj3yU6eRMGlxgmYXD389svub4HQmLiggCAC516', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'ThéodoreLeger'),
       ('ThéophileBouvier@live.com', '$2y$10$5VReUT5/AnzJs.JAM0QxO.elp3CDLjkPekAwQUenBFq2tSNr574Ii', 0, NULL, NULL,
        NULL, NULL, NULL, NULL, 'ThéophileBouvier'),
       ('ThomasBaudry@dbmail.com', '$2y$10$GX01nrwmeEJm7yiG4aEwz.JwK9FigcPXGUNVzgwAwy4.kQsCdhtEK', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'ThomasBaudry'),
       ('VincentLaine@tele2.fr', '$2y$10$Biu6slyeC82mvuha8WP6/OJNVHNQ13.JmAO8vpRfLKLqacrZoxG7a', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'VincentLaine'),
       ('ZacharieLefort@sfr.fr', '$2y$10$x9i0uJJ2fFOdQhEgkzA8..pNhTwROf6MgYGO9PRHVieFFiKypxRfG', 0, NULL, NULL, NULL,
        NULL, NULL, NULL, 'ZacharieLefort');
