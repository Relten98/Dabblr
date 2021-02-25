-- Drops the dablr_db if it exists currently --
DROP DATABASE IF EXISTS dablr_db;
-- Creates the "dablr_db" database --
CREATE DATABASE dablr_db;

-- mod the "dablr_db" database --
USE dablr_db;

SELECT * FROM topics;
SELECT * FROM tutorials;
SELECT * FROM users;
SELECT * FROM votes;