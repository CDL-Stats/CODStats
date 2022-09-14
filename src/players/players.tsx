import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import "../templates/form-template.scss";
import "../templates/table-template.css";

function Players() {
  const [players, setPlayers] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/players`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPlayers = players.map((player) => {
    const teamName = player["team"] ? player["team"]["teamName"] : "Free Agent";
    return (
      <tr>
        {" "}
        <td>
          <a href={"/players/" + player["nickName"]}>{player["nickName"]}</a>
        </td>{" "}
        <td>{teamName}</td>
      </tr>
    );
  });

  return (
    <div>
      <NavBar />
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>All Players</h1>
          <table style={{ width: 500 }} className='table-striped'>
            <thead className='table-header'>
              <tr>
                <th>Player Name</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>{getPlayers}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Players;
