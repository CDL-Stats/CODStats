import React, { useEffect, useState } from "react";

function Players() {
    const [players, setPlayers] = useState([])

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/players`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setPlayers(data)
          })
      }
    
    useEffect(() => {
        fetchData()
      }, [])

      console.log(players)

    return (
        <div>
        <h1>All Players</h1>
        <span><a href={"/players/new"}>Create Players</a></span>
        <span><a href={"/teams"}>All Teams</a></span>
        <table style={{ width: 500 }}>
                <thead>
                    <tr>
                       <th>Player Name</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => <tr> <td><a href={"/players/" + player['nickName']}>{player['nickName']}</a></td> </tr>)}
                </tbody>
        </table>
        </div>
    )
}

export default Players;
