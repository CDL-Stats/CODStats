import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../navbar";

export default function Match() {
  const { id } = useParams<string>();
  const [match, setMatch] = useState({});
  const [tournament, setTournament] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState([]);
  const [round, setRound] = useState<string>();
  const [roundID, setRoundID] = useState<number>();
  const [bestOf, setBestOf] = useState<number>();
  const [teams, setTeams] = useState([]);
  const [teamOne, setTeamOne] = useState({});
  const [teamTwo, setTeamTwo] = useState({});
  const [message, setMessage] = useState("");
  let teamOneID: any, teamTwoID;

  const navigate = useNavigate();
  const numberID = id ? parseInt(id) : 1;

  const roundArray = [
    "Winners Round 1",
    "Winners Round 2",
    "Winners Finals",
    "Elimination Round 1",
    "Elimination Round 2",
    "Elimination Round 3",
    "Elimination Round 4",
    "Finals",
  ];

  const fetchTournaments = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tournament`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTournaments(data);
      });
  };

  const fetchTeams = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeams(data);
      });
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/matches?ids=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const firstRow = data[0];
        setMatch(firstRow);
        setRound(firstRow["round"]);
        setRoundID(firstRow["roundID"]);
        setBestOf(firstRow["bestOf"]);
        setTournament(firstRow["tournament"]);
        setTeamOne(firstRow["teams"][0]);
        setTeamTwo(firstRow["teams"][1]);
      });
  };

  let handleTeamOneChange = (e: React.ChangeEvent<any>) => {
    setTeamOne({ ...teamOne, team_id: Number(e.target.value) });
  };

  let handleTeamTwoChange = (e: React.ChangeEvent<any>) => {
    setTeamTwo({ ...teamTwo, team_id: Number(e.target.value) });
  };

  let handleTournamentChange = (e: React.ChangeEvent<any>) => {
    setTournament(e.target.value);
  };

  let handleRoundChange = (e: React.ChangeEvent<any>) => {
    setRound(e.target.value);
  };

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log(teamTwo);
    const teamOneSmall = {
      id: teamOne["id"],
      teamId: teamOne["team_id"],
      matchId: match["id"],
    };

    const teamTwoSmall = {
      id: teamTwo["id"],
      teamId: teamTwo["team_id"],
      matchId: match["id"],
    };

    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/matches/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          id: numberID,
          tournament: tournament,
          round: round,
          roundID: roundID,
          bestOf: bestOf,
          teams: [teamOneSmall, teamTwoSmall],
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage("Match updated successfully");
        navigate(`/match/${resJson.id}`);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchTeams();
    fetchData();
    fetchTournaments();
    const teamOneID = teamOne["id"];
  }, []);

  let handleClone = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          tournament: tournament,
          round: round,
          roundID: roundID,
          bestOf: bestOf,
          // teams: [parseInt(teamOne), parseInt(teamTwo)],
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage("Match cloned successfully");
        navigate(`/match/${resJson.id}`);
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
          <h1 className='form-header'>MATCH</h1>
          <form>
            <div className='form-group-row'>
              <label className='form-group-label'>Team: </label>
              <select
                onChange={handleTournamentChange}
                className='form-group-input'
              >
                <option> -- Select a tournament -- </option>
                {tournaments &&
                  tournaments.map((t) => (
                    <option
                      value={t["id"]}
                      selected={tournament["id"] === t["id"] ? true : false}
                    >
                      {t["name"]}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Round: </label>
              <select onChange={handleRoundChange} className='form-group-input'>
                <option> -- Select a round -- </option>
                {roundArray.map((r) => (
                  <option value={r} selected={round === r ? true : false}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Round ID: </label>
              <input
                className='form-group-input'
                type='number'
                value={roundID}
                required
                placeholder='Round ID'
                onChange={(e) => setRoundID(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Best of: </label>
              <input
                className='form-group-input'
                type='number'
                value={bestOf}
                required
                placeholder='Best Of'
                onChange={(e) => setBestOf(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Team 1: </label>
              <select
                onChange={handleTeamOneChange}
                className='form-group-input'
                required
              >
                {teams &&
                  teams.map((team) => (
                    <option
                      value={team["id"]}
                      selected={
                        teamOne["team_id"] === team["id"] ? true : false
                      }
                    >
                      {team["teamName"]}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Team 2: </label>
              <select
                onChange={handleTeamTwoChange}
                className='form-group-input'
                required
              >
                {teams.map((team) => (
                  <option
                    value={team["id"]}
                    selected={teamTwo["team_id"] === team["id"] ? true : false}
                  >
                    {team["teamName"]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type='submit'
                className='form-button'
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
            <div>
              <button
                type='submit'
                className='form-button'
                onClick={handleClone}
              >
                Clone
              </button>
            </div>
            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
