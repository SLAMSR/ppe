-- RAPPEL : le script insert doit être lancé en définissant la variable trigger afin de ne pas activer le contrôle sur la date



# contrôle de la saison de la date, de la période d'inscription et de la chronologie de ses trois dates
drop trigger if exists avantAjoutEpreuve;
drop trigger if exists avantModificationEpreuve;

delimiter $$
create trigger avantAjoutEpreuve
    before insert
    on epreuve
    for each row
begin
    # contrôle de la colonne id
    if new.id or new.id = 0 or new.id not regexp '^[0-9]+$' or exists (select 1 from epreuve where id = new.id) then
        set new.id = (select coalesce(max(id), 0) + 1 from epreuve);
    end if;
    # contrôle de la colonne saison de la saison
    if new.saison is null then
        signal sqlstate '45000' set message_text = '#La saison doit être renseigné';
    end if;
    if new.saison not in ('Hiver', 'Printemps', 'Été', 'Automne') then
        signal sqlstate '45000' set message_text = '#La saison doit être correctement renseignée';
    end if;
    if exists(select 1 from epreuve where saison = new.saison) then
        signal sqlstate '45000' set message_text = '#L''épreuve  se situant dans cette saison est déjà programmée';
    end if;

    # contrôle de la colonne description
    if new.description is null then
        signal sqlstate '45000' set message_text = '#La description doit être renseignée';
    end if;
    if new.description regexp
       '<script|drop|select|insert|delete|update|--|\\/\\*|\\*\\/' then
        signal sqlstate '45000' set message_text = '#La description contient des caractères ou des mots interdits. interdits';
    end if;

    # contrôle sur la date
    if new.date is null then
        signal sqlstate '45000' set message_text = '#La date de l''épreuve doit être renseignée';
    end if;
    -- Vérifier si la date est valide : en mode ansi toute valeur erronée est remplacée par la chaine '0000-00-00'
    if new.date regexp '^0000-00-00$' then
        signal sqlstate '45000' set message_text = '#la date n\'est pas valide';
    end if;
    # la date de l'épreuve doit être supérieure à la date du jour
    if new.date < curdate() and @trigger is null then
        signal sqlstate '45000' set message_text = '#La date de l''épreuve doit être supérieure à la date du jour';
    end if;
    # la date de l'épreuve doit être unique
    if exists(select 1 from epreuve where date = new.date) then
        signal sqlstate '45000' set message_text = '#Une épreuve est déjà programmée à cette date';
    end if;

    # contrôle sur la colonne dateOuverture
    if new.dateOuverture is null then
        signal sqlstate '45000' set message_text = '#La date d''ouverture des inscriptions doit être renseignée';
    end if;
    if new.dateOuverture regexp '^0000-00-00$' then
        signal sqlstate '45000' set message_text = '#La date d''ouverture des inscriptions n\'est pas valide';
    end if;
    # la date d'ouverture doit être unique
    if exists(select 1 from epreuve where date = new.date) then
        signal sqlstate '45000' set message_text = '#Une épreuve est déjà programmée à cette date';
    end if;

    # contrôle sur la colonne dateFermeture
    if new.dateFermeture is null then
        signal sqlstate '45000' set message_text = '#La date de fermeture des inscriptions doit être renseignée';
    end if;
    if new.dateFermeture regexp '^0000-00-00$' then
        signal sqlstate '45000' set message_text = '#La date de fermeture des inscriptions n\'est pas valide';
    end if;
    # contrôle de la chronologie des dates : dateOuverture < dateFermeture < date
    if new.dateFermeture not between new.dateOuverture and new.date - interval 1 day then
        signal sqlstate '45000' set message_text = '#La période d''inscription n''est pas cohérente';
    end if;

    # contrôle sur la colonne urlInscription
    if new.urlInscription is null then
        signal sqlstate '45000' set message_text = '#L''URL d''inscription doit être renseignée';
    end if;
    if exists(select 1 from epreuve where urlInscription = new.urlInscription) then
        signal sqlstate '45000' set message_text = '#L''URL d''inscription est déjà utilisée';
    end if;

    # contrôle sur la colonne urlInscrit
    if new.urlInscrit is null then
        signal sqlstate '45000' set message_text = '#L''URL des inscrits doit être renseignée';
    end if;
    if exists(select 1 from epreuve where urlInscrit = new.urlInscrit) then
        signal sqlstate '45000' set message_text = '#L''URL des inscrits est déjà utilisée';
    end if;

