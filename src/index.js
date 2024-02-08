import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as Sentry from "@sentry/react";
import { Feedback } from '@sentry-internal/feedback';
// import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
// import { RewriteFrames } from "@sentry/integrations";

// const enableSessionReplay = 1;

Sentry.init({
    dsn: "https://eda97ba5aed24b5a89a62b5e903bf6ac@o1420511.ingest.sentry.io/4504179109068800",
    integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
            networkDetailAllowUrls: [window.location.origin],
            // beforeAddRecordingEvent: (event) => {
            //     console.log(event);
            //     return event;
            // }
        }),
        // new CaptureConsoleIntegration(
        //     {
        //         // array of methods that should be captured
        //         // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
        //         levels: ['error'],
        //     }
        // )
        new Feedback({
            // Additional SDK configuration goes in here, for example:
            // See below for all available options
        }),
    ],
    //integrations: [new BrowserTracing()],
    environment: "example",
    tracesSampleRate: 1.0,
    release: "githubactions@4.0.0",
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
        // event.release = "beforesend@1.0.0";
        console.log(event);
        // if (event.exception) {
        //     Sentry.showReportDialog({ eventId: event.event_id });
        // }
        //event.exception.values.reverse();
        // for (let i in event.exception.values[0].stacktrace.frames) {
        //     if (event.exception.values[0].stacktrace.frames[i].filename.match(/bundle/g))
        //         return null;
        // }
        // if (event.exception.values[0].type === "Error") {
        //     event.extra.GrootName = "Johnny"
        //     console.log(event);
        // };
        // for (let i in event.breadcrumbs) {
        //     if (event.breadcrumbs[i].message.match(/body/g))
        //         return null;
        // }
        // if (event.exception.values[0].value.match(/oo/g))
        //     return null;
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
    // ignoreErrors: ["Test error!"],

    // integrations: [new RewriteFrames(
    //     {
    //         iteratee: (frame) => "app:///" + frame.filename,
    //     }
    // )],
    sendDefaultPii: false,

    // tracesSampler: samplingContext => {
    //     if (samplingContext.transactionContext.name.match(/\//)) {
    //         samplingContext.transactionContext.name = "something else";
    //         //samplingContext.location.pathname = "something else";
    //         console.log(samplingContext)
    //         return 1;
    //     } else {
    //         console.log(samplingContext.transactionContext)
    //         return 1;
    //     }
    // },
    beforeSendTransaction(event) {
        console.log(event);
        if (event.transaction.match(/\//)) {
            event.transaction = "something else";
        }
        return event;
    }
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
