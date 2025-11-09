FROM node:20

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

# Build the Vite app
RUN npm run build

# Serve built app on container startup
CMD ["npm", "run", "start"]
