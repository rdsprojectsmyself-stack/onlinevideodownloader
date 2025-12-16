# Universal Video Downloader

A modern, feature-rich video downloader application built with React, Vite, and Firebase.

## Features

- 🎥 Download videos from multiple platforms (YouTube, Instagram, TikTok, Facebook, etc.)
- 🔐 Google Authentication & Email/Password login
- 🎨 Modern glassmorphism UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Vite
- 🎵 Multiple format support (MP4, MP3, AAC)
- ✂️ Audio trimming feature

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Authentication enabled

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd universal-video-downloader/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

## Environment Variables

Make sure to add these environment variables in your deployment platform:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Project Structure

```
frontend/
├── public/              # Static assets
│   ├── background.png   # Background image
│   └── favicon.png      # Favicon
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # UI components (button, input, card, etc.)
│   │   └── DownloadOptions.jsx
│   ├── lib/            # Utility functions
│   ├── App.jsx         # Main app component
│   ├── firebase.js     # Firebase configuration
│   └── main.jsx        # Entry point
├── assets/
│   └── css/
│       └── styles.css  # Global styles
└── package.json
```

## License

MIT

## Author

RDS Factory

---

Made with ❤️ using React + Vite
