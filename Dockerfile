# pull official base image
FROM node:13.12.0-alpine
# RUN apk update && apk add nginx-full openssh-server sshpass && rm -rf /var/cache/apk/*
RUN apk update && apk add openssh
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

EXPOSE 5000

# start app
CMD ["npm","run","start"]

#docker run -p 5080:5000 -d sampleApi:dev