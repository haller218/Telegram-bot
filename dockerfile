FROM alpine

RUN apk update &&\
    # apk upgrade --no-progress &&\ # desnecessario
    apk add --no-progress nodejs &&\
    apk add --no-progress yarn

# admin
RUN adduser -D -h /home/app -s /bin/false app app
ENV HOME=/home/app

# API : config
COPY package.json $HOME
COPY yarn.lock $HOME
# for npm : not work good
# RUN npm shrinkwrap --silent --progress=false
# COPY npm-shrinkwrap.json $HOME

# admin
RUN chown -R app:app $HOME

USER root
WORKDIR $HOME
# API : yarn install
RUN # npm cache clean &&\
    yarn install # --silent # --progress=false


# API : Cunstom
# RUN echo $(/usr/bin/npm --silent --progress=false install -g nodemon) > /dev/null
RUN yarn global add nodemon 


# COPY . $HOME
RUN chown -R app:app $HOME/*

# ENV : Configure user env

# ADD docker/ext.sh /
# RUN chmod +x /ext.sh
# RUN /bin/sh -c "/ext.sh"


USER app
# FINIshin
CMD ["node", "index.js"]
