# CFU Counter Frontend

A web application for counting *Staphylococcus aureus* bacterial colonies from agar plate photographs using deep learning.

## Features

- **Agar Plate Upload**: Drag-and-drop or file browser upload supporting PNG, JPG, and TIFF formats.
- **AI Colony Enumeration**: Automated colony counting and visualization via backend deep learning service.
- **Inspection Metrics**: Displays total colony-forming units (CFU), model confidence, and inference processing time.

## Tech Stack

- **Framework**: React 19
- **Bundler & Tooling**: Vite 8 with React Compiler
- **Language**: TypeScript
- **Styling**: CSS Modules
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or compatible package manager

### Environment Setup

Copy the example environment configuration:

```bash
cp .env.example .env
```

Set the backend API URL in `.env`:

```env
VITE_BASE_URL=http://localhost:8000
```

### Installation

```bash
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

### Production Build

Check types and build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code Quality & Linting

```bash
# Run ESLint
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Run TypeScript type check
npm run typecheck
```
