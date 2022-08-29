import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "tailwindcss/tailwind.css";
import NavBar from "./navbar";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [team, setTeam] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [teams, setTeams] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeams(data);
      });
  };

  let handleTeamChange = (e: React.ChangeEvent<any>) => {
    setTeam(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(teams);

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          nickName: nickName,
          team: team,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setFirstName("");
        setLastName("");
        setNickName("");
        setTeam([]);
        setMessage("Player created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className='App'>
      <NavBar />
      <div className='form-body'>
        <h2 className='form-header'>Players</h2>
        <table className='table-striped'>
          <thead>
            <tr className='table-header'>
              <th>Index</th>
              <th>Create</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href='players'>Players</a>
              </td>
              <td>
                <a href='players/new'>New Players</a>
              </td>
            </tr>

            <tr>
              <td>
                <a href='/season'>Seasons</a>
              </td>
              <td>
                <a href='season/new'>New Season</a>
              </td>
            </tr>

            <tr>
              <td>
                <a href='/teams'>Teams</a>
              </td>
              <td>
                <a href='/teams/new'>New Team</a>
              </td>
            </tr>

            <tr>
              <td>
                <a href='/tournaments'>Tournaments</a>
              </td>
              <td>
                <a href='/tournaments/new'>New Tournament</a>
              </td>
            </tr>

            <tr>
              <td>
                <a href='/maps'>Maps</a>
              </td>
              <td>
                <a href='/maps/new'>New Map</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
