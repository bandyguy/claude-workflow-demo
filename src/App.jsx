import { useCallback, useEffect, useState } from 'react';
import './App.css';

const THEME_STORAGE_KEY = 'claude-workflow-demo:theme';

const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark'];

const VIEWS = {
  HOME: 'home',
  SETTINGS: 'settings',
};

function getPreferredTheme() {
  try {
    const stored = window.localStorage?.getItem(THEME_STORAGE_KEY);
    if (stored && THEMES.includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available (private browsing, SSR, etc.)
  }

  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)'
  ).matches;
  if (prefersDark) {
    return 'dark';
  }

  return 'light';
}

function App() {
  const [theme, setTheme] = useState(() => getPreferredTheme());
  const [view, setView] = useState(VIEWS.HOME);

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage not available - theme still works, just won't persist
    }
  }, [theme]);

  const handleThemeChange = useCallback(event => {
    const newTheme = event.target.value;
    if (THEMES.includes(newTheme)) {
      setTheme(newTheme);
    }
  }, []);

  return (
    <div className={`App theme-${theme}`}>
      <header className="App-header">
        <nav className="App-nav">
          <div className="App-title">Claude Workflow Demo</div>
          <div className="App-nav-links">
            <button
              type="button"
              className={
                view === VIEWS.HOME ? 'App-nav-link is-active' : 'App-nav-link'
              }
              onClick={() => setView(VIEWS.HOME)}
            >
              Home
            </button>
            <button
              type="button"
              className={
                view === VIEWS.SETTINGS
                  ? 'App-nav-link is-active'
                  : 'App-nav-link'
              }
              onClick={() => setView(VIEWS.SETTINGS)}
            >
              Settings
            </button>
          </div>
        </nav>
      </header>
      <main>
        {view === VIEWS.HOME && (
          <>
            <h1>Hello World</h1>
            <p>Welcome to Claude Workflow Demo!</p>
          </>
        )}
        {view === VIEWS.SETTINGS && (
          <section aria-label="Theme settings" className="Settings">
            <h1>Settings</h1>
            <div className="Settings-group">
              <h2>Theme</h2>
              <p>
                Select your preferred theme. This will be saved on this device.
              </p>
              <div className="Settings-theme-options">
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === 'light'}
                    onChange={handleThemeChange}
                  />
                  Light
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={handleThemeChange}
                  />
                  Dark
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="solarized-light"
                    checked={theme === 'solarized-light'}
                    onChange={handleThemeChange}
                  />
                  Solarized Light
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="solarized-dark"
                    checked={theme === 'solarized-dark'}
                    onChange={handleThemeChange}
                  />
                  Solarized Dark
                </label>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
