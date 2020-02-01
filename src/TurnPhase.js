import React, { useState } from "react";
import Img from "react-image";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import {
  turnCardImage,
  getTeam,
  getSphere,
  allTerritories,
  getTerritory,
  getUnitsPerProduction,
  allTeams
} from "./assets";
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
    const oilCount = getPlayerOilCount(player, state.control);
    const production = getPlayerProduction(player, state.control);
    const numSpheres = getPlayerSphereCount(player, state.control);
    return {
      team: getTeam(player),
      numSpheres,
      numCapitals,
      numStartingCapitals,
      numOil: oilCount,
      production,
      numTurns: 2 + oilCount,
      numUnits:
        getUnitsPerProduction(production) + numSpheres + numStartingCapitals
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
      {players.map((player, rank) => {
        const usedTurns = state.turnsUsed.filter(p => p === player.team.name)
          .length;
        const turnsRemaining = state.turns.filter(p => p === player.team.name)
          .length;
        return (
          <div
            className="Scoreboard__player ScoreboardPlayer"
            key={player.team.name}
            style={{ color: player.team.color }}
          >
            <div className="ScoreboardPlayer__rank">{rank + 1}</div>
            <img
              className="ScoreboardPlayer__image"
              src={player.team.image}
              alt=""
            />
            <div className="ScoreboardPlayer__stats">
              <div className="ScorebardStat">
                <div className="ScoreboardStat__label">Turns</div>
                <div className="ScoreboardStat__value">{player.numTurns}</div>
              </div>
              <div className="ScorebardStat">
                <div className="ScoreboardStat__label">Units</div>
                <div className="ScoreboardStat__value">{player.numUnits}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SphereList({ name, control, onSelect }) {
  const sphere = getSphere(name);
  const territories = allTerritories.filter(t => t.sphere === name);
  territories.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="SphereList">
      {territories.map(t => {
        const owner = getTeam(control[t.name]);
        return (
          <div
            className="SphereList__territory"
            is-capital={t.hasCapital ? "is-capital" : undefined}
            has-oil={t.hasOil ? "has-oil" : undefined}
            has-card={t.hasCard ? "has-card" : undefined}
            key={t.name}
            style={{
              backgroundColor: `rgba(${hex2rgb(sphere.color)}, 0.6)`,
              color: sphere.color
            }}
            onClick={() => onSelect(t.name)}
          >
            <div className="SphereList__control">
              {owner && (
                <div
                  className="SphereList__cube CubeSprite"
                  style={{ color: owner.color }}
                >
                  <div className="CubeSprite__cube">
                    <div className="CubeSprite__face CubeSprite__face--front"></div>
                    <div className="CubeSprite__face CubeSprite__face--back"></div>
                    <div className="CubeSprite__face CubeSprite__face--left"></div>
                    <div className="CubeSprite__face CubeSprite__face--right"></div>
                    <div className="CubeSprite__face CubeSprite__face--top"></div>
                    <div className="CubeSprite__face CubeSprite__face--bottom"></div>
                  </div>
                </div>
              )}
            </div>
            <span className="SphereList__capital-icon" />
            <span className="SphereList__territory-name">{t.name}</span>
          </div>
        );
      })}
    </div>
  );
}

function TerritoryPopup({ name, owner, onChange }) {
  const territory = getTerritory(name);
  const selectTeam = next => {
    onChange(next === owner ? "" : next);
  };
  return (
    <Dialog
      isOpen={name !== ""}
      aria-label="Territory Details"
      onDismiss={() => onChange(owner)}
    >
      <div className="tpop">
        <h1>{name}</h1>
        <div className="tpop__teams">
          {allTeams.map(team => (
            <Img
              className="tpop__team"
              src={team.image}
              key={team.name}
              data-status={owner === team.name ? "on" : "off"}
              onClick={() => selectTeam(team.name)}
              alt=""
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default function TurnPhase({ state, onReset, onChangeControl }) {
  const [openTerritory, setOpenTerritory] = useState("");
  const currentTeam = getTeam(state.turns[0]);

  const changeControl = (territory, owner) => {
    if (!state.control.hasOwnProperty(territory))
      throw new Error(`Territory ${JSON.stringify(territory)} Is Not Defined`);
    // close the dialog
    setOpenTerritory("");
    // update the state
    onChangeControl(territory, owner);
  };

  const onSelectTerritory = territory => {
    setOpenTerritory(territory);
  };

  return (
    <div className="Phase">
      <div className="Phase__header">
        <button onClick={onReset} className="Phase__reset">
          New Game
        </button>
      </div>
      <div className="Phase__scoreboard">
        <Scoreboard state={state} />
      </div>
      <div className="Phase__main Board">
        <div className="Board__col">
          <SphereList
            name="Ottawa"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Washington"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Mexico City"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Brasilia"
            control={state.control}
            onSelect={onSelectTerritory}
          />
        </div>
        <div className="Board__col">
          <SphereList
            name="London"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Warsaw"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Berlin"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Ankara"
            control={state.control}
            onSelect={onSelectTerritory}
          />
        </div>
        <div className="Board__col">
          <SphereList
            name="Riyadh"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Cairo"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Abuja"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Pretoria"
            control={state.control}
            onSelect={onSelectTerritory}
          />
        </div>
        <div className="Board__col">
          <SphereList
            name="Moscow"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Astana"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Tehran"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="New Delhi"
            control={state.control}
            onSelect={onSelectTerritory}
          />
        </div>
        <div className="Board__col">
          <SphereList
            name="Beijing"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Tokyo"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Jakarta"
            control={state.control}
            onSelect={onSelectTerritory}
          />
          <SphereList
            name="Canberra"
            control={state.control}
            onSelect={onSelectTerritory}
          />
        </div>
      </div>
      <TerritoryPopup
        name={openTerritory}
        owner={state.control[openTerritory]}
        onChange={value => changeControl(openTerritory, value) || ""}
      />
    </div>
  );
}
