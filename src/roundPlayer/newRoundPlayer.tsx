import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../navbar";
import Tournament from "../tournaments/tournament";

export default function CreatePlayerRound() {
  const { id } = useParams<string>();
  const [kills, setKills] = useState<number>();
  const [deaths, setDeaths] = useState<number>();
  const [assists, setAssists] = useState<number>();
  const [nonTradedKills, setNTK] = useState<number>();
  const [highestStreak, setStreak] = useState<number>();
  const [damage, setDamage] = useState<number>();
  const [player, setPlayer] = useState<number>();
  const [players, setPlayers] = useState([]);
  const [roundTeam, setRoundTeam] = useState({});
  const [message, setMessage] = useState<string>();
  const numberID = id ? parseInt(id) : 1;

  const navigate = useNavigate();

  const fetchPlayers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/players`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
      });
  };

  const fetchRoundTeam = () => {
    fetch(`${process.env.REACT_APP_API_URL}/round-team/${numberID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRoundTeam(data[0]);
      });
  };

  useEffect(() => {
    fetchPlayers();
    fetchRoundTeam();
  }, [id]);

  console.log(player);
  console.log(roundTeam);

  let handlePlayerChange = (e: React.ChangeEvent<any>) => {
    setPlayer(e.target.value);
  };

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/round-player`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          kills: kills,
          deaths: deaths,
          assists: assists,
          nonTradedKills: nonTradedKills,
          highestStreak: highestStreak,
          damage: damage,
          player: player,
          roundTeam: roundTeam["id"],
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage("Round Player created successfully");
        navigate(`/round/${id}`);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className='App'>
      <NavBar />
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>Create Player Stats</h1>
          <h2>
            <a href={`/tournament/${roundTeam["tournamentID"]}`}>
              {roundTeam["tournamentName"]}
            </a>{" "}
            | <a href={`/match/${roundTeam["matchID"]}`}> Match </a>|{" "}
            <a href={`/rounds/${roundTeam["roundId"]}`}>
              {roundTeam["gameMode"]}{" "}
            </a>{" "}
            | {roundTeam["teamName"]}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>Player: </label>
              <select
                onChange={handlePlayerChange}
                className='form-group-input'
              >
                <option> -- Select a map -- </option>
                {players.map((p) => (
                  <option value={p["id"]}>
                    {p["firstName"]} {p["lastName"]}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Kills:</label>
              <input
                className='form-group-input'
                type='number'
                value={kills}
                required
                placeholder='Kills'
                onChange={(e) => setKills(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Deaths:</label>
              <input
                className='form-group-input'
                type='number'
                value={deaths}
                required
                placeholder='Deaths'
                onChange={(e) => setDeaths(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Assits:</label>
              <input
                className='form-group-input'
                type='number'
                value={assists}
                required
                placeholder='Assists'
                onChange={(e) => setAssists(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Non-Traded Kills:</label>
              <input
                className='form-group-input'
                type='number'
                value={nonTradedKills}
                required
                placeholder='Non-Traded Kills'
                onChange={(e) => setNTK(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Highest Streak:</label>
              <input
                className='form-group-input'
                type='number'
                value={highestStreak}
                required
                placeholder='Highest Streak'
                onChange={(e) => setStreak(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Damage:</label>
              <input
                className='form-group-input'
                type='number'
                value={damage}
                required
                placeholder='Damage'
                onChange={(e) => setDamage(e.target.valueAsNumber)}
              />
            </div>

            <div className='button-container'>
              <button type='submit' className='form-button'>
                Create
              </button>
            </div>

            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
