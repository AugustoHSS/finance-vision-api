# Finance Vision API
API for financial management for people working with osrs service

The Finance Vision API allows for tracking of financial earnings, generating detailed reports, providing an efficient database for storing service-related information.

## Technologies Used
- Node.js – JavaScript runtime environment for building server-side applications.
- Express – Web framework for Node.js.
- Prisma – ORM for database access.
- PostgreSQL – Relational database management system.
- JWT – authentication and authorization.
- bcrypt – hashing passwords.
- Joi – Data validation.
- dotenv – Loads environment variables from a .env file.
- CORS – Middleware for enabling Cross-Origin Resource Sharing.
- cookie-parser – Middleware for parsing cookies in requests.
- express-async-errors – Simplifies handling asynchronous errors in Express.

## Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (or compatible database)
- NPM or Yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AugustoHSS/finance-vision-api.git
   cd finance-vision-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database and create the `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Run migrations to set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### 6. **API Usage**
- Examples of requests and responses for the API.
- Include examples of endpoints, how to make requests, and what to expect as a response.


## Endpoints

### Table of Contents
- [GET /services](#get-services)
- [POST /services](#post-services)
- [POST /refresh](#post-refresh)
- [POST /logout](#post-logout)
- [POST /login](#post-login)
- [POST /register](#post-register)


### `GET /services` <a name="get-services"></a>
Returns all services for the authenticated user.

**Response**:
```json
{
  "id": 5,                                  // number
  "user_id": 1,                             // number
  "client_id": 3,                           // number | null
  "service_date": "2024-12-21T14:00:00Z",   // string (ISO 8601 date format)
  "value": "100",                           // string (poderia ser número dependendo do seu banco de dados)
  "boss_id": 5,                             // number
  "kill_count": 10,                         // number
  "is_ticket": true                         // boolean
}
```

### `POST /services` <a name="post-services"></a>
Creates a new service for the authenticated user.

**Request body**:
```json
{
  "serviceDate": "2024-12-21T14:00:00Z",  // string (ISO 8601 date format)
  "value": 100,                           // number
  "client_id": 3,                         // number | null
  "bossId": 8,                            // number
  "killCount": 10,                        // number
  "isTicket": true                        // boolean
}
```

## How to Contribute

1. Fork this repository.
2. Create a branch for your feature: `git checkout -b my-feature`.
3. Make your changes and commit with an explanatory message.
4. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
