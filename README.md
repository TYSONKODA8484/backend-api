InstiX Backend API
InstiX is a backend service for a campus-specific social media application. It provides secure user authentication, post management, and advanced backend features like rate limiting and API documentation.

Features
User Authentication:
Secure registration and login with hashed passwords.
Token-based authentication using JWT with httpOnly cookies.
Post Management:
Create, read, update, and delete posts.
Secure post creation tied to authenticated users.
Advanced Backend Features:
Rate limiting to prevent abuse.
API documentation with Swagger for seamless integration.
Logging with Winston for monitoring and debugging.
Security Enhancements:
Data validation to prevent malformed requests.
CORS enabled for cross-origin requests.
Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (via Mongoose ODM)
Authentication: JWT (JSON Web Tokens) with bcrypt for password hashing
API Documentation: Swagger UI
Logging: Winston
Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v14 or later)
MongoDB (local or MongoDB Atlas)
Git
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/TYSONKODA8484/backend-api.git
cd backend-api
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables: Create a .env file in the root directory and add the following:

plaintext
Copy code
PORT=3000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
Run the Server:

bash
Copy code
npm start
Access the APIs:

Base URL: http://localhost:3000
API Docs: http://localhost:3000/api-docs
API Endpoints
Authentication
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Login and get a token	❌
GET	/api/auth/profile	Get user profile data	✅
Posts
Method	Endpoint	Description	Auth Required
POST	/api/posts	Create a new post	✅
GET	/api/posts	Get all posts	❌
Swagger Documentation
Interactive API documentation is available via Swagger:

Visit: Swagger UI
Folder Structure
plaintext
Copy code
backend-api/
├── config/               # Configuration files (e.g., database, Swagger)
├── controllers/          # API controllers for handling requests
├── middlewares/          # Custom middleware (e.g., authentication, rate limiting)
├── models/               # Mongoose schemas and models
├── routes/               # Route definitions for APIs
├── logs/                 # Log files for error tracking
├── server.js             # Entry point for the application
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
Key Features
Secure Token Management:

Tokens are stored in httpOnly cookies for better security.
Prevents XSS attacks by disallowing client-side access.
Rate Limiting:

Limits each IP to 100 requests per 15 minutes.
Prevents abuse and brute-force attacks.
Logging:

Tracks errors and requests using Winston.
Logs are stored in logs/app.log.
API Documentation:

Provides detailed and interactive API documentation with Swagger.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

License
This project is licensed under the MIT License.
