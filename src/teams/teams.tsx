import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import "../templates/form-template.scss";
import "../templates/table-template.css";

function Teams() {
  const [teams, getTeams] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getTeams(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>All Teams</h1>
          <table style={{ width: 500 }} className='table-striped'>
            <thead className='table-header'>
              <tr>
                <th>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.length > 1 &&
                teams.map((team) => (
                  <tr>
                    {" "}
                    <td>
                      <a href={"/teams/" + team["slug"]}>{team["teamName"]}</a>
                    </td>{" "}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
