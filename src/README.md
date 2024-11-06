# Papori Chat 🎄✨

A magical Christmas chat interface featuring an AI-powered elf named Papori who can chat and generate images.

## Features

- 💬 Real-time chat with an AI Christmas elf
- 🎨 Image generation with Recraft AI
- 🇵🇹 Portuguese (PT) language support
- 🎅 Christmas-themed interface
- 📱 Responsive design

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- OpenAI API (GPT-3.5 Turbo)
- Replicate API (Recraft AI)
- Lucide React Icons

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- OpenAI API key
- Replicate API token

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/papori-chat.git
cd papori-chat

Install dependencies:

bashCopynpm install

Create a .env.local file in the root directory and add your API keys:

CopyOPENAI_API_KEY=your_openai_key_here
REPLICATE_API_TOKEN=your_replicate_token_here

Run the development server:

bashCopynpm run dev

Open http://localhost:3000 in your browser

Usage

Start a conversation with Papori by typing in the chat box
Generate images by:

Clicking the camera button, or
Starting your message with "desenha" (e.g., "desenha um duende de natal")


Press Enter to send messages
Images will be generated using Recraft AI

Project Structure
Copysrc/
├── components/
│   └── ChatInterface.js
├── pages/
│   ├── api/
│   │   ├── chat.js
│   │   └── generate-image.js
│   ├── _app.js
│   └── index.js
└── styles/
    └── global.css
Environment Variables

OPENAI_API_KEY: Your OpenAI API key
REPLICATE_API_TOKEN: Your Replicate API token

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Known Issues

Image generation might take up to 30 seconds
API rate limits apply based on your API key restrictions

Roadmap

 Add authentication
 Implement message history
 Add more personalization options
 Support for more languages
 Voice interactions

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

OpenAI for the chat capabilities
Replicate for image generation
The Next.js team for the amazing framework
All contributors who helped shape this project

Support
For support, email rlealz.business.dev@gmail.com or open an issue in the repository.