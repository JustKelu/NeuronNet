# 🤖 NeuroNet App

A sleek, real-time AI chat application with streaming responses powered by Groq AI. Built with React and Express.

![NeuroNet Demo](https://i.imgur.com/8vTEpM6.png)

## ✨ Features

- 🚀 **Real-time streaming** - See AI responses as they're generated
- 🎯 **Multiple AI models** - Switch between Groq, Llama, and GPT models
- 💅 **Beautiful UI** - Dark theme with syntax highlighting for code blocks
- 📱 **Responsive design** - Works seamlessly on all devices
- ⚡ **Blazing fast** - Powered by Groq's lightning-fast inference

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TanStack Query** - Data fetching & caching
- **React Hook Form** - Form management
- **Tailwind CSS** - Styling
- **Prism** - Syntax highlighting

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Groq API** - AI model provider
- **Server-Sent Events (SSE)** - Real-time streaming

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API key ([Get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/JustKelu/NeuronNet.git
cd NeuroNet
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```env
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3000
```

4. **Run the application**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

5. **Open your browser**
```
http://localhost:5173/
```

## 📸 Screenshots

### Chat Interface
![Chat Interface](https://i.imgur.com/9tsYShV.png)

### Model Selection
![Model Selection](https://i.imgur.com/fO78PAU.png)

### Code Highlighting
![Code Highlighting](https://i.imgur.com/S0gAMP6.png)

## 🎯 Available Models

| Model | Description | Speed |
|-------|-------------|-------|
| **Groq Compound** | Balanced performance | ⚡⚡⚡ |
| **Llama 3.1 8B** | Fast & efficient | ⚡⚡⚡⚡ |
| **GPT OSS 120B** | Most capable | ⚡⚡ |

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `GROQ_API_KEY` | Your Groq API key | Yes |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | No (default: http://localhost:3000) |

## 📝 API Endpoints

### POST `/api/ai/chat/:model`

Stream AI responses in real-time.

**Parameters:**
- `model` (path) - AI model to use: `groq`, `llama`, or `gpt`

**Body:**
```json
{
  "prompt": "Your message here"
}
```

**Response:**
Server-Sent Events stream with JSON chunks:
```
data: {"content": "Hello"}
data: {"content": " world"}
data: [DONE]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

JustKelu - [@Linkedin](https://www.linkedin.com/in/luca-oliva-dev/) - luca.oliva.dev@gmail.com

Project Link: [https://github.com/JustKelu/NeuronNet](https://github.com/JustKelu/NeuronNet)

---

⭐ Star this repo if you find it helpful!