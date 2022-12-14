import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../navbar";

export default function Round() {
  const [data, setData] = useState({});
  const [gameMap, setMap] = useState<object>({});
  const [match, setMatch] = useState<Number>(0);
  const [game, setGame] = useState();
  const [maps, setMaps] = useState([]);
  const [message, setMessage] = useState("");
  const [teamOne, setTeamOne] = useState({});
  const [teamTwo, setTeamTwo] = useState({});
  const [pointsOne, setPointsOne] = useState<number>();
  const [pointsTwo, setPointsTwo] = useState<number>();
  const [teamOneWin, setTeamOneWin] = useState<boolean>(false);
  const [teamTwoWin, setTeamTwoWin] = useState<boolean>(false);
  const [playerStatsOne, setPlayerStats] = useState([]);
  const [playerStatsTwo, setPlayerStatsTwo] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams<string>();

  const gameMode = ["Search", "Control", "Hardpoint"];

  let handleMapChange = (e: React.ChangeEvent<any>) => {
    setMap(e.target.value);
  };

  let handleGameModeChange = (e: React.ChangeEvent<any>) => {
    setGame(e.target.value);
  };

  let handleTeamOneWin = (e: React.ChangeEvent<any>) => {
    setTeamOneWin(!teamOneWin);
  };

  let handleTeamTwoWin = (e: React.ChangeEvent<any>) => {
    setTeamTwoWin(!teamTwoWin);
  };

  const fetchMaps = () => {
    fetch(`${process.env.REACT_APP_API_URL}/maps`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMaps(data);
      });
  };

  const fetchPlayerStats = () => {
    fetch(`${process.env.REACT_APP_API_URL}/round-player/round/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerStats(data["one"]);
        setPlayerStatsTwo(data["two"]);
      });
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/rounds/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const firstRow = data[0];
        setData(data);
        setGame(firstRow["game"]);
        setMatch(firstRow["match"]);
        setMap(firstRow["map"]);
        setTeamOne(data["team"][0]["team"]);
        setTeamTwo(data["team"][1]["team"]);
        setPointsOne(data["team"][0]["score"]);
        setPointsTwo(data["team"][1]["score"]);
        setTeamOneWin(data["team"][0]["WL"]);
        setTeamTwoWin(data["team"][1]["WL"]);
      });
  };

  useEffect(() => {
    fetchData();
    fetchMaps();
    fetchPlayerStats();
  }, []);

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/rounds`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          match: match,
          game: game,
          map: gameMap,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage("Round created successfully");
        console.log(resJson);
        navigate(`/match/${resJson.id}`);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  let routeToPlayerStat = (id: number) => {
    navigate(`/playerstats/new/${id}`);
  };

  return (
    <div className='App'>
      <NavBar />
      <div className='form-wrapper'>
        <div className='form-body'>
          <a className='backlink' href={`/match/${match["id"]}`}>
            Back to Match
          </a>
          <h1 className='form-header'>Update Round</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>Map: </label>
              <select onChange={handleMapChange} className='form-group-input'>
                <option> -- Select a map -- </option>
                {maps.map((t) => (
                  <option
                    value={t["id"]}
                    selected={gameMap["id"] === t["id"] ? true : false}
                  >
                    {t["name"]}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Game Mode: </label>
              <select
                onChange={handleGameModeChange}
                className='form-group-input'
              >
                <option> -- Select a game mode -- </option>
                {gameMode.map((r) => (
                  <option value={r} selected={game == r ? true : false}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>{teamOne["teamName"]}:</label>
              <input
                className='form-group-input'
                type='number'
                value={pointsOne}
                placeholder='Points'
                onChange={(e) => setPointsOne(e.target.valueAsNumber)}
              />
              <label className='form-group-label win-label'>Winner </label>
              <input
                className='form-group-input win-box'
                type='checkbox'
                checked={teamOneWin}
                onChange={handleTeamOneWin}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>{teamTwo["teamName"]}:</label>
              <input
                className='form-group-input'
                type='number'
                value={pointsTwo}
                placeholder='Points'
                onChange={(e) => setPointsTwo(e.target.valueAsNumber)}
              />
              <label className='form-group-label win-label'>Winner </label>
              <input
                className='form-group-input win-box'
                type='checkbox'
                checked={teamTwoWin}
                onChange={handleTeamTwoWin}
              />
            </div>

            <button type='submit' className='form-button'>
              Update
            </button>

            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </form>
          <div>
            <h2>{teamOne["teamName"]}</h2>
            {playerStatsOne && (
              <table className='table-striped'>
                <thead>
                  <tr className='table-header'>
                    <th>Nickname</th>
                    <th>Kills</th>
                    <th>Deaths</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {playerStatsOne.map((p) => (
                    <tr>
                      <td>{p["nickName"]}</td>
                      <td>{p["kills"]}</td>
                      <td>{p["deaths"]}</td>
                      <a href={`/playerstats/${p["teamID"]}/player/${p["id"]}`}>
                        Edit
                      </a>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              className='form-button'
              onClick={() => routeToPlayerStat(data["team"][0]["id"])}
            >
              Add Player
            </button>

            <h2>{teamTwo["teamName"]}</h2>
            {playerStatsTwo && (
              <table className='table-striped'>
                <thead>
                  <tr className='table-header'>
                    <th>Nickname</th>
                    <th>Kills</th>
                    <th>Deaths</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {playerStatsTwo.map((p) => (
                    <tr>
                      <td>{p["nickName"]}</td>
                      <td>{p["kills"]}</td>
                      <td>{p["deaths"]}</td>
                      <td>
                        <a
                          href={`/playerstats/${p["teamID"]}/player/${p["id"]}`}
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              className='form-button'
              onClick={() => routeToPlayerStat(data["team"][1]["id"])}
            >
              Add Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
