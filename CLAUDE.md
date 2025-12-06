# Claude Code Guidelines

This document provides guidelines for Claude Code when working with this repository.

## Project Overview

This is a React frontend web application built with Vite. It serves as a demonstration project for automated workflows with Claude Code integration via GitHub Actions.

## Development Environment

### Prerequisites

- Node.js 20 (managed via Nix or installed directly)
- npm for package management

### Setup

After checking out the repository:

```bash
npm install
```

### Running the Application

```bash
npm run dev     # Start development server
npm test        # Run tests
npm run build   # Build for production
```

## Code Standards

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Write tests for all components using Vitest and React Testing Library

### Testing

- All new components should have corresponding test files
- Tests should be placed alongside the component files with `.test.jsx` extension
- Use React Testing Library for component tests
- Aim for meaningful test coverage focusing on user behavior

### Git Workflow

- Create feature branches from `main`
- Write clear, descriptive commit messages
- Ensure all tests pass before creating pull requests
- Keep commits focused and atomic
- **Always commit `package-lock.json`**: This file must be committed to ensure reproducible builds (required by CI's `npm ci` command)

## File Structure

- `src/` - Application source code
  - Components go in `src/` or subdirectories
  - Tests use `.test.jsx` extension
  - Test setup in `src/test/`
- `index.html` - HTML entry point
- `vite.config.js` - Vite configuration
- `package.json` - Dependencies and scripts

## When Making Changes

1. **Installing Dependencies**: If adding new npm packages, update `package.json` and ensure they're documented in README if significant
2. **Adding Components**: Create the component file and corresponding test file
3. **Modifying Build Process**: Update `vite.config.js` and document changes
4. **Environment Changes**: Update `default.nix` if adding system-level dependencies

## CI/CD

GitHub Actions workflows are configured for:
- **Testing**: Runs on all pushes and PRs to main
- **Claude Code**: Triggered by @claude mentions

Ensure all tests pass locally before pushing changes.

## Common Tasks

### Adding a New Component

1. Create component file in `src/`
2. Create corresponding test file
3. Import and use in `App.jsx` or parent component
4. Verify tests pass with `npm test`

### Updating Dependencies

1. Modify `package.json`
2. Run `npm install`
3. Commit the updated `package-lock.json` (always commit this file)
4. Test the application thoroughly
5. Update README if the change affects users

### Debugging

- Check browser console for runtime errors
- Use React DevTools for component inspection
- Run `npm run dev` for detailed error messages
- Check test output with `npm test` for test failures
