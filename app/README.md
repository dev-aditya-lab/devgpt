# DevGPT Mobile App

AI-powered coding assistant built with React Native, Expo, and NativeWind.

## Author

**Aditya Kumar Gupta**
- Email: hello@devaditya.dev
- Website: [devaditya.dev](https://devaditya.dev)
- GitHub: [github.com/dev-aditya-lab](https://github.com/dev-aditya-lab)

## Features

- 💬 **FlashList Chat Interface** - High-performance virtualized message list
- 🎨 **Dark Developer Theme** - Beautiful dark mode with NativeWind (Tailwind)
- ✨ **Syntax Highlighting** - Code blocks with syntax coloring
- 📋 **Copy Code Button** - One-tap code copying to clipboard
- 🔄 **Streaming Responses** - Real-time AI responses with token streaming
- 🤖 **5 Free AI Models** - Choose from Llama, Mixtral, and Gemma
- 🔐 **Authentication** - Email/password login with JWT
- 📚 **Chat History** - Persistent conversation storage
- 🆓 **Trial Mode** - 5 free uses before login required

## Tech Stack

- **Framework**: Expo SDK 52
- **Language**: TypeScript
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: Expo Router
- **List**: @shopify/flash-list
- **State**: Zustand
- **Icons**: @expo/vector-icons

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API URL:**
   Edit `src/constants/api.ts` and set your backend URL:
   ```typescript
   export const API_BASE_URL = 'http://localhost:3001/api';
   
   // For Android emulator:
   // export const API_BASE_URL = 'http://10.0.2.2:3001/api';
   
   // For physical device, use your computer's IP:
   // export const API_BASE_URL = 'http://192.168.x.x:3001/api';
   ```

3. **Start the app:**
   ```bash
   npx expo start
   ```

4. **Run on device:**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web
   - Scan QR code with Expo Go app

## Project Structure

```
app/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Auth screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/            # Tab screens
│   │   ├── index.tsx      # Chat
│   │   ├── history.tsx    # History
│   │   └── profile.tsx    # Profile
│   ├── _layout.tsx        # Root layout
│   └── about.tsx          # About screen
├── src/
│   ├── components/
│   │   ├── chat/          # Chat components
│   │   ├── ui/            # UI components
│   │   └── common/        # Shared components
│   ├── hooks/             # Custom hooks
│   ├── stores/            # Zustand stores
│   ├── services/          # API services
│   ├── constants/         # App constants
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── assets/                # Static assets
├── app.json               # Expo config
├── tailwind.config.js     # Tailwind config
└── package.json
```

## Available AI Models

| Model | Provider | Description |
|-------|----------|-------------|
| Llama 3.3 70B | Meta | Best for complex tasks |
| Llama 3.1 70B | Meta | Balanced performance |
| Llama 3.1 8B | Meta | Fast responses |
| Mixtral 8x7B | Mistral | Diverse capabilities |
| Gemma 2 9B | Google | Efficient and capable |

## License

MIT
