
set default_storage_engine = innodb;

SET FOREIGN_KEY_CHECKS = 0;

drop table if exists resultat;
drop table if exists coureur;
drop table if exists course;

create table coureur
(
    id     int auto_increment primary key,
    nom    varchar(50) not null,
    prenom varchar(50) not null,
    annee  char(4)     null,
    sexe   char(1)     not null,
    unique key nom (nom, prenom, annee)
);

create table course
(
    id            int auto_increment primary key,
    date          date                                       not null,
    saison        enum ('Printemps','Été','Automne','Hiver') not null,
    distance      enum ('5 Km', '10 Km')                     not null,
    nbParticipant int                                        not null default '0'
);

-- table de liaison entre coureur et course
-- particularité : un coureur peut avoir 2 temps sur le 10 Km car cette course donne lieu à 2 départs différents
-- cela justifie la présence  de la colonne temps dans la clé primaire

create table resultat
(
    idCourse       int,
    place          int        not null,
    idCoureur      int        not null,
    categorie      varchar(3) not null,
    placeCategorie int        not null,
    temps          time       not null,
    club           varchar(75) default null,
    PRIMARY KEY (idCourse, idCoureur, temps),
    FOREIGN KEY (idCoureur) REFERENCES coureur (id),
    FOREIGN KEY (idCourse) REFERENCES course (id)
);

SET FOREIGN_KEY_CHECKS = 1;