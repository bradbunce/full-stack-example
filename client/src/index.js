import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

(async () => {
  const LD_CLIENTSIDE_ID = process.env.REACT_APP_LD_CLIENTSIDE_ID;
  console.log(LD_CLIENTSIDE_ID);
  const LDProvider = await asyncWithLDProvider({
    clientSideID: LD_CLIENTSIDE_ID,
    context: {
      "kind": "user",
      "key": "user-key-123abc",
      "name": "Brad Bunce",
      "email": "brad@launchdarkly.com"
    },
    options: {
      streaming: true
    }
  });
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <LDProvider>
      <App />
    </LDProvider>,
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
