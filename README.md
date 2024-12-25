# 🌐 InstiX Backend API
Welcome to the InstiX Backend API, the core backend service for a campus-specific social media platform. This API handles user authentication, post management, and other advanced backend functionalities.

## ✨ Features
### 🔒 Secure Authentication:
- User registration and login with hashed passwords (`bcrypt`).
- Token-based authentication using JWT with `httpOnly` cookies for security.

### 📝 Post Management:
- Create, read, update, and delete posts tied to authenticated users.

### 🚀 Advanced Features:
- Rate limiting to prevent API abuse.
- Comprehensive API documentation via Swagger UI.
- Logging with `Winston` for error tracking and monitoring.

### 🛡️ Security Enhancements:
- Data validation for inputs.
- Cross-Origin Resource Sharing (CORS) support.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: Swagger UI
- **Logging**: Winston

## 🚀 Getting Started
### 1. Prerequisites
Ensure you have the following installed:
- 🟢 Node.js (v14+)
- 🟢 MongoDB (Local or Atlas)
- 🟢 Git

### 2. Installation
#### Clone the Repository:
```bash
git clone https://github.com/TYSONKODA8484/backend-api.git
cd backend-api
```

#### Install Dependencies:
```bash
npm install
```

#### Set Up Environment Variables:
Create a `.env` file in the root directory with the following:
```
PORT=3000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

#### Run the Server:
```bash
npm start
```

#### Access the APIs:
- **Base URL**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3000/api-docs`

## 📚 API Endpoints
### 🔑 Authentication
| Method | Endpoint              | Description                  | Auth Required |
|--------|-----------------------|------------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user          | ❌            |
| POST   | `/api/auth/login`    | Login and obtain a token     | ❌            |
| GET    | `/api/auth/profile`  | Get profile of logged user   | ✅            |

### 📝 Posts
| Method | Endpoint              | Description                  | Auth Required |
|--------|-----------------------|------------------------------|---------------|
| POST   | `/api/posts`         | Create a new post            | ✅            |
| GET    | `/api/posts`         | Get all posts                | ❌            |

## 🛡️ Key Features
### Secure Token Management:
- Tokens are stored in `httpOnly` cookies, enhancing security against XSS attacks.

### Rate Limiting:
- Limits users to 100 requests per 15 minutes to prevent abuse.

### Detailed API Documentation:
- Built with Swagger for easy testing and understanding of endpoints.
- Visit `/api-docs` to explore all available APIs.

### Robust Logging:
- `Winston` is used to log errors and requests for easy debugging and tracking.

## 🗂️ Project Structure
```
backend-api/
├── config/               # Configuration files (DB, Swagger, etc.)
├── controllers/          # API request handlers
├── middlewares/          # Custom middleware (Auth, Rate Limiting, etc.)
├── models/               # Database models (User, Post)
├── routes/               # API route definitions
├── logs/                 # Log files for error tracking
├── server.js             # Entry point for the server
└── README.md             # Project documentation
```

## 📖 API Documentation
Interactive API documentation is available via Swagger UI. Access it by visiting:

🌐 [Swagger Docs](http://localhost:3000/api-docs)

## 🤝 Contributing
We welcome contributions! To get started:
1. Fork this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## 🛡️ License
This project is licensed under the MIT License.
