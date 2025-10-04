# Use 
FROM node:22-alpine

WORKDIR /wordir
COPY . .

WORKDIR /wordir/src/frontend

ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]