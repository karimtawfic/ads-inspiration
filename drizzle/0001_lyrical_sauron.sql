CREATE TABLE `votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`adId` varchar(128) NOT NULL,
	`openId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`)
);
