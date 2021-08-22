Talaria

## dev
```
yarn 
yarn build
yarn dev

visit: http://localhost:3000/docs/
```

## prod
```
yarn

yarn build
yarn start
```

## docker
```
docker build -t talaria .
docker run -it -p 3000:3000 talaria
docker exec -it talaria /bin/bash

or

docker-compose up
```
or for a localer dev experience
```
docker-compose up -d db
npm run dev
```

docker stop $(docker ps -a -q)

## todos

add better logs
tests
postman collections