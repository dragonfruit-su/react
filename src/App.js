import logo from './logo.svg';
import './App.css';
import * as Sentry from "@sentry/browser";
import React from "react";
import * as _ from "@sentry/tracing"
import { setTag } from '@sentry/react';

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
        {/* <iframe src="vercel-4dc70srcl-dragonfruit-vercel-team.vercel.app"></iframe> */}
        {/* <button onClick={() => methodDoesNotExist()}>Break the world</button> */}
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
  setTag("color", "red")
  Sentry.setUser({ email: "john.doe@example.com" });

  throw Error("peekaboo");
};

const throwTransaction = () => {
  const transaction = Sentry.startTransaction({ name: "test-transaction" });
  const span = transaction.startChild({ op: "functionX" }); // This function returns a Span
  setTag("color", "blue")
  captureAMessage();
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
}

export default App;
