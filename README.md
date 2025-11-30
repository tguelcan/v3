# AI Assistant v3

A modern AI chat assistant built with SvelteKit 5, featuring real-time streaming responses, magic link authentication, and MongoDB persistence.

## 🚀 Features

- **AI-Powered Conversations**: Real-time streaming responses using OpenAI models
- **Magic Link Authentication**: Passwordless login via Better Auth
- **Persistent Chat History**: MongoDB-backed conversation storage
- **Smart Title Generation**: Automatic chat titles using AI
- **Responsive UI**: Modern interface with TailwindCSS & DaisyUI
- **Email Integration**: Magic link delivery via Resend

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)
- OpenAI API key
- Resend API key (for magic link emails)

## 🛠️ Tech Stack

### Core
- **SvelteKit 5** - Full-stack framework with Svelte 5 Runes
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling

### AI & Streaming
- **Vercel AI SDK** - AI model integration and streaming
- **OpenAI** - Language model provider

### Authentication
- **Better Auth** - Modern authentication library
- **Magic Links** - Passwordless email authentication

### Database & Storage
- **MongoDB** - Primary database for chat persistence
- **BSON** - Cross-platform data serialization

### UI & Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Lucide Svelte** - Icon library
- **Marked** - Markdown rendering

### Development
- **Vitest** - Unit testing framework
- **Playwright** - Browser testing
- **ESLint & Prettier** - Code quality and formatting

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable Svelte components
│   ├── parts/           # Feature-specific component parts
│   ├── remotes/         # Remote function calls (form actions, queries)
│   ├── server/
│   │   ├── agents/      # AI agent helpers (title generation, etc.)
│   │   ├── auth/        # Better Auth configuration
│   │   ├── services/    # Business logic (chat CRUD operations)
│   │   ├── mongodb.ts   # MongoDB connection
│   │   ├── openai.ts    # OpenAI client setup
│   │   └── resend.ts    # Email service setup
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
│
├── routes/
│   ├── (app)/           # Protected application routes
│   │   ├── [[chatId]]/  # Chat interface (optional chat parameter)
│   │   └── settings/    # User settings page
│   └── (auth)/          # Authentication routes
│       └── login/       # Login page with magic link form
│
├── app.html             # HTML template
├── app.d.ts             # TypeScript declarations
└── hooks.server.ts      # Server-side request hooks (auth, logging)
```

## 🚦 Getting Started

### 1. Clone & Install

```bash
git clone <repository-url>
cd v3
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/assistant

# OpenAI
OPENAI_API_KEY=sk-...

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5173

# Resend (for magic link emails)
RESEND_API_KEY=re_...
```

### 3. Development

```bash
# Start development server
npm run dev

# Open in browser
npm run dev -- --open
```

Visit `http://localhost:5173` to see the application.

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run all tests (CI mode)
npm test
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run check` - Type-check the project
- `npm run check:watch` - Type-check in watch mode
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint and Prettier
- `npm test` - Run tests

## 🔑 Key Concepts

### Remote Functions

The `/lib/remotes` directory contains server-side form actions and queries that can be called from client components:

- `auth.remote.ts` - Authentication (magic link, session retrieval)
- `chat.remote.ts` - Chat operations (navigation, chat list)

### Authentication Flow

1. User enters email on login page
2. Magic link sent via Resend
3. User clicks link in email
4. Session established via Better Auth
5. User redirected to chat interface

### Chat Flow

1. User sends message to `/[[chatId]]` endpoint
2. Message streamed to OpenAI via AI SDK
3. Response streamed back to client in real-time
4. Conversation saved to MongoDB
5. Title auto-generated for new chats (first 2 messages)

### Session Management

- Better Auth handles session cookies
- Sessions cached in Redis for performance
- `hooks.server.ts` makes session available in `event.locals`
- Protected routes check session and redirect if needed

## 🎨 UI Components

The app uses a combination of custom components and DaisyUI:

- Custom chat interface with streaming message display
- Markdown rendering for AI responses
- Sidebar with recent chats
- Responsive design for mobile and desktop

## 🔒 Security

- Magic link authentication (no passwords stored)
- Session-based authorization
- Protected API endpoints with session validation
- CSRF protection via Better Auth

## 📚 Documentation

Key files have inline JSDoc documentation explaining:
- Function parameters and return values
- Flow diagrams for complex operations
- Use cases and examples

## 🚀 Deployment

The app can be deployed to any Node.js hosting platform:

1. Ensure all environment variables are set
2. Run `npm run build`
3. Deploy the `build` directory
4. Configure your MongoDB and Redis instances
5. Update `BETTER_AUTH_URL` to your production URL

> **Note**: You may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your specific deployment target (Vercel, Netlify, etc.)

## 📝 License

Private project

## 🤝 Contributing

This is a private project. Contact the maintainer for contribution guidelines.

---

Built with ❤️ using SvelteKit 5 and the Vercel AI SDK