end

$$
create trigger avantModificationEpreuve
    before update
    on epreuve
    for each row
begin
    # L'identifiant n'est pas modifiable
    if new.id is null or new.id != old.id then
        signal sqlstate '45000' set message_text = '#L''identifiant ne peut être modifié';
    end if;

    # contrôle de la colonne saison
    if new.saison is null then
        signal sqlstate '45000' set message_text = '#La saison doit être renseigné';
    end if;
    if new.saison not in ('Hiver', 'Printemps', 'Été', 'Automne') then
        signal sqlstate '45000' set message_text = '#La saison doit être correctement renseignée';
    end if;
    if new.saison != old.saison and exists(select 1 from epreuve where saison = new.saison) then
        signal sqlstate '45000' set message_text = '#L''épreuve se situant dans cette saison est déjà programmée';
    end if;

    # contrôle de la colonne description
    if new.description is null then
        signal sqlstate '45000' set message_text = '#La description doit être renseignée';
    end if;
    if new.description regexp
       '<script|drop|select|insert|delete|update|--|\\/\\*|\\*\\/' then
        signal sqlstate '45000' set message_text = '#La description contient des caractères ou des mots interdits.';
    end if;

    # contrôle de la colonne date
    if new.date is null then
        signal sqlstate '45000' set message_text = '#La date de l''épreuve doit être renseignée';
    end if;
    if new.date regexp '^0000-00-00$' then
        signal sqlstate '45000' set message_text = '#La date de l''épreuve n\'est pas valide';
    end if;
    # la date de l'épreuve doit être supérieure à la date du jour et ne pas être déjà utilisée si elle est modifiée
    if new.date != old.date then
        if new.date < curdate() then
            signal sqlstate '45000' set message_text = '#La date de l''épreuve doit être supérieure à la date du jour';
        end if;
        if exists(select 1 from epreuve where date = new.date) then
            signal sqlstate '45000' set message_text = '#Une épreuve est déjà programmée à cette date';
        end if;
    end if;

    # contrôle sur la colonne dateOuverture
    if new.dateOuverture is null then
        signal sqlstate '45000' set message_text = '#La date d''ouverture des inscriptions doit être renseignée';
    end if;
    if new.dateOuverture regexp '^0000-00-00$' then
        signal sqlstate '45000' set message_text = '#La date d''ouverture des inscriptions n\'est pas valide';
    end if;
    # la date d'ouverture doit être  unique si elle est modifiée
    if new.dateOuverture != old.dateOuverture then
        if exists(select 1 from epreuve where dateOuverture = new.dateOuverture) then
            signal sqlstate '45000' set message_text = '#La date d''ouverture des inscriptions est déjà utilisée';
        end if;
    end if;

    # contrôle sur la colonne dateFermeture
    if new.dateFermeture is null then
        signal sqlstate '45000' set message_text = '#La date de fermeture des inscriptions doit être renseignée';
    end if;
    if new.dateFermeture regexp '^0000-00-00$' then
        signal sqlstate '45000' set message_text = '#La date de fermeture des inscriptions n`\'est pas valide';
    end if;

    # contrôle de la chronologie des dates : dateOuverture < dateFermeture < date
    if new.dateFermeture not between new.dateOuverture and new.date - interval 1 day then
        signal sqlstate '45000' set message_text = '#La période d''inscription n''est pas cohérente';
    end if;

    # contrôle de la colonne urlInscription
    if new.urlInscription is null then
        signal sqlstate '45000' set message_text = '#L''URL d''inscription doit être renseignée';
    end if;
    # si l'url des inscriptions est modifié, il doit être unique
    if new.urlInscription != old.urlInscription then
        if exists(select 1 from epreuve where urlInscription = new.urlInscription) then
            signal sqlstate '45000' set message_text = '#L''URL d''inscription est déjà utilisée';
        end if;
    end if;

    # contrôle de la colonne sur l'url des inscrits
    if new.urlInscrit is null then
        signal sqlstate '45000' set message_text = '#L''URL des inscrits doit être renseignée';
    end if;
    # si l'url des inscrits est modifié, il doit être unique
    if new.urlInscrit != old.urlInscrit then
        if exists(select 1 from epreuve where urlInscrit = new.urlInscrit) then
            signal sqlstate '45000' set message_text = '#L''URL des inscrits est déjà utilisée';
        end if;
    end if;
end
$$