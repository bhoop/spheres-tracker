import React, { useState } from "react";
import { getTeam, getSphere, allTerritories } from "./assets";
import spacer from "./images/blank.png";
import {
  getPlayerSphereCount,
  getPlayerCapitalCount,
  getPlayerProduction,
  getPlayerOilCount,
  hex2rgb
} from "./utils";

function Scoreboard({ state }) {
  const players = Object.keys(state.startingCapitals).map(player => {
    const [numCapitals, numStartingCapitals] = getPlayerCapitalCount(
      player,
      state
    );
    return {
      team: getTeam(player),
      numSpheres: getPlayerSphereCount(player, state.control),
      numCapitals,
      numStartingCapitals,
      numOil: getPlayerOilCount(player, state.control),
      production: getPlayerProduction(player, state.control)
    };
  });
  players.sort(
    (a, b) =>
      b.numSpheres - a.numSpheres ||
      b.numCapitals - a.numCapitals ||
      b.numStartingCapitals - a.numStartingCapitals ||
      b.numOil - a.numOil ||
      b.production - a.production
  );
  return (
    <div className="Scoreboard">
      {players.map(player => {
        const usedTurns = state.turnsUsed.filter(p => p === player.team.name)
          .length;
        const turnsRemaining = state.turns.filter(p => p === player.team.name)
          .length;
        return (
          <div
            className="Scoreboard__player ScoreboardPlayer"
            key={player.team.name}
          >
            <img className="ScoreboardPlayer__image" src={player.team.image} />
            <div>
              Turns: {usedTurns} / {usedTurns + turnsRemaining}
            </div>
            <div>Spheres: {player.numSpheres}</div>
            <div>
              Capitals: {player.numCapitals} ({player.numStartingCapitals}{" "}
              starting)
            </div>
            <div>Oil: {player.numOil}</div>
            <div>Production: {player.production}</div>
          </div>
        );
      })}
    </div>
  );
}

function SphereList({ name, control }) {
  const sphere = getSphere(name);
  const territories = allTerritories.filter(t => t.sphere === name);
  territories.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="SphereList">
      {territories.map(t => {
        return (
          <div
            className="SphereList__territory"
            is-capital={t.hasCapital ? "is-capital" : undefined}
            has-oil={t.hasOil ? "has-oil" : undefined}
            has-card={t.hasCard ? "has-card" : undefined}
            key={t.name}
            style={{
              backgroundColor: `rgba(${hex2rgb(sphere.color)}, 0.9)`,
              borderColor: control[t.name]
                ? getTeam(control[t.name]).color
                : "transparent"
            }}
          >
            <img
              className="SphereList__control"
              src={control[t.name] ? getTeam(control[t.name]).icon : spacer}
              alt="Owner"
            />
            <span className="SphereList__production">{t.production}</span>
            <span className="SphereList__capital-icon" />
            <span className="SphereList__territory-name">{t.name}</span>
            <span className="SphereList__bonus-icon" />
          </div>
        );
      })}
    </div>
  );
}

function start() {
  let control = {};
  allTerritories.forEach(territory => {
    control[territory.name] = "";
  });
  return control;
}

export default function Standalone() {
  const [state, setState] = useState(start());

  return (
    <div className="standalone">
      <div className="standalone__header">
        <button className="standalone__reset">New Game</button>
      </div>
      <div className="standalone__scoreboard">Scoreboard</div>
      <div className="standalone__map">Map Goes Here</div>
    </div>
  );

  // const changeControl = () => {};
  // return (
  //   <div>
  //     Turn Phase<button onClick={onReset}>End Game</button>
  //     Round {state.round} of {state.maxRounds}
  //     <Scoreboard state={state} />
  //     <div className="Board">
  //       <div className="Board__col">
  //         <SphereList
  //           name="Ottawa"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Washington"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Mexico City"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Brasilia"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //       </div>
  //       <div className="Board__col">
  //         <SphereList
  //           name="London"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Warsaw"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Berlin"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Ankara"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //       </div>
  //       <div className="Board__col">
  //         <SphereList
  //           name="Riyadh"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Cairo"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Abuja"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Pretoria"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //       </div>
  //       <div className="Board__col">
  //         <SphereList
  //           name="Moscow"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Astana"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Tehran"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="New Delhi"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //       </div>
  //       <div className="Board__col">
  //         <SphereList
  //           name="Beijing"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Tokyo"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Jakarta"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //         <SphereList
  //           name="Canberra"
  //           control={state.control}
  //           onChangeControl={changeControl}
  //         />
  //       </div>
  //     </div>
  //     <h2>Current Player</h2>
  //     <img src={currentTeam.image} style={{ width: 300 }} alt="" />
  //   </div>
  // );
}
