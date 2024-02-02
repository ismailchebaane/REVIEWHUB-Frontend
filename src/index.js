import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './components/AuthContext/AuthContext';
import {Provider} from 'react-redux';
import store from "./components/redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store} >
  
    <App />
    </Provider>
    </AuthContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
