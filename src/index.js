import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as Sentry from "@sentry/react";
//import { BrowserTracing } from "@sentry/tracing";
import * as _ from "@sentry/tracing"

Sentry.init({
  dsn: "https://f130065f5141469ead102fad6a9f4309@o1420511.ingest.sentry.io/4504536789024768",
  //integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  // initialScope: {
  //   tags: {
  //     "my-tag": "my value",
  //     "owners": "@azorathewolf"
  //   },
  //   user: { id: 42, email: "john.doe@example.com" },
  // },
  // environment: "normal test",
  // release: "react@2.7",
  debug: true,
  // beforeBreadcrumb(breadcrumb, hint) {
  //   console.log(breadcrumb);
  // },
  beforeSend(event) {
    //   const error = hint.originalException;
    //   if (
    //     error &&
    //     error.message &&
    //     error.message.match(/prototype/i)
    //   ) {
    //     return null;
    //   }
    //   else return event;
    //-----------------------------------------
    // if (event.request.cookies) delete event.request.cookies;
    // return event;
    //-----------------------------------------
    console.log(event.exception.values[0].type)
    event.exception.values[0].type = event.user.email;
    console.log(event.exception.values[0].type)
    return event;
  },
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
