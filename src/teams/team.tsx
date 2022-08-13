import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import NavBar from "../navbar";


export default function Team() {
    const [team, setTeam] = useState([])
    const [players, setPlayers] = useState([])
    

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams/${slug}`, { method: 'DELETE' })
    }

    const fetchData = () => {
        fetch(`ENV/teams/${slug}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setTeam(data)
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
            <span><a href={"/teams"}>All Teams</a></span>
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