set @@sql_mode='ansi';

delete from epreuve;
set @trigger = 0;

insert into epreuve (id, saison, description, date, urlInscription, urlInscrit, dateOuverture,
                     dateFermeture)
values (1, 'Hiver',
        '<p><strong>Label r&eacute;gional FFA qualificatif au championnat de France sur l&#39;ensemble des courses</strong></p>\n\n<p>Les Courses</p>\n\n<ul>\n	<li>5 km d&eacute;couverte: 9H20&nbsp;</li>\n	<li>10 km Course des Joggers: 10H05&nbsp;</li>\n	<li>10 km Course des As: 11H20&nbsp;</li>\n</ul>\n\n<p>Le tarif qui vous donne droit le droit de&nbsp;participer &agrave; l&#39;ensemble des courses.</p>\n\n<ul>\n	<li>Licenci&eacute;s FFA&nbsp; &nbsp; &nbsp; &nbsp;: 8&nbsp;euros&nbsp;</li>\n	<li>Non licenci&eacute;s FFA : 10&nbsp;euros&nbsp;</li>\n	<li>Gratuit&eacute; pour les membres de l&#39;Amicale du val de Somme</li>\n</ul>\n',
        '2024-02-18',
        'https://www.klikego.com/inscription/edition-hivernale-des-quatre-saisons-2024/running-course-a-pied/1603054434896-15',
        'https://www.klikego.com/inscrits/edition-hivernale-des-quatre-saisons-2024/1603054434896-15', '2024-01-01',
        '2024-02-15'),
       (2, 'Printemps',
        '<p>Les Courses</p>\n\n<ul>\n	<li>5 km d&eacute;couverte: 9H20&nbsp;</li>\n	<li>10 km Course des Joggers: 10H05&nbsp;</li>\n	<li>10 km Course des As: 11H20&nbsp;</li>\n</ul>\n\n<p>Le tarif qui vous donne droit le droit de&nbsp;participer &agrave; l&#39;ensemble des courses.</p>\n\n<ul>\n	<li>Licenci&eacute;s FFA&nbsp; &nbsp; &nbsp; &nbsp;: 6 euros&nbsp;</li>\n	<li>Non licenci&eacute;s FFA : 8 euros&nbsp;</li>\n	<li>Gratuit&eacute; pour les membres de l&#39;Amicale du val de Somme</li>\n</ul>\n',
        '2024-04-14',
        'https://www.klikego.com/inscription/4-saisons-Printemps-5-km-10-km-2024/running-course-a-pied/1603054434896-17',
        'https://www.klikego.com/inscrits/4-saisons-Printemps-5-km-10-km-2024/1603054434896-17', '2024-03-01',
        '2024-04-11'),
       (3, 'Été',
        '<p>Les Courses</p>\n\n<ul>\n	<li>5 km d&eacute;couverte: 9H20&nbsp;</li>\n	<li>10 km Course des Joggers: 10H05&nbsp;</li>\n	<li>10 km Course des As: 11H20&nbsp;</li>\n</ul>\n\n<p>Le tarif qui vous donne droit le droit de&nbsp;participer &agrave; l&#39;ensemble des courses.</p>\n\n<ul>\n	<li>Licenci&eacute;s FFA&nbsp; &nbsp; &nbsp; &nbsp;: 6 euros&nbsp;</li>\n	<li>Non licenci&eacute;s FFA : 8 euros&nbsp;</li>\n	<li>Gratuit&eacute; pour les membres de l&#39;Amicale du val de Somme</li>\n</ul>\n',
        '2024-09-01',
        'https://www.klikego.com/inscription/les-quatre-saisons-dete-2024/course-a-pied-running/1603054434896-19',
        'https://www.klikego.com/inscrits/les-quatre-saisons-dete-2024/1603054434896-19', '2024-06-01', '2024-08-29'),
       (4, 'Automne',
        '<p><strong>Label r&eacute;gional FFA qualificatif au championnat de France sur l&#39;ensemble des courses</strong></p>\n\n<p>Pour cette finale, plus de 2000 &euro; de prime seront distribu&eacute;s et un lot de grande qualit&eacute; sera offert &agrave; chaque arrivant.</p>\n\n<p>Les Courses</p>\n\n<ul>\n	<li>5 km d&eacute;couverte: 9H20&nbsp;</li>\n	<li>10 km Course des Joggers: 10H05&nbsp;</li>\n	<li>10 km Course des As: 11H20&nbsp;</li>\n</ul>\n\n<p>Le tarif qui vous donne droit le droit de&nbsp;participer &agrave; l&#39;ensemble des courses.</p>\n\n<ul>\n	<li>Licenci&eacute;s FFA&nbsp; &nbsp; &nbsp; &nbsp;: 8&nbsp;euros&nbsp;</li>\n	<li>Non licenci&eacute;s FFA : 10&nbsp;euros&nbsp;</li>\n	<li>Gratuit&eacute; pour les membres de l&#39;Amicale du val de Somme</li>\n</ul>\n',
        '2024-11-03',
        'https://www.klikego.com/inscription/finale-des-quatre-saisons-5-et-10-km-2024/course-a-pied-running/1603054434896-21',
        'https://www.klikego.com/inscrits/finale-des-quatre-saisons-5-et-10-km-2024/1603054434896-21', '2024-09-02',
        '2024-10-31');

set @trigger = null;
