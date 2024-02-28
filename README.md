# Polls

## Overview

Polls is a full-stack polling project that allows users to vote, create polls, generate shareable URLs, and view real-time voting results.

## Features

- **Vote:** Users can cast their votes on different polls.
- **Create Polls:** Create new polls with customizable options.
- **Shareable URLs:** Generate unique URLs for each poll to share with others.
- **Real-time Updates:** View voting results in real-time using Websockets.

## Tech Stack

### Back-end

- **Node:** JavaScript runtime for server-side development.
- **Websocket:** Enables real-time communication between the server and clients.
- **Typescript:** Superset of JavaScript for static typing.
- **Fastify:** Fast and low overhead web framework for Node.js.
- **Prisma:** Database toolkit for typesafe database access using TypeScript.

### Front-end

- **Next.js 14:** React framework for server-rendered React applications.
- **Typescript:** Superset of JavaScript for static typing.

### Database

- *using docker to pushing this up*
- **PostgreSQL:** Powerful and open-source relational database.
- **Redis:** In-memory data structure store for caching.

## Getting Started

### Prerequisites

- Node.js installed

### Installation

1. Clone the repository.
2. Go to back-end folder and install dependencies using `npm install`.
3. Set up your PostgreSQL and Redis configurations with `docker compose up -d`.
4. Run the application using `npm dev`.
5. Go to front-end folder and install dependecies using `npm install`
6. Run the app using `npm run dev` 

## Configuration

Make sure to configure the application by updating the necessary environment variables. Refer to the sample configuration file `.env.example`.

## Usage

1. Start the server using `npm start`.
2. Access the application in your browser at `http://localhost:your_port`.
3. Create polls, share URLs, and start voting!

## Contributing

If you'd like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [Your License Name] License - see the [LICENSE.md](LICENSE.md) file for details.
