# Claude Workflow Demo

A React frontend web application demonstrating automated workflows with Claude Code.

## Overview

This is a simple React application built with Vite that serves as a demonstration project for GitHub Actions integration with Claude Code.

## Features

- React 18 with Vite for fast development
- Automated testing with Vitest and React Testing Library
- GitHub Actions CI/CD pipeline
- Nix development environment

## Prerequisites

- Node.js 20 or higher
- npm or yarn

Alternatively, use Nix for a reproducible development environment:

```bash
nix-shell
```

## Getting Started

### Installation

```bash
npm install
```

**Note on package-lock.json**: This file is committed to version control because:
- Our CI uses `npm ci` which requires it
- It ensures reproducible builds across all environments
- This follows npm best practices for applications

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Formatting

This project uses Prettier for code formatting.

- **Format code**:

  ```bash
  npm run format
  ```

- **Check formatting (used in CI or pre-commit hooks)**:

  ```bash
  npm run format:check
  ```

## Project Structure

```
.
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── App.test.jsx     # Application tests
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── test/
│       └── setup.js     # Test setup and configuration
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies and scripts
└── default.nix          # Nix development environment
```

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Test Workflow**: Runs tests and builds on every push and pull request to main
- **Claude Code Workflow**: Enables automated code assistance via @claude mentions

## Technologies

- **React**: UI library
- **Vite**: Build tool and development server
- **Vitest**: Testing framework
- **React Testing Library**: React component testing utilities
- **Nix**: Reproducible development environment

## License

MIT
