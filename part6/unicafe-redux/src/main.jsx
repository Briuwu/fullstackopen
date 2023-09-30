import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = () => store.dispatch({ type: "GOOD" });

  const ok = () => store.dispatch({ type: "OK" });

  const bad = () => store.dispatch({ type: "BAD" });

  const reset = () => store.dispatch({ type: "ZERO" });

  return (
    <div>
      <div>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
      </div>
      <div>
        good {store.getState().good}
        <br />
        ok {store.getState().ok}
        <br />
        bad {store.getState().bad}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
