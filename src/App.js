import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Setup from "./Setup";
import TurnPhase from "./TurnPhase";

function App() {
  let [state, setState] = useState(
    JSON.parse(localStorage.getItem("state") || '{ "round": 0 }')
  );

  localStorage.setItem("state", JSON.stringify(state));

  const onStart = next => {
    setState(next);
  };

  const onReset = () => {
    setState({ round: 0 });
  };

  const onChangeControl = (territory, owner) => {
    setState({ ...state, control: { ...state.control, [territory]: owner } });
  };

  return (
    <div className="App">
      {state.round === 0 && <Setup onStart={onStart} />}
      {state.phase === "turns" && (
        <TurnPhase
          state={state}
          onReset={onReset}
          onChangeControl={onChangeControl}
        />
      )}
    </div>
  );
}

export default App;
