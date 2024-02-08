import logo from './logo.svg';
import './App.css';
import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import * as _ from "@sentry/tracing"
import { setTag } from '@sentry/react';

const person = { email: "john.doe@example.com" };

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the only code that keeps me sane.
        </p>
        <br></br>
        <button onClick={throwError}>Throw error</button>
        <br></br>
        <button onClick={throwTransaction}>Throw transaction</button>
        <br></br>
        <button onClick={captureAMessage}>Capture message</button>
        <br></br>
        <button onClick={consoleError}>console.error</button>
        <br></br>
        <button onClick={apiCall}>apiCall</button>
        <br></br>
        <button onClick={sendUF}>Send User Feedback</button>
        {/* <iframe src="vercel-4dc70srcl-dragonfruit-vercel-team.vercel.app"></iframe> */}
        {/* <button onClick={() => methodDoesNotExist()}>Break the world</button> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={throwError}>Throw error</button>
        <br></br>
      </header>
    </div>
  );
}

const throwError = () => {
  // Sentry.setContext("character", {
  //   name: "Mighty Fighter",
  //   age: 3509081878412981057,
  //   attack_type: "melee",
  // });
  setTag("color", "red");
  // Sentry.setUser({ email: "john.doe@example.com", mycustomid: "123" });
  // Sentry.setContext("character", {
  //   name: "Mighty Fighter",
  //   age: 19,
  //   attack_type: "melee",
  // });
  // const parentError = new Error("parent", { cause: Error("child") });
  // Sentry.captureException(parentError);
  Sentry.withScope(scope => {
    scope.setTag("my-tag", "my value");
    Sentry.captureException("Boo");

  });
};

const throwTransaction = () => {
  const transaction = Sentry.startTransaction({ name: "test-transaction" });
  const span = transaction.startChild({ op: "functionX" }); // This function returns a Span
  // functionCallX
  span.finish(); // Remember that only finished spans will be sent with the transaction
  transaction.finish(); // Finishing the transaction will send it to Sentry
};

const captureAMessage = () => {
  Sentry.captureMessage("*Simon says go left");
};

const consoleError = () => {
  try {
    throw new Error("Whoops!");
  } catch (e) {
    console.log(e);
  }
  // console.error("You made a mistake");
}

const apiCall = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      return response.json()
    })
};

const sendUF = () => {
  const eventId = Sentry.captureMessage("User Feedback");
  // OR: const eventId = Sentry.lastEventId();

  const userFeedback = {
    event_id: eventId,
    name: "John Doe",
    email: "john@doe.com",
    comments: "I really like your App, thanks!",
  };
  Sentry.captureUserFeedback(userFeedback);
};

export default App;
