import { allCapitals, allTerritories, getTerritory } from "./assets";

export function shuffle(arr) {
  let next = [...arr];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = next[i];
    next[i] = next[j];
    next[j] = temp;
  }
  return next;
}

export function getPlayerProduction(player, control) {
  return Object.keys(control)
    .filter(t => control[t] === player)
    .map(t => getTerritory(t).production)
    .reduce((p, v) => p + v, 0);
}

export function getPlayerOilCount(player, control) {
  return Object.entries(control).filter(
    ([t, p]) => getTerritory(t).hasOil && p === player
  ).length;
}

export function getPlayerSphereCount(player, control) {
  return allCapitals.filter(sphere =>
    allTerritories
      .filter(t => t.sphere === sphere)
      .every(t => control[t.name] === player)
  ).length;
}

export function getPlayerCapitalCount(player, state) {
  const startingCapitals = Object.values(state.startingCapitals);
  let numCapitals = 0,
    numStartingCapitals = 0;
  Object.entries(state.control).forEach(([t, p]) => {
    if (p !== player) return;
    const territory = getTerritory(t);
    if (territory.hasCapital) {
      numCapitals++;
      if (startingCapitals.includes(territory.sphere)) numStartingCapitals++;
    }
  });
  return [numCapitals, numStartingCapitals];
}

export function getTurnsDeck(state) {
  // get the list of players in the game
  const players = Array.from(new Set(Object.values(state.control)));
  // create an unshuffled deck
  let deck = players.flatMap(player =>
    Array(2 + getPlayerOilCount(player, state.control)).fill(player)
  );
  return shuffle(deck);
}

export function hex2rgb(hex) {
  var bigint = parseInt(hex.substring(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}
