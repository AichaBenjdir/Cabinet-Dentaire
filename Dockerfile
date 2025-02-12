# Étape 1 : Utiliser une image Node.js pour construire l'application Angular
FROM node:16 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Construire l'application Angular en mode production
RUN npm run build --prod

# Étape 2 : Utiliser une image Nginx pour servir l'application construite
FROM nginx:alpine

# Copier le contenu du dossier dist dans le répertoire de Nginx
COPY --from=build /app/dist/cabinet-dentaire- /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
