FROM node:18.19-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install -g nodemon

EXPOSE 3000
CMD ["npm", "start"]
