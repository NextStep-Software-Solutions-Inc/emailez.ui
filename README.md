# Email EZ - Multi-Tenant Email Service

A modern, beautiful web application for Email EZ - a multi-tenant, subscription-based email sending service with configurable SMTP settings.

## 🚀 Features

- 🎨 **Beautiful Landing Page** - Modern, responsive design with gradient effects
- 📱 **Mobile-First Design** - Fully responsive with mobile navigation
- ⚡ **Dynamic Header** - Auto-hiding header with smooth scroll behavior
- 🎯 **Component Architecture** - Modular, reusable components
- 🔧 **Multi-Tenant Support** - Built for agencies and SaaS companies
- 📧 **SMTP Configuration** - Multiple email provider support
- 💳 **Subscription Management** - Flexible pricing and billing
- 🔒 **TypeScript** - Full type safety throughout
- 🎉 **TailwindCSS** - Modern utility-first styling
- 🌐 **React Router** - Client-side routing with SSR support

## 🎯 About Email EZ

Email EZ is a comprehensive email sending service designed for:

- **Agencies** managing multiple clients
- **SaaS companies** with multi-tenant needs
- **Developers** requiring reliable email infrastructure
- **Businesses** needing scalable email solutions

### Key Capabilities

- Multiple SMTP configurations per tenant
- Real-time email delivery tracking
- Subscription-based billing
- RESTful API with SDK support
- Enterprise-grade security
- 99.9% uptime guarantee

## �️ Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Routing**: React Router v7 with SSR
- **Authentication**: Clerk (integrated)
- **Fonts**: Nunito & Comfortaa (via Fontsource)
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/emailez.ui.git
cd emailez.ui
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Your application will be available at `http://localhost:5173`.

## 🏗️ Project Structure

```
emailez.ui/
├── app/                    # React Router app directory
│   ├── routes/            # Route components
│   ├── welcome/           # Landing page components
│   └── root.tsx           # Root layout
├── components/            # Reusable UI components
│   ├── Header.tsx         # Main header component
│   ├── Button.tsx         # Reusable button component
│   ├── NavigationLink.tsx # Navigation link component
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── useElementHeight.ts # Dynamic element height
│   ├── useHeaderScroll.ts  # Header scroll behavior
│   └── useClickOutside.ts  # Outside click detection
├── docs/                  # Documentation
└── public/               # Static assets
```

## 🏗️ Building for Production

Create a production build:

```bash
pnpm build
# or
npm run build
```

## 🚀 Deployment

### Docker Deployment

Build and run using Docker:

```bash
# Build the Docker image
docker build -t emailez-ui .

# Run the container
docker run -p 3000:3000 emailez-ui
```

### Platform Deployment

The containerized application can be deployed to:

- **AWS ECS** - Container orchestration
- **Google Cloud Run** - Serverless containers
- **Azure Container Apps** - Managed containers
- **Digital Ocean App Platform** - Simple deployment
- **Fly.io** - Global application platform
- **Railway** - Modern deployment platform

### DIY Deployment

For custom deployments, ensure you deploy the build output:

```
├── package.json
├── pnpm-lock.yaml (or package-lock.json)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## 🎨 Component Architecture

### Reusable Components

- **Button** - Flexible button with variants (primary, secondary, ghost)
- **NavigationLink** - Consistent navigation styling
- **MobileMenu** - Responsive mobile navigation
- **Header** - Dynamic header with scroll behavior

### Custom Hooks

- **useElementHeight** - Dynamic element height measurement
- **useHeaderScroll** - Header visibility on scroll
- **useClickOutside** - Outside click detection

## 🎯 Key Features Implemented

### Landing Page

- **Hero Section** - Eye-catching introduction with CTAs
- **Features Section** - Service highlights with icons
- **How It Works** - Step-by-step process explanation
- **Call to Action** - Final conversion section

### Header & Navigation

- **Responsive Design** - Works on all device sizes
- **Smooth Animations** - Polished user experience
- **Dynamic Height** - Content adapts to header size
- **Mobile Menu** - Clean mobile navigation

### Styling & Fonts

- **Nunito Font** - Modern, readable typography
- **Comfortaa Font** - Stylish accent font for branding
- **Gradient Effects** - Beautiful color transitions
- **Tailwind CSS** - Utility-first styling approach

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm type-check` - TypeScript type checking

### Environment Setup

1. Copy environment variables (if needed)
2. Configure Clerk authentication
3. Set up SMTP settings for email features
4. Configure database connections

## 📚 Documentation

- [Header Refactoring Guide](./docs/header-refactoring.md)
- [useElementHeight Hook](./docs/useElementHeight.md)
- [React Router v7 Docs](https://reactrouter.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React Router v7](https://reactrouter.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

Built with ❤️ for modern email infrastructure needs.
