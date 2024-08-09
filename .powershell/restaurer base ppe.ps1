# Chemin vers mysql.exe
$mysqlPath = "C:\wamp64\bin\mysql\mysql8.3.0\bin\mysql.exe"

# V�rifier si mysql.exe existe
if (-not (Test-Path $mysqlPath)) {
    Write-Host "Le fichier $mysqlPath n'existe pas"
    exit
}
# Param�tres de la commande
$user = "root"
$inputFile = "../.sql/ppe.sql"
# V�rifier si le fichier d'entr�e existe
if (-not (Test-Path $inputFile)) {
    Write-Host "Le fichier de sauvegarde $inputFile n'a pas �t� trouv�."
    exit
}
# Demander confirmation � l'utilisateur
Write-Host "Vous �tes sur le point de restaurer la base de donn�es PPE."
$confirmation = Read-Host "�tes-vous s�r de vouloir continuer ? (O/N)"
if ($confirmation -ne "O" -and $confirmation -ne "o") {
    Write-Host "Op�ration annul�e par l'utilisateur."
    exit
}
# Ex�cuter la commande
Get-Content $inputFile | & $mysqlPath -u $user -p
Write-Host "Traitement termin�."
