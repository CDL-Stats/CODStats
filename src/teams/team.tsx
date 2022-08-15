import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import NavBar from "../navbar";


export default function Team() {
    const [team, setTeam] = useState([])
    const [players, setPlayers] = useState([])
    const [teamLocation, setTeamLocation] = useState('')
    const [teamName, setTeamName] = useState('')
    const [teamPhotoUrl, setTeamPhotoURL] = useState('')
    const [message, setMessage] = useState('')
    

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams/${slug}`, { method: 'DELETE' })
    }

    let handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          let res = await fetch(`${process.env.REACT_APP_API_URL}/team/${slug}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
            slug: slug,
            teamLocation: teamLocation,
              teamName: teamName,
              teamPhotoURL: teamPhotoUrl,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 || res.status === 201) {
            fetchData()
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          // console.log(err);
        }
      };

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams/${slug}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setTeam(data)
            setTeamName(data['teamName'])
            setTeamLocation(data['teamLocation'])
            setTeamPhotoURL(data['teamPhotoURL'])
          })
      }

    const fetchPlayers = () => {
        fetch(`${process.env.REACT_APP_API_URL}/players/team/${slug}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setPlayers(data)
        })
    }

    useEffect(() => {
        fetchData()
        fetchPlayers()
      }, [])
    
    const { slug } = useParams();

    console.log(team)

    return (
        <div>
            <NavBar />
            <h1>{team['teamLocation']} {team['teamName']}</h1>
            <h2>Update Team</h2>
            <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={teamLocation}
                    placeholder={teamLocation}
                    onChange={(e) => setTeamLocation(e.target.value)}/>
                    <input
                    type="text"
                    value={teamName}
                    placeholder={teamName}
                    onChange={(e) => setTeamName(e.target.value)}/>
                    <input
                    type="text"
                    value={teamPhotoUrl}
                    placeholder={teamPhotoUrl}
                    onChange={(e) => setTeamPhotoURL(e.target.value)}/>
                    <button type="submit">Update</button>
            </form>
            <h2>Players</h2>
            <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => 
                    <tr> 
                        <td><a href={"/players/" + player['nickName']}>{player['nickName']}</a></td>
                        <td>{player['firstName']}</td>
                        <td>{player['lastName']}</td></tr>
                    )}
                </tbody>
             </table>
            <div><button onClick={() => handleDelete()}>Delete Team</button></div>
        </div>
    )
}