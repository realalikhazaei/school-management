# 🏫 School Management System
A feature-rich school management backend powered by GraphQL and Express.
This project was designed and implemented from the ground up, featuring a custom clean-code architecture for the GraphQL portion to ensure maintainability and scalability.
It leverages the power of GraphQL for flexible data querying while using Express.js for middleware and server setup.

## Key Features:

* Academic Management: Manage classes, teachers, students, homework assignments, and exams.
* Student Tracking: Monitor daily activities, including absences, positive points, and penalties.
* GraphQL API: A flexible and efficient API allowing clients to request exactly the data they need.
* Administrative Functions: Includes systems for payment processing and JWT-based user authentication.

## Tech Stack:

* Backend: Node.js, Express.js
* API Layer: GraphQL, Apollo Server, Express
* Database: MongoDB with Mongoose
* Authentication: JWT

## Setup and Installation

1. Clone the master branch from the repository:

```
git clone --branch master https://github.com/realalikhazaei/school-management
```

2. Install the required dependencies:

```
npm install
```

3. Create a .env file in the root and populate it with the required variables.

```
//Example Variables

PORT=5000
HOST = 127.0.0.1
MONGO_CONNECT=<your mongodb connection string>
REDIS_PORT = 12460
REDIS_HOST = redis-12460.c274.us-east-1-3.ec2.redns.redis-cloud.com
REDIS_USER = default
REDIS_PASS = kcPbyp1rRv3Oa3wedww6Bei7q5OBO6fo
JWT_SECRET=<your jwt secret string>
JWT_EXPIRES_IN=<jwt expiration time>
COOKIE_EXPIRES=<cookie expiration time per days>
BCRYPT_COST=<password hashing cost - 12 is recommended>
PASSWORD_RESET_EXPIRES_MIN=<password reset token expiration time per minutes>
```

4. Start the server.

```
npm start
```

5. You can then access the GraphQL Playground at the specified port.

```
http://127.0.0.1:5000/graphql
```
