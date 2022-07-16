FROM node:16

RUN yarn global add pm2
RUN pm2 install typescript
RUN npm install --location=global npm@8.14.0

CMD [ "node" ]