import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as Sentry from "@sentry/react";
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";

const enableSessionReplay = 1;


Sentry.init({
    dsn: "https://eda97ba5aed24b5a89a62b5e903bf6ac@o1420511.ingest.sentry.io/4504179109068800",
    integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({}),
        // new CaptureConsoleIntegration(
        //     {
        //         // array of methods that should be captured
        //         // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
        //         levels: ['error'],
        //     }
        // )
    ],
    //integrations: [new BrowserTracing()],
    environment: "production",
    tracesSampleRate: 1.0,
    release: "githubactions@1.0.0",
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
        //-----------------------------------------
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
        // console.log(event.exception.values[0].type)
        // event.exception.values[0].type = event.user.email;
        // console.log(event.exception.values[0].type)
        console.log(event);
        // if (event.request.url === 'http://localhost:3000/')
        //     event.exception.values[0].type = "This came from localhost:3000!";
        return event;
    },
    // beforeSendTransaction(event) {
    //     console.log(event);
    //     return event;
    // },
    // initialScope: scope => {
    //     scope.setTags({ color: "blue" });
    //     return scope;
    // },
    autoSessionTracking: true,
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.0,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
