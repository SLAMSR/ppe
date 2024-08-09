# Chemin vers mysql.exe
$mysqlPath = "C:\wamp64\bin\mysql\mysql8.3.0\bin\mysql.exe"

# Vérifier si mysql.exe existe
if (-not (Test-Path $mysqlPath)) {
    Write-Host "Le fichier $mysqlPath n'existe pas"
    exit
}
# Paramètres de la commande
$user = "root"
$inputFile = "../.sql/ppe.sql"
# Vérifier si le fichier d'entrée existe
if (-not (Test-Path $inputFile)) {
    Write-Host "Le fichier de sauvegarde $inputFile n'a pas été trouvé."
    exit
}
# Demander confirmation à l'utilisateur
Write-Host "Vous êtes sur le point de restaurer la base de données PPE."
$confirmation = Read-Host "Êtes-vous sûr de vouloir continuer ? (O/N)"
if ($confirmation -ne "O" -and $confirmation -ne "o") {
    Write-Host "Opération annulée par l'utilisateur."
    exit
}
# Exécuter la commande
Get-Content $inputFile | & $mysqlPath -u $user -p
Write-Host "Traitement terminé."
