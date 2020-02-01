import playerRed from "./images/player-red.png";
import playerPurple from "./images/player-purple.png";
import playerGreen from "./images/player-green.png";
import playerWhite from "./images/player-white.png";
import playerYellow from "./images/player-yellow.png";
import playerBrown from "./images/player-brown.png";
import playerBlue from "./images/player-blue.png";
import playerBlack from "./images/player-black.png";
import playerRedIcon from "./images/player-red-icon.png";
import playerPurpleIcon from "./images/player-purple-icon.png";
import playerGreenIcon from "./images/player-green-icon.png";
import playerWhiteIcon from "./images/player-white-icon.png";
import playerYellowIcon from "./images/player-yellow-icon.png";
import playerBrownIcon from "./images/player-brown-icon.png";
import playerBlueIcon from "./images/player-blue-icon.png";
import playerBlackIcon from "./images/player-black-icon.png";
import turnCardImage from "./images/card-turns.png";
import allTerritories from "./territories.json";

const allCapitals = allTerritories.filter(t => t.hasCapital).map(t => t.sphere);
allCapitals.sort();
const territoriesByName = allTerritories.reduce(
  (p, v) => ({ ...p, [v.name]: v }),
  {}
);

export const allSpheres = [
  { name: "Ottawa", color: "#92B6CC" },
  { name: "Washington", color: "#73B2E5" },
  { name: "Mexico City", color: "#7B9720" },
  { name: "Brasilia", color: "#549829" },
  { name: "London", color: "#D56758" },
  { name: "Warsaw", color: "#72757A" },
  { name: "Berlin", color: "#6B6A8C" },
  { name: "Ankara", color: "#7DAC8A" },
  { name: "Tehran", color: "#C7864E" },
  { name: "Riyadh", color: "#E7AA59" },
  { name: "Cairo", color: "#FFAA01" },
  { name: "Abuja", color: "#D7B983" },
  { name: "Pretoria", color: "#DA8C3A" },
  { name: "Moscow", color: "#746167" },
  { name: "Astana", color: "#516C7F" },
  { name: "Beijing", color: "#CE5646" },
  { name: "Tokyo", color: "#FBB901" },
  { name: "New Delhi", color: "#897157" },
  { name: "Jakarta", color: "#69773C" },
  { name: "Canberra", color: "#F39F09" }
];

const allTeams = [
  { name: "Red", image: playerRed, icon: playerRedIcon, color: "#d22" },
  {
    name: "Purple",
    image: playerPurple,
    icon: playerPurpleIcon,
    color: "purple"
  },
  { name: "Green", image: playerGreen, icon: playerGreenIcon, color: "green" },
  { name: "White", image: playerWhite, icon: playerWhiteIcon, color: "#ddd" },
  {
    name: "Yellow",
    image: playerYellow,
    icon: playerYellowIcon,
    color: "#E6E633"
  },
  {
    name: "Brown",
    image: playerBrown,
    icon: playerBrownIcon,
    color: "#5B3000"
  },
  { name: "Blue", image: playerBlue, icon: playerBlueIcon, color: "#22d" },
  { name: "Black", image: playerBlack, icon: playerBlackIcon, color: "#333" }
];

export function getTerritory(name) {
  return territoriesByName[name] || {};
}

export function getTeam(name) {
  return allTeams.find(t => t.name === name);
}

export function getSphere(name) {
  return allSpheres.find(s => s.name === name);
}

export function getUnitsPerProduction(production) {
  if (production === 0) return 0;
  return Math.ceil((production + 1) / 3);
}

export { allTerritories, allCapitals, allTeams, turnCardImage };
