# Chemin vers mysqldump.exe
$mysqldumpPath = "C:\wamp64\bin\mysql\mysql8.3.0\bin\mysqldump.exe"

# V�rifier si mysqldump.exe existe
if (-not (Test-Path $mysqldumpPath)) {
    Write-Host "Le fichier $mysqldumpPath n'existe pas"
    exit
}
# Param�tres de la commande
$user = "root"
$database = "ppe"
$outputFile = "../.sql/ppe.sql"

# Supprimer le fichier de sauvegarde s'il existe
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Ex�cuter la commande
C:\wamp64\bin\mysql\mysql8.3.0\bin\mysqldump.exe -u $user $database --databases --add-drop-database --routines=true > $outputFile

# Afficher un message de confirmation en testant l'existence du fichier de sauvegarde
if (Test-Path $outputFile) {
    Write-Host "La base de donn�es a �t� sauvegard�e avec succ�s dans le fichier $outputFile" -ForegroundColor Green
} else{
    Write-Host "Une erreur s'est produite lors de la sauvegarde de la base de donn�es" -ForegroundColor Red
}

