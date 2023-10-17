# Utilisez une image Node.js comme base
FROM node:latest

# Créez un dossier pour votre projet
WORKDIR /usr/src/app

# Copiez le fichier package.json, yarn.lock et .env dans le conteneur Docker
COPY package.json yarn.lock .env .env.development ./

# Installez les dépendances avec Yarn
RUN yarn install

# Copiez le reste des fichiers de votre projet dans le conteneur Docker
COPY . .

# Laissez le point d'entrée vide, car la commande sera spécifiée dans docker-compose.yml
ENTRYPOINT []
