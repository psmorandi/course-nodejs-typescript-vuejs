FROM node:16

RUN yarn global add pm2
RUN pm2 install typescript

CMD [ "node" ]