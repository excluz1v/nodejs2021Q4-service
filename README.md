# RS School REST service With Docker

## Downloading

clone repo

```
git clone https://github.com/excluz1v/nodejs2021Q4-service.git
```

switch branch

```
git checkout typeORM
```

## Deploy

install dpackages

```
npm i
```

start application

```
docker-compose up --build
```

wait for container is build

## Run tests

open new console

```
docker exec -it nodejs2021q4-service-node-1 npm run test
```

stop application

```
docker-compose down
```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker -[Download & Install Docker](https://www.docker.com/get-started)
