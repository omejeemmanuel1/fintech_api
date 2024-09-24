# Fintech API

This is a simple RESTful API for handling user registration, login, and transaction management for a fintech application. It uses **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **JWT** for authentication.

## Features

- User Registration and Login with JWT-based authentication.
- Secure password hashing with **bcrypt**.
- Create transactions with fields such as amount, recipient, sender, and description.
- View transaction history with pagination support.
- Input validation using **Joi**.
- Rate limiting to protect the API from abuse.

## Technologies Used

- **Node.js** and **Express.js** for the API.
- **MongoDB** for the database.
- **JWT** for user authentication.
- **bcrypt** for password hashing.
- **TypeScript** for static typing.
- **Joi** for schema validation.
- **dotenv** for environment variable management.
- **Mongoose** as the MongoDB ORM.
- **express-rate-limit** for request rate limiting.

## Prerequisites

Before running this project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- A tool for API testing (Postman)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/omejeemmanuel1/fintech_api.git
   cd fintech-api
