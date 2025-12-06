import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  // Clear localStorage before each test
  window.localStorage.clear();
  // Reset matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
});

describe('App', () => {
  it('renders hello world heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /hello world/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<App />);
    const welcomeText = screen.getByText(/welcome to claude workflow demo/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('has a main landmark for accessibility', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('shows navigation with Home and Settings buttons', () => {
    render(<App />);

    const homeButton = screen.getByRole('button', { name: /home/i });
    const settingsButton = screen.getByRole('button', { name: /settings/i });

    expect(homeButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('shows theme options on the settings view', () => {
    render(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(settingsButton);

    const light = screen.getByRole('radio', { name: /^light$/i });
    const dark = screen.getByRole('radio', { name: /^dark$/i });
    const solarizedLight = screen.getByRole('radio', {
      name: /solarized light/i,
    });
    const solarizedDark = screen.getByRole('radio', {
      name: /solarized dark/i,
    });

    expect(light).toBeInTheDocument();
    expect(dark).toBeInTheDocument();
    expect(solarizedLight).toBeInTheDocument();
    expect(solarizedDark).toBeInTheDocument();
  });

  it('updates the theme class when selecting a different theme', () => {
    render(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(settingsButton);

    const solarizedDark = screen.getByRole('radio', {
      name: /solarized dark/i,
    });
    fireEvent.click(solarizedDark);

    const root = document.querySelector('.App');
    expect(root.className).toContain('theme-solarized-dark');
  });

  it('persists theme selection to localStorage', () => {
    render(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(settingsButton);

    const darkTheme = screen.getByRole('radio', { name: /^dark$/i });
    fireEvent.click(darkTheme);

    expect(window.localStorage.getItem('claude-workflow-demo:theme')).toBe(
      'dark'
    );
  });

  it('loads theme from localStorage on initial render', () => {
    window.localStorage.setItem(
      'claude-workflow-demo:theme',
      'solarized-light'
    );

    render(<App />);

    const root = document.querySelector('.App');
    expect(root.className).toContain('theme-solarized-light');
  });

  it('uses system preference when no stored theme', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    render(<App />);

    const root = document.querySelector('.App');
    expect(root.className).toContain('theme-dark');
  });

  it('defaults to light theme when no stored theme and no dark mode preference', () => {
    render(<App />);

    const root = document.querySelector('.App');
    expect(root.className).toContain('theme-light');
  });

  it('handles localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => {
      throw new Error('localStorage not available');
    };

    render(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(settingsButton);

    const darkTheme = screen.getByRole('radio', { name: /^dark$/i });
    fireEvent.click(darkTheme);

    // Should still update the theme class even if localStorage fails
    const root = document.querySelector('.App');
    expect(root.className).toContain('theme-dark');

    // Restore original function
    window.localStorage.setItem = originalSetItem;
  });
});
