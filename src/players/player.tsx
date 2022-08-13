import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../navbar";

function Player() {
    const { slug } = useParams();
    const [player, setPlayer] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [nickName, setNickName] = useState("")
    const [message, setMessage] = useState("");
    const [id, setID] = useState("");
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState<any[]>([])



    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/players/nickname/${slug}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setPlayer(data)
            setID(data['id'])
            setFirstName(data['firstName'])
            setLastName(data['lastName'])
            setNickName(data['nickName'])
            setTeam(data['team'])
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

    let handleTeamChange = (e: React.ChangeEvent<any>) => {
        setTeam(e.target.value)
      }

    useEffect(() => {
        fetchData()
        fetchTeams()
      }, [])

      let handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          let res = await fetch(`${process.env.REACT_APP_API_URL}/players/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
            id: id,
              firstName: firstName,
              lastName: lastName,
              nickName: nickName,
              team: team
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 || res.status === 201) {
            fetchData()
            fetchTeams()
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          // console.log(err);
        }
      };

    return (
        <div>
          <NavBar />
            <div className='player-header'>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={firstName}
                    placeholder={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                    <input
                    type="text"
                    value={lastName}
                    placeholder={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                    <input
                    type="text"
                    value={nickName}
                    placeholder={nickName}
                    onChange={(e) => setNickName(e.target.value)}/>
                    <select onChange={handleTeamChange}> 
                        <option value={team['teamName']}>{team['teamName']}</option>
                        {teams.map((team) => <option value={team['slug']}>{team['teamName']}</option>)}
                    </select>
                    <button type="submit">Update</button>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </form>
            </div>
            <span><a href={"/teams/" + team['slug']}>Go to team</a></span>
        </div>
    )
}

export default Player;
