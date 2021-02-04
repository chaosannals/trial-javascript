CREATE TABLE `t1` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `field_one` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '''文;''''本;;"字";"段',
  `time_one` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时''''''间"""字";"段''''',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `t2` (
  `id` int unsigned NOT NULL,
  `tag` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_one` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT "文本;'""字段",
  `time_one` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间''字段',
  PRIMARY KEY (`id`,`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `t3` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `field_one` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT ';""文本"字段',
  `time_one` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时''''''间"""字""段''''',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
