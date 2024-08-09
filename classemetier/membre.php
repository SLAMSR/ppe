<?php
declare(strict_types=1);

// définition de la table membre : id, login, password, nom, prenom, email, telephone, photo, autMail

class Membre extends Table
{
    public function __construct()
    {
        parent::__construct('membre');

        // seuls les colonnes pouvant être modifiées par l'administrateur sont définies

        // nom
        $input = new inputText();
        $input->Require = true;
        $input->Casse = 'U';
        $input->SupprimerAccent = true;
        $input->SupprimerEspaceSuperflu = true;
        $input->Pattern = "^[A-Z]( ?[A-Z]+)*$";
        $input->MaxLength = 30;
        $this->columns['nom'] = $input;

        // prenom
        $input = new inputText();
        $input->Require = true;
        $input->Casse = 'U';
        $input->SupprimerAccent = true;
        $input->SupprimerEspaceSuperflu = true;
        $input->Pattern = "^[A-Z]( ?[A-Z]+)*$";
        $input->MaxLength = 30;
        $this->columns['prenom'] = $input;

        //  email
        $input = new inputEmail();
        $input->Require = true;
        $input->MaxLength = 100;
        $this->columns['email'] = $input;

    }

    // ------------------------------------------------------------------------------------------------
    // Méthodes statiques relatives aux opérations de consultation
    // ------------------------------------------------------------------------------------------------

    public static function getAll(): array
    {
        // Récupération des paramètres du téléversement
        $sql = <<<EOD
        Select id, concat(nom, ' ' , prenom) as nomPrenom, nom, prenom, email, 
               ifnull(photo, 'Non renseignée') as photo,  login,
               if(autMail, 'Oui', 'Non') as afficherMail,  
               ifnull(telephone, 'Non renseigné') as telephone,
               if(SHA2('0000', 256) = password, 'Non', 'Oui') as actif
        From membre
        Order by nom, prenom;
EOD;
        $select = new Select();
        return $select->getRows($sql);
    }


    /**
     * Récupère les membres pour affichage dans l'annuaire
     * @return array
     */
    public static function getLesMembres(): array
    {
        // Récupération des paramètres du téléversement
        $lesParametres = require RACINE . '/classemetier/configmembre.php';
        $repertoire = $lesParametres['repertoire'];
        $sql = <<<EOD
        Select nom, prenom,  
        if(autMail, email, 'Non communiqué') as mail,  
        ifnull(telephone, 'Non renseigné') as telephone,
        ifnull(photo, 'Non renseignée') as photo 
        From membre
        order by nom, prenom;
EOD;
        $select = new Select();
        $lesLignes = $select->getRows($sql);
        // vérification de l'existence des photos sinon elle est remplacée par la photo par défaut selon le sexe
        for ($i = 0; $i < count($lesLignes); $i++) {
            if ($lesLignes[$i]['photo'] !== "Non renseignée") {
                $lesLignes[$i]['photo'] = $repertoire . '/' . $lesLignes[$i]['photo'];
            } else {
                $lesLignes[$i]['photo'] = "Photo non trouvée";
            }
        }
        return $lesLignes;
    }

    /**
     *  Vérifie si un password est correct
     * @param int $id
     * @param string $password
     * @return bool
     */
    public static function verifierPassword(int $id, string $password): bool
    {
        $sql = <<<EOD
                 Select password from membre 
                 where id = :id;
EOD;
        $select = new Select();
        $ligne = $select->getRow($sql, ['id' => $id]);
        return $ligne && $ligne['password'] === hash('sha256', $password);
    }

    /**
     * Récupère les données d'un membre à partir de son login
     * @param string $login
     * @return array|false
     */
    public static function getByLogin(string $login): array|false
    {
        $sql = <<<EOD
            Select id, login, email, nom, prenom
            from membre 
            where login = :login;
EOD;
        $select = new Select();
        return $select->getRow($sql, ['login' => $login]);
    }

