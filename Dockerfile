FROM node:12-alpine
COPY . ./blog
WORKDIR ./blog/server
RUN npm install
CMD [ "nodemon server" ]