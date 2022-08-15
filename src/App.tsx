import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'tailwindcss/tailwind.css'
import NavBar from './navbar';


function App() {
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
      <body className='bg-gray-100'>
        <span className= 'text-3xl font-bold underline'>Create Player</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            value={nickName}
            placeholder="Nickname"
            onChange={(e) => setNickName(e.target.value)}
          />
          <select onChange={handleTeamChange}> 
            <option value="⬇️ Select a team ⬇️"> -- Select a team -- </option>
            {teams.map((team) => <option value={team['slug']}>{team['teamName']}</option>)}
          </select>


          <button type="submit">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </body>
    </div>
  )};

export default App;
