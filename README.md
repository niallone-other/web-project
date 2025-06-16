# The Portal

A Rick and Morty character explorer built with Next.js 15, TypeScript, and GraphQL.

## Tech Stack

- **Framework**: Next.js 15.3 (App Router)
- **Language**: TypeScript
- **Styling**: Chakra UI v3
- **Data Fetching**: Apollo Client with GraphQL
- **State Management**: React Context API
- **Authentication**: Local storage persistence

## Features

- Browse Rick and Morty characters with pagination
- View detailed character information including episodes
- User authentication with persistent sessions
- Edit user profile
- Dark themed UI with Portal branding
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd web-project

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (auth)/         # Protected routes
│   └── auth/           # Public auth page
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── character/     # Character display components
│   ├── common/        # Shared components
│   └── user/          # User profile components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configuration
│   ├── apollo/        # GraphQL client setup
│   ├── constants/     # App constants
│   └── theme/         # Chakra UI theme
├── providers/         # React context providers
└── types/             # TypeScript type definitions
```

## API

The application uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) for character data.