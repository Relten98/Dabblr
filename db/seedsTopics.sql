SET FOREIGN_KEY_CHECKS=0;

-- Home tab, only here for redirection
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (1, 'Home', '2020-03-19 16:43:49', '2020-12-01 15:53:22', 0);

-- DB STARTS BELOW
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (2, 'Engineering', '2000-03-19 16:43:49', '2020-12-01 15:53:22', 1);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (3, 'Film', '1998-03-19 16:43:49', '2020-12-01 15:53:22', 1);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (4, 'Game Design', '1892-03-19 16:43:49', '2020-12-01 15:53:22', 1);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (5, 'Art', '1500-03-19 16:43:49', '2020-12-01 15:53:22', 1);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (6, 'Photography', '1875-03-19 16:43:49', '2020-12-01 15:53:22', 3);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (7, 'Drawing', '1880-03-19 16:43:49', '2020-12-01 15:53:22', 5);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (8, 'Painting', '1892-03-19 16:43:49', '2020-12-01 15:53:22', 5);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (9, 'Scupting', '1820-03-19 16:43:49', '2020-12-01 15:53:22', 5);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (10, '3D Modeling', '1845-03-19 16:43:49', '2020-12-01 15:53:22', 4);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (11, 'Modeling', '1863-03-19 16:43:49', '2020-12-01 15:53:22', 3);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (12, 'Video Editing', '1901-03-19 16:43:49', '2020-12-01 15:53:22', 3);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (13, 'Level Editing', '1956-03-19 16:43:49', '2020-12-01 15:53:22', 4);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (14, 'Character Design', '1930-03-19 16:43:49', '2020-12-01 15:53:22', 4);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (15, 'Sketching', '1938-03-19 16:43:49', '2020-12-01 15:53:22', 5);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (16, 'Charcoal', '1924-03-19 16:43:49', '2020-12-01 15:53:22', 15);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (17, 'Pencil', '1776-03-19 16:43:49', '2020-12-01 15:53:22', 15);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (18, 'Crayon', '2035-03-19 16:43:49', '2040-12-01 15:53:22', 15);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (19, 'Electronics', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 2);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (20, 'Computers', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 19);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (21, 'Computer Hardware', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 19);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (22, 'Telecommunication', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 20);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (23, 'Programming', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 20);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (24, 'C++', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 20);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (25, 'JavaScript', '2004-02-29 16:43:49', '2040-12-01 15:53:22', 20);
insert into topics (id, topicName, createdAt, updatedAt, parentTopicID) values (26, 'Set Dressing', '1906-03-19 16:43:49', '2020-12-01 15:53:22', 13);
SET FOREIGN_KEY_CHECKS=1;