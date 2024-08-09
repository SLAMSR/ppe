

set @@sql_mode='ansi';


delete from droit;
delete from fonction;
delete from administrateur;
delete from membre;


-- insertion des membres
-- réinitialisation du compteur
alter table membre auto_increment = 1;

insert into membre (nom, prenom, email, photo)
values ('VERGHOTE', 'GUY', 'guy.verghote@saint-remi.net', '0.png'),
       ('BERNARD', 'JULIEN',  'julien.bernard@saint-remi.net', 'bernard julien.jpg'),
       ('CARON', 'ADAM', 'adam.caron@saint-remi.net', 'caron adam.jpg'),
       ('BOULARBI', 'MEDDHY',  'meddhy.boularbi@saint-remi.net', null),
       ('CHARKAOUI', 'RAYANE',  'rayane.charkaoui@saint-remi.net', null),
       ('CHASTAGNER', 'ARTHUR',  'arthur.chastagner@saint-remi.net','chastagner arthur.jpg'),
       ('COULON', 'ALEXANDRE',  'alexandre.coulon@saint-remi.net', 'coulon alexandre.jpg'),
       ('DUBOIS', 'ALEXANDRE',  'alexandre.dubois@saint-remi.net', null),
       ('JOSSE', 'THOMAS',  'thomas.josse@saint-remi.net', 'josse thomas.jpg'),
       ('LE CANU', 'MATHIS',  'mathis.le-canu@saint-remi.net', 'le canu mathis.jpg'),
       ('LION', 'ZIGGY',  'ziggy.lion@saint-remi.net', 'lion ziggy.jpg'),
       ('LONGBY', 'RENEDI',  'renedi.longby@saint-remi.net', 'longby renedi.jpg'),
       ('LOURDEL', 'MATHIS',  'mathis.lourdel@saint-remi.net', 'lourdel mathis.jpg'),
       ('MORALES', 'SIMON',  'simon.morales@saint-remi.net' , 'morales simon.jpg'),
       ('NEDELEC', 'FLORE', 'flore.nedelec@saint-remi.net', 'nedelec flore.jpg'),
       ('PARIS', 'THOMAS',  'thomas.paris@saint-remi.net', 'paris thomas.jpg'),
       ('RICHARD', 'TONNY',  'tonny.richard@saint-remi.net', null),
       ('RICHARD', 'TOM',  'tom.richard@saint-remi.net', 'richard tom.jpg'),
       ('ROELENS', 'GABRIEL',  'gabriel.roelens@saint-remi.net', 'roelens gabriel.jpg'),
       ('SOUKTANI', 'LEO',  'leo.souktani@saint-remi.net', 'souktani leo.jpg'),
       ('SUBERU', 'MOUBARAK',  'moubarak.suberu@saint-remi.net', null),
       ('TISON', 'CLAIRE',  'claire.tison@saint-remi.net', 'tison claire.jpg');

-- modification du login et du mot de passe du membre 1 (modification du login interdite par le trigger sauf avec le jeton)
set @trigger = 1;
update membre set login = 'admin', password = sha2('1111', 256) where id = 1;
set @trigger = null;

-- insertion de l'administrateur
insert into administrateur values (1);

-- insertion des fonctions
insert into fonction (repertoire, nom)
values
    ('classement', 'Gérer les classements'),
    ('document', 'Gérer les documents'),
    ('epreuve', 'Planifier les 4 saisons'),
    ('evenement', 'Gérer les événements'),
    ('information', 'Gérer les informations'),
    ('membre', 'Gérer les membres'),
    ('page', 'Mettre à jour les pages statiques'),
    ('partenaire', 'Gérer les partenaires'),
    ('photoinformation', 'Gérer les photos associées aux informations');


-- insertion des droits

-- attribution de tous les droits à l'administrateur 1
insert into droit
    select 1, repertoire
    from fonction;

select * from droit;