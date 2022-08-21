import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import '../templates/form-template.css';
import '../templates/table-template.css';

function Tournaments() {

    const [tournaments, getTournaments] = useState([])

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/tournament`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            getTournaments(data)
          })
      }
    
    useEffect(() => {
        fetchData()
      }, [])

    return (
  <div>
    <NavBar />
    <div className="form-wrapper">
      <div className="form-body">
        <h1 className="form-header">All Teams</h1>
        <table style={{ width: 500 }} className="table-striped">
                <thead className="table-header">
                    <tr>
                        <th>Tournament</th>
                    </tr>
                </thead>
                <tbody>
                    {tournaments.map(tournament => <tr> <td><a href={"/tournament/" + tournament['id']}>{tournament['name']}</a></td> </tr>)}
                </tbody>
        </table>
        </div>
      </div>
  </div>
    )
}

export default Tournaments;
