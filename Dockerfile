FROM node:16

RUN yarn global add pm2

CMD [ "node" ]