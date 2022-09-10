import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import NavBar from "../navbar";
import "../templates/form-template.scss";
import "../templates/table-template.css";

export default function TeamHistory() {
  const [seasons, setSeasons] = useState([]);
  const [team, setTeam] = useState([]);
  const { slug } = useParams();

  const fetchSeasons = () => {
    fetch(`${process.env.REACT_APP_API_URL}/season`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
      });
  };

  const fetchTeam = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeam(data);
      });
  };

  useEffect(() => {
    fetchSeasons();
    fetchTeam();
  }, []);

  return (
    <div>
      <NavBar />
      <body className='form-wrapper'>
        <div className='form-body'>
          <h2 className='form-header'>{team["teamName"]} Roster History</h2>
          <table className='table-striped'>
            <thead>
              <tr className='table-header'>
                <th>Year</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((season) => (
                <tr>
                  <a href={`/teams/history/${team["id"]}/${season["id"]}`}>
                    <td>{season["year"]}</td>
                  </a>
                  <td>{season["title"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </div>
  );
}
