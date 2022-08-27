import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../navbar";

export default function Match() {
    const { id } = useParams<string>();
    const [match, setMatch] = useState()
    const [tournament, setTournament] = useState<string>()
    const [tournaments, setTournaments] = useState([])
    const [round, setRound] = useState<string>()
    const [roundID, setRoundID] = useState<number>()
    const [bestOf, setBestOf] = useState<number>()
    const [teams, setTeams] = useState([])
    const [teamOne, setTeamOne] = useState('')
    const [teamTwo, setTeamTwo] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const numberID = id ? parseInt(id) : 1

    const roundArray = ['Winners Round 1', 'Winners Round 2', 'Winners Finals', 'Elimination Round 1', 'Elimination Round 2', 'Elimination Round 3', 'Elimination Round 4', 'Finals']


    const fetchTournaments = () => {
        fetch(`${process.env.REACT_APP_API_URL}/tournament`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setTournaments(data)
        })
      }

    
      const fetchTeams = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setTeams(data)
        })
    }

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/match/${id}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setMatch(data)
            setRound(data['round'])
            setRoundID(data['roundID'])
            setBestOf(data['bestOf'])
            setTournament(data['tournament'])
            setTeamOne(data['teams'][0])
            setTeamTwo(data['teams'][1])
          })
      }

    let handleTeamOneChange = (e: React.ChangeEvent<any>) => {
        setTeamOne(e.target.value)
    }
    
    let handleTeamTwoChange = (e: React.ChangeEvent<any>) => {
        setTeamTwo(e.target.value)
    }

    let handleTournamentChange = (e: React.ChangeEvent<any>) => {
        setTournament(e.target.value)
    }

    let handleRoundChange = (e: React.ChangeEvent<any>) => {
        setRound(e.target.value)
    }

    useEffect(() => {
        fetchTeams()
        fetchData()
        fetchTournaments()
      }, []
    )

    let handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          let res = await fetch(`${process.env.REACT_APP_API_URL}/match/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: numberID,
                tournament: tournament,
                round: round,
                roundID: roundID,
                bestOf: bestOf,
                teams: [parseInt(teamOne), parseInt(teamTwo)]
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 || res.status === 201) {
            setMessage("Match updated successfully");
            console.log(resJson)
            navigate(`/match/${resJson.id}`)
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          // console.log(err);
        }
      };

      let handleClone = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          let res = await fetch(`${process.env.REACT_APP_API_URL}/match`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                tournament: tournament,
                round: round,
                roundID: roundID,
                bestOf: bestOf,
                teams: [parseInt(teamOne), parseInt(teamTwo)]
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 || res.status === 201) {
            setMessage("Match cloned successfully");
            console.log(resJson)
            navigate(`/match/${resJson.id}`)
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          // console.log(err);
        }
      };  


    return (
    <div className="App">
        <NavBar />
        <div className='form-wrapper'>
            <div className='form-body'>
                <h1 className="form-header">MATCH</h1>
                <form>
                    
                    <div className="form-group-row">
                        <label className='form-group-label'>Team: </label>
                        <select onChange={handleTournamentChange} className="form-group-input"> 
                            <option> -- Select a tournament -- </option>
                            {tournaments.map((t) => <option value={t['id']} selected={tournament === t['id'] ? true : false}>{t['name']}</option>)}
                        </select>
                    </div>

                    <div className="form-group-row">
                    <label className='form-group-label'>Round: </label>
                    <select onChange={handleRoundChange} className="form-group-input"> 
                            <option> -- Select a round -- </option>
                            {roundArray.map((r) => <option value={r} selected={round === r ? true : false}>{r}</option>)}
                    </select>
                    </div>

                    <div className="form-group-row">
                        <label className='form-group-label'>Round ID: </label>
                        <input
                        className="form-group-input"
                        type="number"
                        value={roundID}
                        required
                        placeholder="Round ID"
                        onChange={(e) => setRoundID(e.target.valueAsNumber)}
                        />
                    </div>

                    <div className="form-group-row">
                        <label className='form-group-label'>Best of: </label>
                        <input
                        className="form-group-input"
                        type="number"
                        value={bestOf}
                        required
                        placeholder="Best Of"
                        onChange={(e) => setBestOf(e.target.valueAsNumber)}
                        />
                    </div>

                    <div className="form-group-row">
                        <label className='form-group-label'>Team 1: </label>
                        <select onChange={handleTeamOneChange} className="form-group-input"> 
                            {teams.map((team) => <option value={team['id']} selected={teamOne === team['id'] ? true : false}>{team['teamName']}</option>)}
                        </select>
                    </div>

                    <div className="form-group-row">
                        <label className='form-group-label'>Team 2: </label>
                        <select onChange={handleTeamTwoChange} className="form-group-input"> 
                            {teams.map((team) => <option value={team['id']} selected={teamTwo === team['id'] ? true : false}>{team['teamName']}</option>)}
                        </select>
                    </div>

                    <div><button type="submit" className="form-button" onClick={handleSubmit}>Update</button></div>
                    <div><button type="submit" className="form-button" onClick={handleClone}>Clone</button></div>
                    <div className="message">{message ? <p>{message}</p> : null}</div>

                </form>
            </div>
        </div>
    </div>
    )
}