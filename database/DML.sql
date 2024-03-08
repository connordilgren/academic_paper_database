# All variables with a ":" prefix are variables that will come from a backend 
# programming language

# Authors Table ---------------------------------------------------------------
# Read
SELECT *
   FROM Authors;

# Insert
INSERT INTO Authors (firstName, middleName, lastName, email, websiteURL, isRetired, hIndex) 
   VALUES (:firstNameInput, :middleNameInput, :lastNameInput, :emailInput, :websiteURLInput, :isRetiredInput, :hIndexInput);

# Delete
DELETE FROM Authors 
   WHERE authorID = :authorID_selected_from_Authors_page;

# Update
# save
UPDATE Authors 
   SET firstName = :firstName_input, 
   middleName = :middleName_input,
   lastName = :lastName_input,
   email = :email_input,
   websiteURL = :websiteURL_input,
   isRetired = :isRetired_input,
   hIndex = :hIndex,
   WHERE authorID = :authorID_selected_from_Authors_page

# Conferences Table -----------------------------------------------------------
# Read
SELECT *
   FROM Conferences;

# Insert
INSERT INTO Conferences (name, year, city, country, isOnline) 
   VALUES (:nameInput, :yearInput, :cityInput, :countryInput, :isOnlineInput);

# Organizations Table ---------------------------------------------------------
# Read
SELECT *
   FROM Organizations;

# Insert
INSERT INTO Organizations (name, country, isUniversity) 
   VALUES (:nameInput, :countryInput, :isUniversityInput);

# AuthorOrganizations Table ---------------------------------------------------
# Read
SELECT authorOrganizationID, 
       Organizations.name AS organizationName, 
       Authors.lastName AS authorLastName, 
       authorstartDate, 
       authorEndDate
   FROM AuthorOrganizations
      INNER JOIN Organizations
      ON AuthorOrganizations.organizationID = Organizations.organizationID
      INNER JOIN Authors
      ON AuthorOrganizations.authorID = Authors.authorID
   ORDER BY authorOrganizationID ASC;

# Insert
# drop down 1: get organization ids, names
SELECT organizationID, name FROM Organizations;
# drop down 2: get author ids, names
SELECT authorID, lastName FROM Authors;
# insert
INSERT INTO AuthorOrganizations (organizationID, authorID, authorstartDate, authorEndDate) 
   VALUES (:organizationID_from_dropdown_Input, :authorID_from_dropdown_Input, :authorstartDateInput, :authorEndDateInput);

# Papers Table ----------------------------------------------------------------
# Read
SELECT paperID, 
       title, 
       yearPublished, 
       numCitations, 
       Conferences.name AS conference 
   FROM Papers
      LEFT JOIN Conferences
      ON Papers.conferenceID = Conferences.conferenceID
   ORDER BY paperID ASC;

# Insert
# drop down 1: get conference ids, names
SELECT conferenceID, name FROM Conferences;
# insert
INSERT INTO Papers (title, yearPublished, numCitations, conferenceID) 
   VALUES (:title, :yearPublished, :numCitations, :conferenceID_from_dropdown_Input);

# Delete
DELETE FROM Papers 
   WHERE paperID = :paperID_selected_from_Papers_page;

# Update
# drop down: get conference ids, names
SELECT conferenceID, name FROM Conferences;
# save
UPDATE Papers 
   SET title = :title_from_Input, 
   yearPublished = :year_from_Input, 
   numCitations = :numCitations_from_Input,
   conferenceID = :conferenceID_from_dropdown_Input
   WHERE paperID = :paperID_selected_from_Papers_page

# PaperAuthors Table ----------------------------------------------------------
# Read
SELECT Papers.title AS paperTitle, 
       Authors.lastName AS authorLastName
   FROM PaperAuthors
      INNER JOIN Papers
      ON PaperAuthors.paperID = Papers.paperID
      INNER JOIN Authors
      ON PaperAuthors.authorID = Authors.authorID;

# Insert
# drop down 1: get paper ids, titles
SELECT paperID, title FROM Papers;
# drop down 2: get paper ids, titles
SELECT authorID, lastName FROM Authors;
# insert
INSERT INTO PaperAuthors (paperID, authorID) 
   VALUES (:paperID_from_dropdown_Input, :authorID_from_dropdown_Input);

# Delete
DELETE FROM PaperAuthors 
   WHERE paperID = :paperID_selected_from_PaperAuthors_page
   AND authorID = :authorID_selected_from_PaperAuthors_page;

# Update
# get row of data to be populated inside of editable fields for updating
SELECT paperID, authorID
   FROM PaperAuthors 
   WHERE paperID = :paperID_selected_from_PaperAuthors_page
   AND authorID = :authorID_selected_from_PaperAuthors_page;
# drop down 1: paper ID
SELECT paperID, title FROM Papers;
# drop down 2: authorID
SELECT authorID, lastName FROM Authors;
# save
UPDATE PaperAuthors 
   SET paperID = :paperID_from_dropdown_Input, authorID= :authorIDInput_from_dropdown_Input, 
   WHERE paperID = :paperID_selected_from_PaperAuthors_page
   AND authorID = :authorID_selected_from_PaperAuthors_page;
