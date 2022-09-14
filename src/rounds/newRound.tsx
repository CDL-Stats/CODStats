import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../navbar";

export default function CreateRound() {
  const [map, setMap] = useState();
  const [match, setMatch] = useState<Number | null>();
  const [game, setGame] = useState();
  const [maps, setMaps] = useState([]);
  const [teamOne, setTeamOne] = useState({});
  const [teamTwo, setTeamTwo] = useState({});
  const [pointsOne, setPointsOne] = useState<number>();
  const [pointsTwo, setPointsTwo] = useState<number>();
  const [teamOneWin, setTeamOneWin] = useState<boolean>(false);
  const [teamTwoWin, setTeamTwoWin] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams<string>();
  const numberID = id ? parseInt(id) : 1;

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

  const fetchMatch = () => {
    fetch(`${process.env.REACT_APP_API_URL}/matches?ids=${numberID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeamOne(data[0].teams[0]);
        setTeamTwo(data[0].teams[1]);
      });
  };

  useEffect(() => {
    fetchMatch();
    fetchMaps();
    console.log(teamOne);
  }, [id]);

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/rounds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          match: id,
          game: game,
          map: map,
          teams: {
            teamOne: teamOne["team_id"],
            teamTwo: teamTwo["team_id"],
            teamOnePoints: pointsOne,
            teamTwoPoints: pointsTwo,
            teamOneW: teamOneWin,
            teamTwoW: teamTwoWin,
          },
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage("Round created successfully");
        navigate(`/match/${id}`);
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
          <h1 className='form-header'>Create Round</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>Map: </label>
              <select onChange={handleMapChange} className='form-group-input'>
                <option> -- Select a map -- </option>
                {maps.map((t) => (
                  <option value={t["id"]}>{t["name"]}</option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Game Mode: </label>
              <select
                onChange={handleGameModeChange}
                className='form-group-input'
              >
                <option> -- Select a round -- </option>
                {gameMode.map((r) => (
                  <option value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>
                {teamOne["team_teamName"]}:
              </label>
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
              <label className='form-group-label'>
                {teamTwo["team_teamName"]}:
              </label>
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
