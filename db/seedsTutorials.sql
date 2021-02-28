SET FOREIGN_KEY_CHECKS=0;
insert into tutorials (id, tutorialType, tutorialLink, createdAt, updatedAt, fk_topicID, fk_userID) values (1, 'video', 'https://www.youtube.com/watch?v=SNgNBsCI4EA', '2020-10-19 14:12:42', '2020-10-22 14:00:11', 21, 12);
insert into tutorials (id, tutorialType, tutorialLink, createdAt, updatedAt, fk_topicID, fk_userID) values (2, 'article', 'https://storyenvelope.com/filmmaking-basics/', '2020-02-17 10:48:00', '2020-07-26 05:20:45', 9, 4);
insert into tutorials (id, tutorialType, tutorialLink, createdAt, updatedAt, fk_topicID, fk_userID) values (3, 'article', 'billeybobstuts.com', '2020-02-17 10:48:00', '2020-07-26 05:20:45', 9, 6);
insert into tutorials (id, tutorialType, tutorialLink, createdAt, updatedAt, fk_topicID, fk_userID) values (4, 'video', 'https://www.youtube.com/watch?v=gONePWocbqA', '2020-02-17 10:48:00', '2020-07-26 05:20:45', 13, 5);
insert into tutorials (id, tutorialType, tutorialLink, createdAt, updatedAt, fk_topicID, fk_userID) values (5, 'video', 'https://www.youtube.com/watch?v=i4pxw4tYeCU', '2020-02-17 10:48:00', '2020-07-26 05:20:45', 9, 10);
insert into tutorials (id, tutorialType, tutorialLink, createdAt, updatedAt, fk_topicID, fk_userID) values (6, 'article', 'https://en.wikipedia.org/wiki/Electronics', '2020-02-17 10:48:00', '2020-07-26 05:20:45', 9, 11);

SET FOREIGN_KEY_CHECKS=1;