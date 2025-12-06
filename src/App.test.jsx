import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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
});
