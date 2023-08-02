# pafin assignment by cjf

## Description

framework [Nest](https://github.com/nestjs/nest)

## Installation

make sure your node.js version is above 16

```bash
$ yarn install
```

Before you start the app, please add .env in project root. this variables can be changed accound to the real situations.

But remember you should changed according to the scripts/start-db.sh's variables. In this assignment, I'm using docker.

```shell
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DATABASE=pafin
PORT=3000
NODE_ENV=development

MAIL_USER= # if you want to expreience the email function that is necessary
MAIL_PASS= # if you want to expreience the email function that is necessary
```

and run the command `start:dev:db`, I'm using macos, if you're not working with the same os. you should have some little changed for the package.json command.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

after run the app, you can access the link localhost:3000/api to see the api documents.

That includes all of apis reuqired in the assignment.

then you can follow the command below to see the uni-testing work. I'm not sure I did it well enough, if any problem and places I can improve. Please issue me.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support
- [Nest](https://github.com/nestjs/nest) .
