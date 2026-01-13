# DevGPT - AI Coding Assistant

A full-stack mobile coding assistant with React Native/Expo frontend and Node.js/LangChain backend, powered by Groq AI.

# All about this app
DevGPT is a high-performance, mobile-first AI coding assistant designed to provide developers with instant access to powerful LLMs on the go. Built with a focus on speed and developer experience, it leverages the Groq LPU™ Inference Engine to deliver lightning-fast streaming responses. The app features a sleek, dark-themed interface optimized for reading and interacting with code, making it the perfect companion for debugging, learning new frameworks, or generating boilerplate code directly from your smartphone.


## Author

**Aditya Kumar Gupta**
- 📧 Email: hello@devaditya.dev
- 🌐 Website: [devaditya.dev](https://devaditya.dev)
- 💻 GitHub: [github.com/dev-aditya-lab](https://github.com/dev-aditya-lab)

## Features Overview

### Mobile App
- 💬 FlashList-powered chat interface
- 🎨 Dark "Developer Mode" theme with NativeWind
- ✨ Syntax highlighting for code blocks
- 📋 Copy Code button on all code snippets
- 🔄 Real-time streaming AI responses
- 🤖 5 free AI models to choose from
- 🔐 Email/password authentication
- 📚 Chat history management
- 🆓 5 free trial uses before login required

### Backend
- 🚀 Express.js REST API
- 🔗 LangChain + Groq integration
- 🗄️ MongoDB database
- 🔐 JWT authentication
- 📡 Server-Sent Events for streaming

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Groq API key (free from [console.groq.com](https://console.groq.com))

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
npm run dev
```

### Mobile App Setup
```bash
cd app
npm install
# Edit src/constants/api.ts if needed
npx expo start
```

## Project Structure

```
dev-gpt/
├── backend/               # Node.js API
│   ├── src/
│   │   ├── config/       # Database & AI config
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Auth & error handling
│   │   └── index.js      # Entry point
│   └── package.json
│
└── app/                   # Expo React Native
    ├── app/              # Screens (Expo Router)
    ├── src/
    │   ├── components/   # UI components
    │   ├── hooks/        # Custom hooks
    │   ├── stores/       # Zustand state
    │   ├── services/     # API client
    │   └── constants/    # Theme & config
    └── package.json
```

## Available AI Models

| Model | ID | Description |
|-------|-----|-------------|
| Llama 3.3 70B | llama-3.3-70b-versatile | Best for complex coding |
| Llama 3.1 70B | llama-3.1-70b-versatile | Balanced performance |
| Llama 3.1 8B | llama-3.1-8b-instant | Fast responses |
| Mixtral 8x7B | mixtral-8x7b-32768 | Diverse capabilities |
| Gemma 2 9B | gemma2-9b-it | Efficient and capable |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/chat | Get all chats |
| POST | /api/chat | Create new chat |
| GET | /api/chat/:id | Get chat with messages |
| POST | /api/chat/:id/message | Send message (streaming) |
| GET | /api/models | Get available models |

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- LangChain + Groq SDK
- JWT + bcrypt

### Mobile App
- Expo SDK 52
- TypeScript
- NativeWind (TailwindCSS)
- @shopify/flash-list
- Zustand
- Expo Router

## Screenshots

Coming soon...

## Contributing

Feel free to submit issues and PRs!

## License

MIT

---

Made with ❤️ by [Aditya Kumar Gupta](https://devaditya.dev)
