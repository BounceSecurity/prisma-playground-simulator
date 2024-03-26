# prisma-playground-simulator

## Introduction

This is designed to be an offline version of the [Prisma Playground](https://playground.prisma.io/examples) as I found that the online version sometimes errors out and can sometimes be a little slow.

Note that this repo is based on the template that Prisma uses to demonstrate its Client Extensions, e.g. [this one](https://github.com/prisma/prisma-client-extensions/tree/main/row-level-security) so thanks to them for that 😀

## How to use

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)
- Install [Docker](https://docs.docker.com/get-docker/)

### 1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:BounceSecurity/prisma-playground-simulator.git
```

Create a `.env` file and install dependencies:

```sh
cd prisma-sqli
cp .env.example .env
npm install
```

### 2. Start the database

Run the following command to start a new Postgres database in a Docker container:

```sh
docker compose up -d
```

### 3. Run migrations

Run this command to apply migrations to the database:

```sh
npx prisma migrate deploy
```

### 4. Seed the database

Run the following command to add seed data to the database:

```sh
npx prisma db seed
```

### 5. Run the `dev` script

To run the Javascript version of the simulator, run the following command:

```sh
npm run dev
```

To run the Typescript version of the simulator, run the following command:

```sh
npm run devts
```

(You may need agree to install tsx)
