# Django Security Project Frontend

A modern Next.js frontend application for managing books, featuring secure communication with a Django backend using AES encryption and HMAC authentication.

## Features

- 📚 Book management system with CRUD operations
- 🔐 Secure API communication with encryption
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Fast development with Turbopack

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Axios](https://axios-http.com/) - HTTP client
- [Crypto-JS](https://github.com/brix/crypto-js) - Encryption utilities
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Prerequisites

- Node.js (version ^18.18.0 || ^19.8.0 || >= 20.0.0)
- npm, yarn, pnpm, or bun

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd django_security_project_frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env` file in the root directory (optional):
```env
# Example environment variables
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.js        # Root layout component
│   ├── page.js          # Home page component
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── AddBookModal.jsx # Book creation modal
│   ├── BookCard.jsx     # Book display component
│   └── Button.jsx       # Reusable button component
├── utils/              # Utility functions
│   ├── api.js          # API communication
│   └── security.js     # Encryption utilities
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Starts development server with Turbopack
- `npm run build` - Creates production build
- `npm run start` - Starts production server
- `npm run lint` - Runs linter

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

