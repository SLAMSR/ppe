set foreign_key_checks = 0;

set default_storage_engine = InnoDb;

-- Désactivation du contrôle des clés étrangères
SET FOREIGN_KEY_CHECKS = 0;

drop table if exists membre;
drop table if exists fonction;
drop table if exists droit;
drop table if exists administrateur;


create table administrateur
(
    id int primary key,
    constraint fk_administrateur_membre foreign key (id) references membre (id) on delete cascade on update cascade
);

create table membre
(
    id              int auto_increment primary key,
    login           varchar(50)  not null unique,
    password        varchar(64)  not null,
    nom             varchar(30)  not null,
    prenom          varchar(50)  not null,
    email           varchar(100) not null,
    telephone       varchar(10)  null,
    photo           varchar(100) null,
    autMail         tinyint(1)   not null default '0',
    unique (nom, prenom, email)
);

create table fonction
(
    repertoire varchar(50)  not null,
    nom        varchar(150) not null,
    primary key (repertoire)
);

create table droit
(
    idAdministrateur int(11)     not null,
    repertoire       varchar(50) not null,
    primary key (idAdministrateur, repertoire),
    constraint fk_droit_administrateur foreign key (idAdministrateur) references administrateur (id) on delete cascade,
    constraint fk_droit_fonction foreign key (repertoire) references fonction (repertoire) on delete cascade on update cascade
);

-- activation du contrôle des clés étrangères
SET FOREIGN_KEY_CHECKS = 1;