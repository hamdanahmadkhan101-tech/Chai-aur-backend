FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Ensure temp upload directory exists
RUN mkdir -p /app/public/temp

ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm", "start"]