    /**
     * Récupère les données d'un membre à partir de son id
     * @param int $id
     * @return array|false
     */
    public static function getById($id)
    {
        $sql = <<<EOD
             Select id, nom, prenom, email, login, telephone, autMail
             From membre
             where id = :id;
EOD;
        $select = new Select();
        return $select->getRow($sql, ['id' => $id]);
    }

    /**
     *  Récupère la photo d'un utilisateur
     * @param int $id
     * @return string|null
     */
    public static function getPhoto(int $id): string|null
    {
        $lesParametres = require RACINE . '/classemetier/configmembre.php';
        $repertoire = $lesParametres['repertoire'];
        $sql = <<<EOD
        Select photo
        from membre 
        where id = :id;
EOD;
        $select = new Select();
        $photo = $select->getValue($sql, ['id' => $id]);
        if ($photo && file_exists(RACINE . $repertoire . '/' . $photo)) {
            return $repertoire . '/' . $photo;
        } else {
            return null;
        }
    }

    /**
     * Contrôle l'accès au répertoire courant pour l'administrateur connecté
     */
    public static function controlerAcces(): void
    {
        if (!isset($_SESSION['membre'])) {
            $_SESSION['url'] = $_SERVER['PHP_SELF'];
            header("location:/membre/connexion/");
            exit;
        }
    }

    /**
     *  Modifie la photo d'un utilisateur
     * @param int $id
     * @param string $nomFichier
     * @return void
     */
    public static function modifierPhoto(int $id, string $nomFichier): void
    {
        try {
            $sql = <<<EOD
            update membre 
            set photo = :nomFichier
            where id = :id
EOD;
            $db = Database::getInstance();
            $curseur = $db->prepare($sql);
            $curseur->bindValue('id', $id);
            $curseur->bindValue('nomFichier', $nomFichier);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     *   Supprime la photo d'un utilisateur : remettre la photo par défaut
     * @param int $id
     * @return void
     */
    public static function supprimerPhoto(int $id): void
    {
        try {
            $sql = <<<EOD
                update membre 
                set photo = null
                where id = :id; 
EOD;
            $db = Database::getInstance();
            $curseur = $db->prepare($sql);
            $curseur->bindValue('id', $id);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Modifie le mot de passe d'un utilisateur
     * @param string $login
     * @param $password
     * @return void
     */
    public static function modifierPassword(string $login, string $password): void
    {
        try {
            // Chiffrement du mot de passe
            $hash = hash('sha256', $password);

            // enregistrement et archivage du nouveau mot de passe
            $db = Database::getInstance();
            $sql = <<<EOD
            Update membre 
            Set password = :password  
            Where login = :login;
EOD;
            $curseur = $db->prepare($sql);
            $curseur->bindValue('login', $login);
            $curseur->bindValue('password', $hash);

            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     *  Modifie l'email d'un utilisateur
     * @param int $id
     * @param $email
     * @return void
     */
    public static function modifierEmail(int $id, string $email): void
    {
        try {
            $db = Database::getInstance();
            $sql = <<<EOD
                Update membre 
                Set email = :email  
                Where id = :id;
EOD;
            $curseur = $db->prepare($sql);
            $curseur->bindValue('id', $id);
            $curseur->bindValue('email', $email);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Modifie les informations facultatives d'un utilisateur
     *
     * @param int $id
     * @param string $telephone
     * @param int $autorisation
     * @return void
     */
    public static function modifierProfil(int $id, string $telephone, int $autorisation): void
    {
        try {
            // génération de la requête
            $sql = 'update membre set autMail = :autorisation';
            $sql .= empty($telephone) ? ", telephone = null" : ", telephone = :telephone";
            $sql .= " where id = :id";
            $db = Database::getInstance();
            $curseur = $db->prepare($sql);
            $curseur->bindValue('id', $id);
            $curseur->bindValue('autorisation', $autorisation, PDO::PARAM_BOOL);
            if (!empty($telephone)) $curseur->bindValue('telephone', $telephone);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }
}