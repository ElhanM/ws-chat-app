# WS Chat App -> Under Development

WS Chat App is a chat application built with NestJS, Next.js, and TypeScript.

## Technial Details

This project is a monorepo managed with yarn workspaces.

The backend of the application is built with NestJS and uses Prisma as an ORM. The frontend is built with Next.js and styled with Tailwind CSS, and uses Redux Toolkit for state management. The communication between the frontend and the backend is done using GraphQL, utilizing Apollo to consume the API. The database I decided to use is PostgresSQL, which runs inside of a docker container.

During development, I used a TDD (Test Driven Development) approach to build the app.

The most interesting part of the project is the chat feature, that uses websockets to allow real-time communication between users. I used Socket.io to achieve this.

## Packages

The project is organized into multiple packages:

- `@ws-chat-app/api`: This is the backend of the application, built with NestJS.Located in: packages/api
- `@ws-chat-app/app`: This is the frontend of the application, built with Next.js. Located in: packages/app
- `@ws-chat-app/shared`: This package contains shared TypeScript types and utilities. Located in: packages/shared

## Getting Started

First of all, this project is mean to be run with Node.js version 20.x. You can use `nvm` to manage your Node.js versions. Simpy run `nvm use` in your terminal to use the correct version.

To get started with the project, you first need to install all the dependencies. Since this project uses yarn workspaces, you can do this by running `yarn` at the root of the project.

How to run api:

First, go to the api package

```bash
cd packages/api
```

In order to run the api, you first need to run the docker-compose.yaml file to start a postgres database.

```bash
sudo systemctl stop postgresql # if you have postgres running locally stop it

docker compose up
```

Then, you can use prisma to create and seed the database:

```bash
npx prisma db push

npx prisma db seed
```

Now you are ready to run the server:

```bash
yarn start:dev
```

PS, you can run prisma migrations using:

```bash
npx prisma migrate dev --name test
```

And you can run prisma studio using:

```bash
npx prisma studio
```

How to run app:

```bash
cd packages/app && yarn dev
```

### You do not need to run the shared folder.