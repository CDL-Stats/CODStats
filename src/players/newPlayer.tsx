import React, { useEffect, useState } from 'react';
import NavBar from '../navbar';
import '../templates/form-template.css';


function CreatePlayer() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nickName, setNickName] = useState("")
  const [team, setTeam] = useState<any[]>([])
  const [message, setMessage] = useState("");
  const [teams, setTeams] = useState([])

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTeams(data)
      })
  }

  let handleTeamChange = (e: React.ChangeEvent<any>) => {
    setTeam(e.target.value)
  }

  useEffect(() => {
    fetchData()
  }, [])

   console.log(teams)

  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/players`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          nickName: nickName,
          team: team,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setFirstName("");
        setLastName("");
        setNickName("");
        setTeam([]);
        setMessage("Player created successfully");
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
          <h1 className="form-header">Create Player</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group-row">
                <label className='form-group-label'>First Name: </label>
                <input
                className="form-group-input"
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group-row">
                <label className='form-group-label'>Last Name: </label>
                <input
                className="form-group-input"
                type="text"
                value={lastName}
                placeholder="Last"
                onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group-row">
               <label className='form-group-label'>Nickname: </label>
                <input
                className="form-group-input"
                type="text"
                value={nickName}
                placeholder="Nickname"
                onChange={(e) => setNickName(e.target.value)}
                />
              </div>
              <div className="form-group-row">
                <label className='form-group-label'>Team: </label>
                <select onChange={handleTeamChange} className="form-group-input"> 
                <option value="⬇️ Select a team ⬇️"> -- Select a team -- </option>
                {teams.map((team) => <option value={team['slug']}>{team['teamName']}</option>)}
                </select>
              </div>

              <button type="submit" className="form-button">Create</button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            </div>
      </div>
    </div>
  )};

export default CreatePlayer;
