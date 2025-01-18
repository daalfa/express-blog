## Setup

1. `npx prisma generate`
1. `npx prisma migrate dev --name init`

## Run

`npm start` or `nodemon src/app.js`

## API

| Path    | OP |
| -------- | ------- |
| `/api/posts/` | GET, POST |
| `/api/posts/:id` | GET |
| `/api/posts/:id/comments` | GET POST |
| `/api/posts/:id/comments/:id` | GET |
