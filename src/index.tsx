import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Teams from "./teams/teams";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Team from "./teams/team";
import Players from "./players/players";
import Player from "./players/player";
import CreateTeam from "./teams/newTeam";
import CreatePlayer from "./players/newPlayer";
import Tournaments from "./tournaments/tournaments";
import CreateTournament from "./tournaments/newTournament";
import Tournament from "./tournaments/tournament";
import Season from "./seasons/season";
import CreateSeason from "./seasons/newSeason";
import Seasons from "./seasons/seasons";
import CreateMatch from "./matches/newMatch";
import Match from "./matches/match";
import CreateMap from "./maps/newMap";
import CODMap from "./maps/map";
import CreateRound from "./rounds/newRound";
import Round from "./rounds/round";
import CreatePlayerRound from "./roundPlayer/newRoundPlayer";
import TeamHistory from "./teams/teamHistoryIndex";
import TeamHistoryPage from "./teams/teamHistoryPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='teams' element={<Teams />} />
      <Route path='teams/:slug' element={<Team />} />
      <Route path='teams/new' element={<CreateTeam />} />
      <Route path='teams/:slug/history' element={<TeamHistory />} />
      <Route path='teams/history/:id/:season' element={<TeamHistoryPage />} />
      <Route path='players/:slug' element={<Player />} />
      <Route path='players' element={<Players />} />
      <Route path='players/new' element={<CreatePlayer />} />
      <Route path='tournaments' element={<Tournaments />} />
      <Route path='tournaments/new' element={<CreateTournament />} />
      <Route path='tournament/:id' element={<Tournament />} />
      <Route path='season' element={<Seasons />} />
      <Route path='season/new' element={<CreateSeason />} />
      <Route path='season/:id' element={<Season />} />
      <Route path='match/new' element={<CreateMatch />} />
      <Route path='match/:id' element={<Match />} />
      <Route path='maps/new' element={<CreateMap />} />
      <Route path='maps/:id' element={<CODMap />} />
      <Route path='rounds/new/match/:id' element={<CreateRound />} />
      <Route path='rounds/:id' element={<Round />} />
      <Route path='/playerstats/new/:id' element={<CreatePlayerRound />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
