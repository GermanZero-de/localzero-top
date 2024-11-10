FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy rest of the files
COPY . .

RUN npm run build

CMD ["npm", "start"]