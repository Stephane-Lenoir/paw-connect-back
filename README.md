# Paw-Connect - BACK

## Installation

```bash
- git clone REPO_SSH_URL
- Se déplacer dans le projet et code .
- Installer les dépendances back avec pnpm install
```

## Mise en place de la Base de Données

```bash
# Se connecter à son client Postgres
sudo -i -u postgres psql (Linux)
psql -U postgres (WPS & Git Bash)

# Créer un utilisateur de Base de Données
CREATE USER my_user WITH PASSWORD 'my_password';
# Créer une base de données
CREATE DATABASE my_db OWNER my_user;
```

## Mise en place de l'environnement de développement

```bash
- Un fichier .env.example : nos variables d'environnement (cp .env.example .env)
- Un dossier data qui contient les fichiers sql :
  - create_tables.sql : permet de créer les tables de la base de données.
  - seeding_tables.sql : permet de remplir les tables avec les données.
- package.json contient nos dépendances et nos scripts.
- pour générer un token dans un terminal : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` et le rentrer dans votre .env
```
