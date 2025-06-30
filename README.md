# JHN TTS Frontend

> Retro 80s synthwave text-to-speech frontend powered by Piper TTS

## 🎮 Features

- **Retro Aesthetics**: 80s synthwave design with neon glows and pixel fonts
- **High-Quality TTS**: Powered by Piper TTS with natural-sounding voices
- **Responsive UI**: Works on desktop and mobile devices
- **Real-time Synthesis**: Fast audio generation and playback
- **Text Normalization**: Automatic text cleaning and optimization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Backend: [JHN TTS Backend](../jhn-tts-desktop-app-backend) running on port 9452

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Configuration

The frontend expects the TTS backend to be running on `localhost:9452`. The Vite proxy automatically forwards `/api/*` requests to the backend.

## 🎨 Design

- **Color Palette**: Dark purple gradients with cyan, magenta, and gold accents
- **Typography**: Press Start 2P pixel font for authentic retro feel
- **Effects**: Neon glows, smooth transitions, and hover animations
- **Layout**: Centered card design with synthwave aesthetic

## 🛠️ Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Piper TTS** - High-quality neural text-to-speech

## 📁 Project Structure

```
├── App.tsx           # Main application component
├── index.tsx         # React app entry point
├── index.html        # HTML template with fonts and styles
├── vite.config.ts    # Vite configuration with proxy
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

## 🎯 Usage

1. Open the app in your browser
2. Type or paste text in the message field
3. Click "Speak Text" to synthesize speech
4. Use "Stop Speaking" to halt playback

## 🔧 Development

The app uses the default "Alba Medium" English voice from the backend. Voice selection was removed for simplicity and better UX.

### Proxy Configuration

API calls are proxied through Vite:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:9452`
- Proxy: `/api/*` → backend root

## 📝 License

MIT © JHN

---

*Part of the JHN TTS project suite - bringing retro vibes to modern text-to-speech technology* 🎮✨
