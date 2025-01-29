import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { google_client_id } from '../keys';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={google_client_id}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);
