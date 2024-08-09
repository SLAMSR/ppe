

SET default_storage_engine = InnoDb;

drop table if exists epreuve;

create table epreuve (
  id int(11) not null primary key ,
  saison enum ('Hiver','Printemps','Été','Automne') not null unique,
  description text not null,
  date date not null unique,
  urlInscription varchar(150)  not null unique,
  urlInscrit varchar(150)  not null unique,
  dateOuverture date not null unique,
  dateFermeture date not null unique
);

