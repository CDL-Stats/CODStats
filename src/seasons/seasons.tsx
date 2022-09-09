import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import "../templates/form-template.scss";
import "../templates/table-template.css";
import Season from "./season";

function Seasons() {
  const [seasons, setSeasons] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/season`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
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
          <h1 className='form-header'>All Seasons</h1>
          <h2 className='form-sub-header'>
            <a href='/season/new'>Create Season</a>
          </h2>
          <table style={{ width: 500 }} className='table-striped'>
            <thead className='table-header'>
              <tr>
                <th>Season</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((season) => (
                <tr>
                  {" "}
                  <td>
                    <a href={"/season/" + season["id"]}>{season["title"]}</a>
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

export default Seasons;
