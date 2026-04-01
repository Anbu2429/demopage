import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b8d4',
    },
    secondary: {
      main: '#76ff03',
    },
    background: {
      default: '#0b1020',
      paper: '#121a2f',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-jgftvhmp83ujgcy2.us.auth0.com"
      clientId="rwnueAw8JAp6tJuQGyDZ6YLROdWTKB9e"
      authorizationParams={{
        redirect_uri:"https://anbu2429.github.io/demopage"
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);