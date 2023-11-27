# Event-Management

## Description

This project is an event management system that allows users to organize and manage various events. The system is built using TypeScript, Express.js, and Prisma for database interactions. It includes user authentication using JSON Web Tokens (JWT) and password hashing with bcrypt.

## Installation

1. Clone the repository

```Bash
https://github.com/sumit1804/Event-Management.git
```

2. Navigate the project directory
   cd event-management

3. Install dependencies
   using node version 16.19.0
   npm install

## Usage

1. Start the development server
   npm run dev
   This will use ts-node-dev to run the server with automatic reloading on file changes.

2. Access the application in your browser at http://localhost:3001/

## Dependencies

- @prisma/client: Prisma client for database interactions.
- @types/bcrypt: TypeScript definitions for bcrypt.
- @types/jsonwebtoken: TypeScript definitions for JSON Web Token.
- bcrypt: Library for hashing passwords.
- express: Web application framework for Node.js.
- jsonwebtoken: Implementation of JSON Web Tokens.

## Dev Dependencies

- @types/express: TypeScript definitions for Express.
- @types/node: TypeScript definitions for Node.js.
- prisma: Database toolkit for TypeScript & Node.js.
- ts-node-dev: TypeScript execution and development tool.
- typescript: TypeScript language compiler.

## Scripts

- npm run dev: Start the development server using ts-node-dev for automatic reloading.
- npm test: Run tests (placeholder script, update with actual tests).

## License

This project is licensed under the ISC License - see the LICENSE file for details.
