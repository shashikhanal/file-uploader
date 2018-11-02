<h1 align="left">
  File Uploader
</h1>

> File upload API with Express.js

[![Build Status](https://travis-ci.org/shashikhanal/file-uploader.svg?branch=master)](https://travis-ci.org/shashikhanal/file-uploader)

Comes with:

- [ES6](http://babeljs.io/learn-es2015/) features/modules
- ES7 [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [ESLint](http://eslint.org/) for code linting
- Request validation using [Joi](https://www.npmjs.com/package/joi)
- Code formatting using [Prettier](https://www.npmjs.com/package/prettier)
- Tests using [mocha](https://www.npmjs.com/package/mocha) and [chai](https://www.npmjs.com/package/chai)

---

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install) - 8.9.0 or above
- [Yarn](https://yarnpkg.com/en/docs/install) - 1.7.0 or above
- [NPM](https://docs.npmjs.com/getting-started/installing-node) - 5.5.1 or above

## Setup

Clone the repository and install the dependencies.

    $ git clone git@github.com:shashikhanal/file-uploader.git <application-name>
    $ cd <application-name>
    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details.

    $ copy .env.example .env

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8081 to verify installation.

To create build:

    $ npm run build

## Setup Using Docker

Use [docker-compose](https://docs.docker.com/compose/) to quickly bring up a stack with pre-configured container.

Specific configuration for Docker is in `.env.docker`

- `0.0.0.0` as `$APP_HOST` to expose app on Docker network interface

Bring up application,

    $ docker-compose up

Navigate to http://localhost:8081 to verify application is running in docker.

Bring down application,

    $ docker-compose down

That's it, setup is complete.

## Tests

    $ yarn test

Run tests with coverage.

    $ yarn test:coverage

## License

[MIT License](https://opensource.org/licenses/MIT)
