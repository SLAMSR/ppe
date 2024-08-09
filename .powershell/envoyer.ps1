# Ex�cuter le script pour r�cup�rer les mises � jour de la branche main
.\recuperer.ps1

# V�rifier que le script s'est ex�cut� correctement
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors de la r�cup�ration des mises � jour. Arr�t de l'ex�cution."
    exit $LASTEXITCODE
}

# Obtenir le nom de la branche actuelle
$branche = git rev-parse --abbrev-ref HEAD

# R�cup�rer le nom de l'utilisateur configur� dans Git
$userName = git config user.name

# Obtenir la date du jour au format jj/mm/aaaa
$date = Get-Date -Format "dd/MM/yyyy"

# Saisir la description du commit
$commitMessage = Read-Host "Entrez une courte description de cet envoi"

Write-Host "Ajouter les modifications de la branche $branche" -ForegroundColor Cyan
git add .

Write-Host "Valider les modifications de la branche $branche" -ForegroundColor Cyan
# Construire le message de commit complet
$fullCommitMessage = "Le $date ($userName) : $commitMessage"

# Ex�cuter la commande git commit avec le message de commit
git commit -m "$fullCommitMessage"

Write-Host "Pousser les modifications de la branche $branche" -ForegroundColor Cyan
git push origin $branche