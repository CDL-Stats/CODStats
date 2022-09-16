import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../navbar";

export default function Match() {
  const { id } = useParams<string>();
  const [match, setMatch] = useState({});
  const [rounds, setRounds] = useState([]);
  const [tournament, setTournament] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState([]);
  const [round, setRound] = useState<string>();
  const [roundID, setRoundID] = useState<number>();
  const [bestOf, setBestOf] = useState<number>();
  const [teams, setTeams] = useState([]);
  const [teamOne, setTeamOne] = useState({});
  const [teamTwo, setTeamTwo] = useState({});
  const [message, setMessage] = useState("");
  const [replayLink, setReplayLink] = useState<string>();

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
    "Elimination Finals",
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

  const fetchRounds = () => {
    fetch(`${process.env.REACT_APP_API_URL}/rounds/match/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRounds(data);
      });
  };

  const toNewRound = () => {
    navigate(`/rounds/new/match/${id}`, { state: { match: id } });
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/matches?ids=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const firstRow = data[0];
        setMatch(firstRow);
        setRound(firstRow["tournamentRound"]);
        setRoundID(firstRow["roundID"]);
        setBestOf(firstRow["bestOf"]);
        setTournament(firstRow["tournament"]);
        setTeamOne(firstRow["teams"][0]);
        setTeamTwo(firstRow["teams"][1]);
        setReplayLink(firstRow["replayLink"]);
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
          tournamentRound: round,
          roundID: roundID,
          bestOf: bestOf,
          replayLink: replayLink,
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
    fetchRounds();
    fetchTournaments();
    const teamOneID = teamOne["id"];
  }, []);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/matches/${id}`, {
      method: "DELETE",
    });
    navigate("/tournaments");
  };

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
          <a href={`/tournament/${tournament["id"]}`} className='backlink'>
            Back to {tournament["name"]}
          </a>
          <h1 className='form-header'>Match</h1>
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

            <div className='form-group-row'>
              <label className='form-group-label'>Replay Link: </label>
              <input
                className='form-group-input'
                type='text'
                value={replayLink}
                placeholder='Replay Link'
                onChange={(e) => setReplayLink(e.target.value)}
              />
            </div>

            <div className='button-container'>
              <button
                type='submit'
                className='form-button'
                onClick={handleSubmit}
              >
                Update
              </button>
              <button className='form-button clone' onClick={handleClone}>
                Clone
              </button>

              <button className='form-button delete' onClick={handleDelete}>
                Delete
              </button>

              <button
                onClick={() => toNewRound()}
                className='form-button non-div new'
              >
                New Round
              </button>
            </div>

            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </form>

          <div className='form-body'>
            <h2 className='form-header'>Rounds</h2>
            <table className='table-striped'>
              <thead>
                <tr className='table-header'>
                  <th>Round</th>
                  <th>Game Mode</th>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody>
                {rounds.map((round, index) => (
                  <tr>
                    <td>
                      <a href={`/rounds/${round["id"]}`}>{index + 1}</a>
                    </td>
                    <td>{round["game"]}</td>
                    <td>{round["map"]["name"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
