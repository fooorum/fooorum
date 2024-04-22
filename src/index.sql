CREATE TABLE Forum
(
    ID     INT PRIMARY KEY,
    Name        VARCHAR(255) NOT NULL,
    Admin       INT,
    Kategorie  INT,
    FOREIGN KEY(Admin) REFERENCES Nutzer(ID),
    FOREIGN KEY (Kategorie) REFERENCES Kategorie(ID)
);

CREATE TABLE Kategorie
(
ID     INT PRIMARY KEY,
    Name    VARCHAR(255) NOT NULL
);

CREATE TABLE Mitglied
(
    BeitritsDatum DATE NOT NULL,
    Nutzer      INT,
    Forum       INT,
    PRIMARY KEY (Nutzer, Forum),
    FOREIGN KEY (Nutzer) REFERENCES Nutzer(ID),
    FOREIGN KEY (Forum) REFERENCES Forum(ForumID)
);

CREATE TABLE Nutzer
(
    ID    INT PRIMARY KEY,
    Name  VARCHAR(255) NOT NULL
);

CREATE TABLE Upvotes
(
    Beitrag INT,
    Nutzer  INT,
    PRIMARY KEY (Beitrag, Nutzer),
    FOREIGN KEY (Beitrag) REFERENCES Beitrag(ID),
    FOREIGN KEY (Nutzer) REFERENCES Nutzer(ID)
)


CREATE TABLE Beitrag
(
    ID         INT PRIMARY KEY,
    UpLike   INT,
    DownLike   INT,
    Ersteller INT,
    FOREIGN KEY (Ersteller) REFERENCES Nutzer(ID)
);

INSERT INTO Nutzer (ID, Name) VALUES
(1, 'Max Mustermann'),
(2, 'Maria Musterfrau'),
(3, 'John Doe');

-- Kategorie
INSERT INTO Kategorie (ID, Name) VALUES
(1, 'Technologie'),
(2, 'Sport'),
(3, 'Schule');

-- Forum
INSERT INTO Forum (ID, Name, Admin, Kategorie) VALUES
(101, 'Tech Enthusiasts', 1, 1),
(102, 'Sport Fanatics', 2, 2),
(103, 'School Nerds', 3, 3);

-- Mitglied
INSERT INTO Mitglied (BeitritsDatum, Nutzer, Forum) VALUES
('2024-01-15', 1, 101), -- Max Mustermann ist Mitglied von Tech Enthusiasts
('2024-02-20', 2, 102), -- Maria Musterfrau ist Mitglied von Art Lovers
('2024-03-10', 3, 103); -- John Doe ist Mitglied von Fitness Fanatics

-- Beitrag
INSERT INTO Beitrag (ID, UpLike, DownLike, Ersteller) VALUES
(201, 10, 2, 1), -- Ein Beitrag von Max Mustermann in Tech Enthusiasts
(202, 8, 1, 2),  -- Ein Beitrag von Maria Musterfrau in Art Lovers
(203, 5, 0, 3);  -- Ein Beitrag von John Doe in Fitness Fanatics

-- Upvotes
INSERT INTO Upvotes (Beitrag, Nutzer) VALUES
(201, 2), -- Maria Musterfrau upvoted Max Mustermanns Beitrag
(202, 1), -- Max Mustermann upvoted Maria Musterfraus Beitrag
(203, 1); -- Max Mustermann upvoted John Does Beitrag
