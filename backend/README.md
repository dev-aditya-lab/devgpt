# DevGPT Backend

AI Coding Assistant Backend API built with Node.js, Express, LangChain, and MongoDB.

## Author

**Aditya Kumar Gupta**
- Email: hello@devaditya.dev
- Website: [devaditya.dev](https://devaditya.dev)
- GitHub: [github.com/dev-aditya-lab](https://github.com/dev-aditya-lab)

## Features

- 🔐 JWT Authentication (Register, Login, Logout)
- 💬 Real-time chat with AI streaming responses
- 🤖 5 Free AI models via Groq
- 📝 Chat history management
- 👤 User profile management
- 🗄️ MongoDB database

## Available AI Models

| Model | Description |
|-------|-------------|
| Llama 3.3 70B | Best for complex coding tasks |
| Llama 3.1 70B | Great balance of speed and quality |
| Llama 3.1 8B | Fast responses for simple queries |
| Mixtral 8x7B | Good for diverse coding questions |
| Gemma 2 9B | Efficient and capable |

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your:
   - `GROQ_API_KEY` - Get from [console.groq.com](https://console.groq.com)
   - `JWT_SECRET` - Strong secret key for JWT
   - `MONGODB_URI` - MongoDB connection string

3. **Start MongoDB:**
   Make sure MongoDB is running locally or use MongoDB Atlas.

4. **Run the server:**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Health
- `GET /api/health` - Health check

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/password` - Change password
- `DELETE /api/user/account` - Delete account

### Chat
- `GET /api/chat` - Get all chats
- `POST /api/chat` - Create new chat
- `GET /api/chat/:id` - Get chat with messages
- `POST /api/chat/:id/message` - Send message (streaming)
- `DELETE /api/chat/:id` - Delete chat
- `DELETE /api/chat` - Clear all chats

### Models
- `GET /api/models` - Get available AI models
- `GET /api/models/:id` - Get model details

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js    # MongoDB connection
│   │   └── ai.js          # AI models config
│   ├── middleware/
│   │   ├── auth.js        # JWT authentication
│   │   └── errorHandler.js # Error handling
│   ├── models/
│   │   ├── User.js        # User model
│   │   ├── Chat.js        # Chat model
│   │   └── Message.js     # Message model
│   ├── routes/
│   │   ├── auth.js        # Auth routes
│   │   ├── user.js        # User routes
│   │   ├── chat.js        # Chat routes
│   │   └── models.js      # Models routes
│   ├── services/
│   │   ├── ai.service.js  # LangChain + Groq
│   │   └── chat.service.js # Chat business logic
│   └── index.js           # Entry point
├── .env.example
├── package.json
└── README.md
```

## License

MIT
