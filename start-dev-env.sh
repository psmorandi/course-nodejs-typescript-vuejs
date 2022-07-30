sudo docker network create nodejs-network
sudo docker-compose up -d
sudo docker run --rm -it -v $(pwd):/usr/src/node -p 3000:3000 -p 3001:3001 -p 3002:3002 -p 5173:5173 --network="nodejs-network" custom-node:latest bash