import React, { useEffect, useState } from "react";

import NavBar from "../navbar";
import "../templates/form-template.scss";

function CreatePlayer() {
  const current = new Date();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [nickName, setNickName] = useState<string>();
  const [team, setTeam] = useState<any>([]);
  const [active, setActive] = useState<boolean>(true);
  const [primaryWeapon, setPrimaryWeapon] = useState<string>();
  const [birthDate, setBirthDate] = useState<string>();
  const [twitchURL, setTwitchURL] = useState<string>();
  const [youtubeURL, setYoutubeURL] = useState<string>();
  const [instagramURL, setInstagramURL] = useState<string>();
  const [twitterURL, setTwitterURL] = useState<string>();
  const [country, setCountry] = useState<string>("USA");
  const [message, setMessage] = useState<string>("");
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

  let handleWeaponChange = (e: React.ChangeEvent<any>) => {
    setPrimaryWeapon(e.target.value);
  };

  let handleCountryChange = (e: React.ChangeEvent<any>) => {
    setCountry(e.target.value);
  };

  let handleActiveChange = (e: React.ChangeEvent<any>) => {
    setActive(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          team: parseInt(team),
          active: active,
          primaryWeapon: primaryWeapon,
          birthDate: birthDate,
          twitchURL: twitchURL,
          youtubeURL: youtubeURL,
          instagramURL: instagramURL,
          twitterURL: twitterURL,
          country: country,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setFirstName("");
        setLastName("");
        setNickName("");
        setTeam([]);
        setBirthDate("");
        setTwitchURL("");
        setTwitchURL("");
        setYoutubeURL("");
        setInstagramURL("");
        setPrimaryWeapon("");
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
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>Create Player</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>First Name: </label>
              <input
                className='form-group-input'
                type='text'
                value={firstName}
                required
                placeholder='First Name'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Last Name: </label>
              <input
                className='form-group-input'
                type='text'
                required
                value={lastName}
                placeholder='Last'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Nickname: </label>
              <input
                className='form-group-input'
                type='text'
                required
                value={nickName}
                placeholder='Nickname'
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Team: </label>
              <select onChange={handleTeamChange} className='form-group-input'>
                <option> -- Select a team -- </option>
                {teams.map((team) => (
                  <option value={team["id"]}>{team["teamName"]}</option>
                ))}
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Active: </label>
              <input
                className='form-group-input'
                type='checkbox'
                checked={active}
                onChange={handleActiveChange}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Primary Weapon: </label>
              <select
                onChange={handleWeaponChange}
                className='form-group-input'
              >
                <option> -- Select a weapon -- </option>
                <option value='AR'>AR</option>
                <option value='Sub'>Sub</option>
              </select>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Birthdate: </label>
              <input
                className='form-group-input'
                type='date'
                value={birthDate}
                placeholder='Birthdate'
                onChange={(e) => setBirthDate(e.target.value)}
              ></input>
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Twitch: </label>
              <input
                className='form-group-input'
                type='text'
                value={twitchURL}
                placeholder='Twitch URL'
                onChange={(e) => setTwitchURL(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Instagram: </label>
              <input
                className='form-group-input'
                type='text'
                value={instagramURL}
                placeholder='Instagram URL'
                onChange={(e) => setInstagramURL(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Twitter: </label>
              <input
                className='form-group-input'
                type='text'
                value={twitterURL}
                placeholder='Twitter URL'
                onChange={(e) => setTwitterURL(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Country: </label>
              <select
                onChange={handleCountryChange}
                className='form-group-input'
              >
                <option value='USA'>USA</option>
                <option value='Canada'>Canada</option>
                <option value='Australia'>Australia</option>
                <option value='Afghanistan'>Afghanistan</option>
                <option value='France'>France</option>
              </select>
            </div>

            <button type='submit' className='form-button'>
              Create
            </button>

            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePlayer;
