# Déplacement à la racine du site
Set-Location ..

# Obtenir le nom de la branche actuelle
$branche = git rev-parse --abbrev-ref HEAD

# La branche active ne doit pas être la branche main
if ($branche -eq "main") {
    Write-Host "Veuillez basculer sur votre branche de travail pour exécuter ce script." -ForegroundColor Red
    exit 1
}

Write-Host "Basculer sur la branche main locale" -ForegroundColor Cyan
git checkout main

Write-Host "Récupérer les modifications de la branche main distante" -ForegroundColor Cyan
git pull origin main

Write-Host "Basculer sur la branche $branche" -ForegroundColor Cyan
git checkout $branche

Write-Host "Fusionner la branche main dans la branche $branche, en favorisant les fichiers de main" -ForegroundColor Cyan
git merge -X ours main --allow-unrelated-histories

Write-Host "Mettre à jour les sous-modules" -ForegroundColor Cyan
git submodule update --init --recursive

