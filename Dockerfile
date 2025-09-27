FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN chmod +x ./start.sh

CMD ["./start.sh"]