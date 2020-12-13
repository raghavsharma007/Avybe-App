FROM node:14.14-alpine3.11

WORKDIR /app/frontend
COPY package.json /app/frontend

RUN npm install

EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]