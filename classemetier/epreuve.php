<?php
declare(strict_types=1);

// table epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture, dateFermeture

class Epreuve extends Table
{
    public function __construct()
    {
        // appel du contructeur de la classe parent
        parent::__construct('epreuve');

        // la date de l'épreuve doit être renseignée et se situé dans l'année à venir
        $input = new InputDate();
        $input->Min = date("Y-m-d");
        $input->Max = date('Y-m-d', strtotime('+ 1 year'));
        $this->columns['date'] = $input;

        // la description
        $input = new InputTextarea();
        $input->Require = true;
        $this->columns['description'] = $input;

        // la date d'ouverture
        $input = new InputDate();
        $input->Require = false;
        $this->columns['dateOuverture'] = $input;

        // la date de fermeture
        $input = new InputDate();
        $input->Require = true;
        $this->columns['dateFermeture'] = $input;

        // urlInscription
        $input = new InputUrl();
        $input->Require = true;
        $this->columns['urlInscription'] = $input;

        //urlInsrit
        $input = new InputUrl();
        $input->Require = true;
        $this->columns['urlInscrit'] = $input;
    }

    /**
     * Retourne l'ensemble des épreuves
     * @return array
     */
    public static function getAll() : array
    {
        $sql = <<<EOD
                Select id, date, saison, description, urlInscription, urlInscrit,
                    dateOuverture, dateFermeture
                From epreuve
                Order by date desc;
EOD;
        $select = new Select();
        return $select->getRows($sql);
    }

    /**
     * Retourne l'épreuve à venir
     * @return array|false
     */
    public static function getProchaineEpreuve()
    {
        $sql = <<<EOD
               Select saison, date_format(date, '%d/%m/%Y') as dateFr, date, description,
                     date_format(dateOuverture, '%d/%m/%Y') as dateOuvertureFr,   
                    date_format(dateFermeture, '%d/%m/%Y') as dateFermetureFr,
                    dateOuverture, dateFermeture, urlInscription, urlInscrit, CURRENT_DATE as dateJour  
            From epreuve
            where date >= curdate() 
            order by date 
            limit 1;
EOD;
        $select = new Select();
        return $select->getRow($sql);
    }
}

