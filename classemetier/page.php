<?php
declare(strict_types=1);
// gestion de la table page(id, nom, contenu)
// Seule la modification du contenu est possible

class Page extends Table
{
    public function __construct()
    {
        // appel du contructeur de la classe parent
        parent::__construct('page');

        // création des colonnes de la table
        // le nom n'est pas géré dans le programme

        // le contenu
        $input = new InputTextarea();
        $input->Require = true;
        $this->columns['contenu'] = $input;

        // Liste des colonnes modifiables en mode colonne
        $this->listOfColumns->Values = ['contenu'];
    }

    /**
     * Retourne le nom et le contenu html d'une page à partir de son id
     * @param int $id
     * @return array
     */
    public static function getById($id) : array
    {
        // récupération du contenu de la page
        // Tous les appels à cette méthode sont réalisés dans le code de l'application
        // le paramètre $id est donc forcément correct
        $sql = <<<EOD
            SELECT contenu, nom 
            FROM page
            WHERE id = :id; 
EOD;
        $select = new Select();
        return $select->getRow($sql, array("id" => $id));
    }

    /**
     * Retourne l'ensemble de pages
     * @return array
     */
    public static function getAll() : array
    {
        $sql = <<<EOD
          Select id, nom, contenu 
          from page
          order by nom;
EOD;
        $select = new Select();
        return $select->getRows($sql);
    }
}
