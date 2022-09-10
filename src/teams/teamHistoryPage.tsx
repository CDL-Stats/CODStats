import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import NavBar from "../navbar";
import "../templates/form-template.scss";
import "../templates/table-template.css";

export default function TeamHistoryPage() {
  const [seasons, setSeasons] = useState([]);
  const [team, setTeam] = useState([]);
  const [player, setPlayer] = useState();
  const [players, setPlayers] = useState([]);
  const [roster, setRoster] = useState([]);
  const { id, season } = useParams();
  const [message, setMessage] = useState<string>();

  const fetchPlayers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/players`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
      });
  };

  const fetchRoster = () => {
    fetch(`${process.env.REACT_APP_API_URL}/player-history/${id}/${season}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRoster(data);
      });
  };

  useEffect(() => {
    fetchPlayers();
    fetchRoster();
  }, []);

  let handlePlayerChange = (e: React.ChangeEvent<any>) => {
    setPlayer(e.target.value);
  };

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/player-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          player: player,
          season: season,
          team: id,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage("Player updated successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  console.log(roster);

  return (
    <div>
      <NavBar />
      <body className='form-wrapper'>
        <div className='form-body'>
          {roster["data"] && (
            <h2 className='form-header'>
              {roster["data"][0]["teamName"]} {roster["data"][0]["title"]}{" "}
              Roster History
            </h2>
          )}
          {roster["players"] && (
            <table className='table-striped'>
              <thead>
                <tr className='table-header'>
                  <th>Player</th>
                </tr>
              </thead>
              <tbody>
                {roster["players"].map((r: []) => (
                  <tr>
                    <td>{r["nickName"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <h2>Add Player</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>Team: </label>
              <select
                onChange={handlePlayerChange}
                className='form-group-input'
              >
                {players &&
                  players.map((p) => (
                    <option value={p["id"]}>{p["nickName"]}</option>
                  ))}
              </select>
            </div>
            <button type='submit' className='form-button'>
              Add Player
            </button>
          </form>
        </div>
      </body>
    </div>
  );
}
