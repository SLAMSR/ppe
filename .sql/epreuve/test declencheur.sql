-- passer en mode strict au niveau de la session
set sql_mode='traditional,only_full_group_by';
set sql_mode = 'ansi';

select @@sql_mode;

# test des valeurs null

insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (null, 'Hiver', 'description', '2025-02-02', 'url', 'url', '2025-01-01', '2025-02-01');
#[45000][1644] #L'épreuve se situant dans cette saison est déjà programmée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (null, 'description', '2025-02-02', 'url', 'url', '2025-01-01', '2025-02-01');
# [45000][1644] #La saison doit être renseigné

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', null, '2025-02-02', 'url', 'url', '2025-01-01', '2025-02-01');
# [45000][1644] #La description doit être renseignée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', null, 'url', 'url', '2025-01-01', '2025-02-01');
# [45000][1644] #La date de l'épreuve doit être renseignée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', '2025-02-02', null, 'url', '2025-01-01', '2025-02-01');
# [45000][1644] #L'URL d'inscription doit être renseignée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', '2025-02-02',  'url' , null, '2025-01-01', '2025-02-01');
# [45000][1644] #L'URL des inscrits doit être renseignée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', '2025-02-02',  'url' , 'url', null, '2025-02-01');
# [45000][1644] #La date d'ouverture des inscriptions doit être renseignée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', '2025-02-02',  'url' , 'url', '2025-01-01', null);
#[45000][1644] #La date de fermeture des inscriptions doit être renseignée


-- test des valeurs vides
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('', '', '', '', '', '', '', '');
[45000][1644] #La saison doit être correctement renseignée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', '', '', '', '', '');
# [45000][1644] #la date n'est pas valide


-- test des valeurs erronées
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'description', '2024-11-43', 'url', 'url', '', '');
# [45000][1644] #la date n'est pas valide

insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'description', '2024-05-23', 'url', 'url', '', '');
# [45000][1644] #La date de l'épreuve doit être supérieure à la date du jour1

insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'description', curdate() + interval 2 month, 'url', 'url', curdate() + interval 1 day, curdate()) ;
# [45000][1644] #La période d'inscription n'est pas cohérente

-- une saison erronée
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'saison', 'description', '2024-11-43', 'url', 'url', '2024-09-02', '2024-10-31');
# [45000][1644] #La saison doit être correctement renseignée

-- une date d'ouverture erronée
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'description', '2024-11-03', 'url', 'url', '2024-09-31', '2024-10-31');
# [45000][1644] #La date d'ouverture des inscriptions n`'est pas valide

-- une date de fermeture erronée
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'description', '2025-02-15', 'url', 'url', '2025-09-02', '2025-02-31');
# [[45000][1644] #La date de fermeture des inscriptions n`'est pas valide

-- une date d'ouverture déja passée
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'description', '2024-04-15', 'url', 'url', '2024-01-02', '2024-02-20');
#[45000][1644] #La date de l'épreuve doit être supérieure à la date du jour

-- une description avec injection
insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values (5, 'Hiver', 'test<script>alert(1);</script>test', curdate() + interval 2 month, 'url', 'url', curdate() + interval 1 day, curdate() + interval 1 month);
# [45000][1644] #La description contient des caractères ou des mots interdits. interdits

-- controle d'unicité
select * from epreuve;

delete from epreuve;
insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', curdate() + interval 2 month, 'url', 'url', curdate() + interval 1 day, curdate() + interval 1 month);

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Hiver', 'description', curdate() + interval 2 month, 'url', 'url', curdate() + interval 1 day, curdate() + interval 1 month);
# [45000][1644] #L'épreuve se situant dans cette saison est déjà programmée

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Ete', 'description', curdate() + interval 2 month, 'url', 'url', curdate() + interval 1 day, curdate() + interval 1 month);
# [45000][1644] #Une épreuve est déjà programmée à cette date

insert into epreuve (saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture)
values ('Ete', 'description', curdate() + interval 3 month, 'url', 'url', curdate() + interval 1 day, curdate() + interval 1 month);
# [45000][1644] #L'URL d'inscription est déjà utilisée

-- Test sur la modification

select * from epreuve;

update epreuve set id = 5 where id = 2;
# [45000][1644] #L'identifiant ne peut être modifié

update epreuve set id = null;
# [45000][1644] #L'identifiant ne peut être modifié

update epreuve set saison = null;
# [45000][1644] #La saison doit être renseigné

update epreuve set date = null;
# [45000][1644] #La date de l'épreuve doit être renseignée

update epreuve set dateOuverture = null;
# [45000][1644] #La date d'ouverture des inscriptions doit être renseignée

update epreuve set dateFermeture = null;
# [45000][1644] #La date d'ouverture des inscriptions doit être renseignée

update epreuve set urlInscription = null;
# [45000][1644] #L'URL d'inscription doit être renseignée

update epreuve set urlInscrit = null;
# [45000][1644] #L'URL des inscrits doit être renseignée

-- valeur erronée
update epreuve set saison = '';
# [45000][1644] #La saison doit être correctement renseignée

update epreuve set date = '2025-02-29';
# [45000][1644] #La date de l'épreuve n`'est pas valide

update epreuve set dateOuverture = '2025-02-29';
# [45000][1644] #La date d'ouverture des inscriptions n`'est pas valide

update epreuve set dateFermeture = '2025-02-29';
# [45000][1644] #La date de fermeture des inscriptions n`'est pas valide

update epreuve set dateOuverture = curdate() where id = 1;
# [45000][1644] #La période d'inscription n'est pas cohérente

update epreuve set saison = 'Automne';
# [45000][1644] #L'épreuve se situant dans cette saison est déjà programmée


