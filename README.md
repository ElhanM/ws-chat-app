# ws-chat-app

run `nvm use` to use the correct node version

front end installed with `npx create-next-app@latest`
back end installed with `nest new api`

to run project locally:
in root run: `yarn`

Terminal 1:
`sudo systemctl stop postgresql`
`docker compose up`
`npx prisma migrate dev --name test`
`cd packages/api && yarn start:dev`
`yarn start:dev:docker`
`npx prisma studio`

Terminal 2: `cd packages/app && yarn dev`
