# Chemin vers mysqldump.exe
$mysqldumpPath = "C:\wamp64\bin\mysql\mysql8.3.0\bin\mysqldump.exe"

# Vérifier si mysqldump.exe existe
if (-not (Test-Path $mysqldumpPath)) {
    Write-Host "Le fichier $mysqldumpPath n'existe pas"
    exit
}
# Paramètres de la commande
$user = "root"
$database = "ppe"
$outputFile = "../.sql/ppe.sql"

# Supprimer le fichier de sauvegarde s'il existe
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Exécuter la commande
C:\wamp64\bin\mysql\mysql8.3.0\bin\mysqldump.exe -u $user $database --databases --add-drop-database --routines=true > $outputFile

# Afficher un message de confirmation en testant l'existence du fichier de sauvegarde
if (Test-Path $outputFile) {
    Write-Host "La base de données a été sauvegardée avec succès dans le fichier $outputFile" -ForegroundColor Green
} else{
    Write-Host "Une erreur s'est produite lors de la sauvegarde de la base de données" -ForegroundColor Red
}

