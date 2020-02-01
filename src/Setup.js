import React, { useState } from "react";
import { allCapitals, allTerritories, allTeams } from "./assets";
import { shuffle } from "./utils";
import "./Setup.css";

function SetupTeam({
  team,
  capital,
  playing,
  onChangeCapital,
  onChangePlaying
}) {
  return (
    <div className="SetupTeam" data-status={playing ? "on" : "off"}>
      <img
        className="SetupTeam__image"
        src={team.image}
        alt={team.name}
        onClick={onChangePlaying}
      />
      {playing && (
        <select
          className="SetupTeam__capital"
          value={capital}
          onChange={e => onChangeCapital(e.target.value)}
        >
          <option key="" value="" disabled>
            Select a capital
          </option>
          {allCapitals.map(o => (
            <option value={o} key={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default function Setup({ onStart }) {
  let [teams, setTeams] = useState({});

  function getInitialState() {
    let owned = {};
    Object.entries(teams).forEach(([p, t]) => (owned[t] = p));
    let control = {};
    allTerritories.forEach(territory => {
      control[territory.name] = territory.hasCapital
        ? owned[territory.sphere] || ""
        : "";
    });

    return {
      round: 1,
      maxRounds: Object.keys(teams).length < 8 ? 6 : 5,
      phase: "turns",
      startingCapitals: teams,
      control,
      // every team starts with cards for the first round (no oil bonuses)
      turns: shuffle(Object.keys(teams).flatMap(team => [team, team])),
      turnsUsed: []
    };
  }

  const clickTeam = team => {
    if (teams[team] !== undefined) {
      const { [team]: _, ...next } = teams;
      setTeams(next);
    } else {
      setTeams({ ...teams, [team]: "" });
    }
  };

  const changeCapital = (team, cap) => {
    setTeams({ ...teams, [team]: cap });
  };

  const tryToStart = () => {
    if (Object.keys(teams).length < 2)
      return alert("Select at least 2 teams to play");
    if (Object.values(teams).includes(""))
      return alert("Select a starting capital for each team");

    onStart(getInitialState());
  };

  return (
    <div className="Setup">
      <h1 className="Setup__header">Select Teams And Capitals</h1>
      <div className="Setup__teams">
        {allTeams.map(team => {
          let [capital, playing] =
            teams[team.name] !== undefined
              ? [teams[team.name], true]
              : ["", false];
          return (
            <SetupTeam
              key={team.name}
              team={team}
              capital={capital}
              playing={playing}
              onChangePlaying={() => clickTeam(team.name)}
              onChangeCapital={cap => changeCapital(team.name, cap)}
            />
          );
        })}
      </div>
      <button onClick={tryToStart}>Start Game</button>
    </div>
  );
}
