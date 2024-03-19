--
-- Create Authors Table
--
CREATE OR REPLACE TABLE Authors (
  authorID int AUTO_INCREMENT,
  firstName varchar(255),
  middleName varchar(255),
  lastName varchar(255) NOT NULL,
  email varchar(320),
  websiteURL varchar(2048),
  isRetired tinyint(1),
  hIndex int,
  PRIMARY KEY (authorID)
);

--
-- Insert sample data into Authors
--
INSERT INTO Authors 
/* (authorID, firstName, middleName, lastName, email, websiteURL, isRetired, hIndex) */
VALUES
(1,'George', NULL, 'Simecek', 'gsimecek@gmail.com', NULL, NULL, NULL),
(2,'Aaron', NULL,'Defazio', 'aaron.defazio@gmail.com','https://www.aarondefazio.com/',0,17),
(3,'Konstantin','Casadeen','Mishchenko','konsta.mish@gmail.com','https://www.konstmish.com/',0,20),
(4,'Joar', NULL, 'Skalse', 'joar.skalse@cs.ox.ac.uk','https://www.fhi.ox.ac.uk/team/joar-skalse/',0,8),
(5,'John', NULL, 'Kirchenbauer', NULL, NULL, 0, NULL),
(6,'Rylan', NULL,'Schaeffer', NULL, NULL, 0, NULL);

--
-- Create Conferences Table
--
CREATE OR REPLACE TABLE Conferences (
  conferenceID int AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  year varchar(4) NOT NULL,
  city varchar(255),
  country varchar(255),
  isOnline tinyint(1),
  PRIMARY KEY (conferenceID)
);

--
-- Insert sample data into Conferences
--
INSERT INTO Conferences 
/* (conferenceID, name, year, city, country, isOnline) */
VALUES 
(1,'International Conference on Machine Learning',2023,'Honolulu','USA',0),
(2,'NeurIPS',2023,'New Orleans','USA',0),
(3,'Association for the Advancement of Artificial Intelligence',2023,'Washington, DC','USA',0);

--
-- Create Organizations Table
--
CREATE OR REPLACE TABLE Organizations (
  organizationID int AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  country varchar(255) NOT NULL,
  isUniversity tinyint(1) NOT NULL,
  PRIMARY KEY (organizationID)
);

--
-- Insert sample data into Organizations
--
INSERT INTO Organizations 
/* (organizationID, name, country, isUniversity) */
VALUES 
(1,'Meta','USA',0),
(2,'Australian National University','Australia',1),
(3,'Synthesia','England',0);

--
-- Create AuthorOrganizations Table
--
CREATE OR REPLACE TABLE AuthorOrganizations (
  authorOrganizationID int AUTO_INCREMENT,
  organizationID int,
  authorID int,
  authorstartDate date NOT NULL,
  authorEndDate date NOT NULL,
  PRIMARY KEY (authorOrganizationID),
  FOREIGN KEY(organizationID) REFERENCES Organizations(organizationID),
  FOREIGN KEY(authorID) REFERENCES Authors(authorID) ON DELETE SET NULL
);

--
-- Insert sample data into AuthorOrganizations
--
INSERT INTO AuthorOrganizations 
VALUES 
(1,1,2,'2010-01-01','2012-06-01'),
(2,2,2,'2015-05-01','2023-01-27'),
(3,2,3,'2017-03-18','2023-01-27');

--
-- Create Papers Table
--
CREATE OR REPLACE TABLE Papers (
  paperID int AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  yearPublished varchar(4) NOT NULL,
  numCitations int,
  conferenceID int,
  PRIMARY KEY (paperID),
  FOREIGN KEY(conferenceID) REFERENCES Conferences(conferenceID)
);

--
-- Insert sample data into Papers
--
INSERT INTO Papers
/* (paperID, title, yearPublished, numCitations, conferenceID) */
VALUES
(1, "Learning-Rate-Free Learning by D-Adaptation", "2023", 25, 1),
(2, "A Watermark for Large Language Models", "2023", 206, 1),
(3, "Are Emergent Abilities of Large Language Models a Mirage?", "2023", 81, 2),
(4, "SAGA: A Fast Incremental Gradient Method With Support for Non-Strongly Convex Composite Objectives", "2014", 2022, NULL),
(5, "Misspecification in Inverse Reinforcement Learning", "2023", 11, 3);

--
-- Create PaperAuthors Table
--
CREATE OR REPLACE TABLE PaperAuthors (
  paperAuthorID int AUTO_INCREMENT,
  paperID int,
  authorID int,
  PRIMARY KEY(paperAuthorID), 
  FOREIGN KEY(paperID) REFERENCES Papers(paperID) ON DELETE CASCADE,
  FOREIGN KEY(authorID) REFERENCES Authors(authorID) ON DELETE SET NULL
);

--
-- Insert sample data into PaperAuthors
--
INSERT INTO PaperAuthors
(paperID, authorID)
VALUES
(1, 2),
(4, 2),
(1, 3),
(5, 4),
(2, 5),
(3, 6);
