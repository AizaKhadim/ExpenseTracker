FROM node:20
WORKDIR /app

COPY package*.json ./

# Force install stable version
RUN npm install react-router-dom@6

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081
CMD ["npm","run","preview", "--", "--port", "8081", "--host"]
