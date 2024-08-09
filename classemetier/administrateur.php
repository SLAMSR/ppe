<?php
declare(strict_types=1);

/**
 * Class Administrateur
 * Date: 30/07/2024
 */

class Administrateur
{
    /**
     * Contrôle l'accès au répertoire courant pour l'administrateur connecté
     */
    public static function controlerAcces(): void
    {
        if (!isset($_SESSION['membre'])) {
            Erreur::envoyerReponse("Vous devez être connecté pour accéder à cette fonctionnalité", 'global');
        }

        $idMembre = $_SESSION['membre']['id'];

        if (!self::estUnAdministrateur($idMembre)) {
            Erreur::envoyerReponse("Vous devez être administrateur pour accéder à cette fonctionnalité", 'global');
        }

        $repertoire = basename(dirname($_SERVER['PHP_SELF']));

        if (!self::peutAdministrer($idMembre, $repertoire)) {
            Erreur::envoyerReponse("Vous n'avez pas les droits pour accéder à cette fonctionnalité", 'global');
        }
    }


    /*
     * Retourne l'ensemble des membres administrateur
     * @return array
     *
     */
    public static function getLesAdministrateurs(): array
    {
        $sql = <<<EOD
              Select membre.id, concat(nom, ' ', prenom) as nom
              from membre join administrateur on membre.id = administrateur.id 
              order by nom; 
EOD;
        $select = new Select();
        return $select->getRows($sql);
    }

    /**
     * Retourne l'ensemble des fonctions d'administration
     * @return array
     */
    public static function getLesFonctions(): array
    {
        $sql = <<<EOD
           Select nom, repertoire
           from fonction
           order by nom;

EOD;
        $select = new Select();
        return $select->getRows($sql);
    }

    /**
     * Retourne les droits (répertorie) d'un administrateur
     * @param int $idAdministrateur
     * @return array
     */
    public static function getLesDroits(int $idAdministrateur): array
    {
        $sql = <<<EOD
          Select repertoire
          from droit
          where idAdministrateur = :idAdministrateur
EOD;
        $select = new Select();
        return $select->getRows($sql, ["idAdministrateur" => $idAdministrateur]);
    }


    /**
     * Retourne les fonctions autorisées pour un administrateur
     * @param int $idAdministrateur
     * @return array
     */
    public static function getLesFonctionsAutorisees(int $idAdministrateur): array
    {
        $sql = <<<EOD
           Select nom, fonction.repertoire
           from fonction
               join droit on fonction.repertoire = droit.repertoire
               where idAdministrateur = :idAdministrateur
           order by nom;

EOD;
        $select = new Select();
        return $select->getRows($sql, ["idAdministrateur" => $idAdministrateur]);
    }


    /**
     * Retourne l'ensemble des membres qui ne sont pas administrateur
     * @return array
     */
    public static function getLesMembres(): array
    {
        $sql = <<<EOD
            Select id, concat(nom, ' ', prenom) as nom
            from membre where id not in (select id from administrateur)  
            order by nom; 
EOD;
        $select = new Select();
        return $select->getRows($sql);
    }

    /**
     * Vérifie si un membre est administrateur
     * @param $id
     * @return int|mixed
     */
    public static function estUnAdministrateur($id)
    {
        $sql = "select 1 from administrateur where id = :id";
        $select = new Select();

        $reponse = $select->getValue($sql, ["id" => $id]);

        return $reponse ?? 0;
    }

    /**
     * Vérifie si un administrateur est autorisé à lancer les script d'un répertoire
     * @param int $id
     * @param string $repertoire
     * @return bool
     */
    public static function peutAdministrer(int $id, string $repertoire): bool
    {
        $sql = <<<EOD
                select 1 from droit 
                where idAdministrateur = :id 
                and repertoire = :repertoire;
EOD;
        $select = new Select();
        $reponse = $select->getValue($sql, ["id" => $id, "repertoire" => $repertoire]);
        return (bool) ($reponse ?? false);
    }


    /**
     * Ajoute un administrateur
     * @param int $idAdministrateur
     * @return void
     */
    public static function ajouterAdministrateur(int $idAdministrateur): void
    {
        try {
            $db = Database::getInstance();
            $sql = " insert into administrateur (id) values (:id)";
            $curseur = $db->prepare($sql);
            $curseur->bindParam('id', $idAdministrateur);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Supprime un administrateur
     * @param int $idAdministrateur
     * @return void
     */
    public static function supprimerAdministrateur(int $idAdministrateur): void
    {
        try {
            $db = Database::getInstance();
            $sql = "delete from administrateur where id = :id;";
            $curseur = $db->prepare($sql);
            $curseur->bindParam('id', $idAdministrateur);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Ajoute un droit à un administrateur
     * @param int $idAdministrateur
     * @param string $repertoire
     * @return void
     */
    public static function ajouterDroit(int $idAdministrateur, string $repertoire)
    {
        try {
            $db = Database::getInstance();
            $sql = " insert into droit (repertoire, idAdministrateur) values (:repertoire, :idAdministrateur)";
            $curseur = $db->prepare($sql);
            $curseur->bindParam('repertoire', $repertoire);
            $curseur->bindParam('idAdministrateur', $idAdministrateur);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Supprime un droit à un administrateur
     * @param int $idAdministrateur
     * @param string $repertoire
     * @return void
     */
    public static function supprimerDroit(int $idAdministrateur, string $repertoire)
    {
        try {
            $db = Database::getInstance();
            $sql = "delete from droit where repertoire = :repertoire and idAdministrateur = :idAdministrateur;";
            $curseur = $db->prepare($sql);
            $curseur->bindParam('repertoire', $repertoire);
            $curseur->bindParam('idAdministrateur', $idAdministrateur);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Supprime tous les droits d'un administrateur
     * @param int $idAdministrateur
     * @return void
     */
    public static function supprimerTousLesDroits(int $idAdministrateur): void
    {
        try {
            $db = Database::getInstance();
            $sql = "delete from droit where idAdministrateur = :idAdministrateur;";
            $curseur = $db->prepare($sql);
            $curseur->bindParam('idAdministrateur', $idAdministrateur);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }

    /**
     * Ajoute tous les droits à un administrateur
     * @param int $idAdministrateur
     * @return void
     */
    public static function ajouterTousLesDroits(int $idAdministrateur): void
    {
        try {
            $db = Database::getInstance();
            // on supprime préalablement tous les droits
            $sql = <<<EOD
	        delete from droit where idAdministrateur = :idAdministrateur;
EOD;
            $curseur = $db->prepare($sql);
            $curseur->bindParam('idAdministrateur', $idAdministrateur);
            $curseur->execute();
            // on ajoute ensuite tous les droits
            $sql = <<<EOD
	        insert into droit(idAdministrateur, repertoire) select :idAdministrateur, repertoire from fonction;
EOD;
            $curseur = $db->prepare($sql);
            $curseur->bindParam('idAdministrateur', $idAdministrateur);
            $curseur->execute();
        } catch (Exception $e) {
            Erreur::envoyerReponse($e->getMessage());
        }
    }
}
