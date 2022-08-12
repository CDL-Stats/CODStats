import React, { useEffect, useState } from "react";

function Teams() {

    const [teams, getTeams] = useState([])

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            getTeams(data)
          })
      }
    
    useEffect(() => {
        fetchData()
      }, [])

    return (
        <div>
        <h1>All Teams</h1>
        <span><a href={"/teams/new"}>Create Team</a></span>
        <span><a href={"/players"}>All Players</a></span>
        <table style={{ width: 500 }}>
                <thead>
                    <tr>
                       <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => <tr> <td><a href={"/teams/" + team['slug']}>{team['teamName']}</a></td> </tr>)}
                </tbody>
        </table>
        </div>
    )
}

export default Teams;
