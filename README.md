# Quick Local Setup Guide

- To run the shortlet backend locally, follow the steps below:

- Clone repository

  ```
  git clone --depth  https://github.com/oyeyipo45/pastel-back.git
  ```

- Go to folder

  ```
  cd pastel-back/
  ```

- Install the project dependencies.

  ```
  npm run install
  ```

- In the root folder of the project, create a `.env` file and add the following values.
  You can find this secrets here for ease of usage and a database was hosted for this project which will be terminated after evaluation

  ```
  APP_PORT=9090
  NODE_ENV=local
  USERNAME=oyeyipo45
  PASSWORD=Kolade11.
  DB_NAME=Damilola
  ```

- Start the application in development mode.

  ```
  npm run start:dev
  ```

- Access application on local host and check external api health

  ```
  http://localhost:9090/v1/api/health
  ```

- Local API documentation

  ```
  http://localhost:9090/api-docs#
  ```

- To run e2e tests in development mode.
  ```
  npm run test:e2e
  ```
