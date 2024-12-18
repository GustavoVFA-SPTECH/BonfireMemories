-- DROP DATABASE BonfireMemories;
DROP DATABASE IF EXISTS BonfireMemories;
CREATE DATABASE BonfireMemories;
USE BonfireMemories;

CREATE TABLE User(
	idUser INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(45) UNIQUE NOT NULL,
  email VARCHAR(60) UNIQUE NOT NULL,
  profilePicture LONGTEXT,
  password TEXT NOT NULL
);

CREATE TABLE AcessLog(
	idAcess INT AUTO_INCREMENT,
	dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUser INT,
    CONSTRAINT fkUserAcess FOREIGN KEY (fkUser)
		REFERENCES User(idUser),
	CONSTRAINT PRIMARY KEY (idAcess, fkUser)
);

CREATE TABLE Follower(
	idUser1 INT,
    idUser2 INT,
    CONSTRAINT fkUser1 FOREIGN KEY (idUser1)
		REFERENCES User(idUser),
	CONSTRAINT fkUser2 FOREIGN KEY (idUser2)
		REFERENCES User(idUser),
    CONSTRAINT PRIMARY KEY (idUser1, idUser2)
);

CREATE TABLE Stats(
	idStats INT PRIMARY KEY AUTO_INCREMENT,
    level INT,
    vigor INT,
    attunement INT,
    endurence INT,
    vitality INT,
    strength INT,
    dexterity INT,
    inteligence INT,
    faith INT,
    luck INT,
    soulCost INT
);

CREATE TABLE Build(
	idBuild INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
    class VARCHAR(45),
    buildOwner INT,
    fkStats INT,
    CONSTRAINT buildOwner FOREIGN KEY (buildOwner)
		REFERENCES User(idUser),
	CONSTRAINT fkStats FOREIGN KEY (fkStats)
		REFERENCES Stats(idStats)
);

CREATE TABLE Equipament(
	idEquipament INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(60),
    type VARCHAR(45),
    fkBuild INT,
    CONSTRAINT fkBuild FOREIGN KEY (fkBuild)
		REFERENCES Build(idBuild)
);

CREATE TABLE Post(
	idPost INT AUTO_INCREMENT,
    title VARCHAR(45),
    caption VARCHAR(255),
    postImage LONGTEXT,
    type varchar(10),
    dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    postOwner INT,
    fkBuild INT,
    CONSTRAINT fkBuildPost FOREIGN KEY (fkBuild)
		REFERENCES Build(idBuild),
	CONSTRAINT fkOwner FOREIGN KEY (postOwner)
		REFERENCES User(idUser),
	CONSTRAINT PRIMARY KEY (idPost, postOwner)
);

CREATE TABLE Comment(
	idComment INT AUTO_INCREMENT,
    fkPost INT,
    postOwner INT,
    commentOwner INT,
    text VARCHAR(125),
    CONSTRAINT fkPost FOREIGN KEY (fkPost)
		REFERENCES Post(idPost),
	CONSTRAINT fkPostOwner FOREIGN KEY (postOwner)
		REFERENCES Post(postOwner),
	CONSTRAINT fkCommentOwner FOREIGN KEY (commentOwner)
		REFERENCES User(idUser),
	CONSTRAINT PRIMARY KEY (idComment, fkPost, postOwner)
);

CREATE TABLE Likes(
	idLike INT AUTO_INCREMENT,
    fkPost INT,
    postOwner INT,
    likeOwner INT,
	CONSTRAINT fkPostLike FOREIGN KEY (fkPost)
		REFERENCES Post(idPost),
	CONSTRAINT fkPostOwnerLike FOREIGN KEY (postOwner)
		REFERENCES Post(postOwner),
	CONSTRAINT fkLikeOwner FOREIGN KEY (likeOwner)
		REFERENCES User(idUser),
	CONSTRAINT PRIMARY KEY (idLike, fkPost, postOwner)
);