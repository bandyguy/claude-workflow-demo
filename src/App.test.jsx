import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
