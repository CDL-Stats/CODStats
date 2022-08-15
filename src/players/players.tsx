import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import '../templates/form-template.css';
import '../templates/table-template.css';

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
    <NavBar />
    <div className="form-wrapper">
      <div className="form-body">
        <h1 className="form-header">All Players</h1>
        <table style={{ width: 500 }} className='table-striped'>
                <thead className="table-header">
                    <tr>
                        <th>Player Name</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => <tr> <td><a href={"/players/" + player['nickName']}>{player['nickName']}</a></td> </tr>)}
                </tbody>
        </table>
      </div>
    </div>
  </div>
    )
}

export default Players;
