import React, { useState } from 'react';
import NavBar from '../navbar';
import '../templates/form-template.css';


function CreateTeam() {
  const [slug, setSlug] = useState("")
  const [teamLocation, setTeamLocation] = useState("")
  const [teamName, setTeamName] = useState("")
  const [teamLogo, setTeamLogo] = useState("")
  const [message, setMessage] = useState("")


  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/teams`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          slug: slug,
          teamLocation: teamLocation,
          teamName: teamName,
          teamLogo: teamLogo,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setSlug("");
        setTeamLocation("");
        setTeamName("");
        setTeamLogo("");
        setMessage("Team created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };




  return (
    <div className="Body">
      <NavBar />
      <div className='form-wrapper'>
      <div className='form-body'>
      <h1 className="form-header">Create Team</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <label className='form-group-label'>Slug: </label>
            <input
             className="form-group-input"
              type="text"
              value={slug}
              placeholder="Slug"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className='form-group-row'>
          <label className='form-group-label'>Location: </label>
            <input
              className="form-group-input"
              type="text"
              value={teamLocation}
              placeholder="Location"
              onChange={(e) => setTeamLocation(e.target.value)}
            />
          </div>
          <div className='form-group-row'>
            <label className='form-group-label'>Team Name: </label>
            <input
              className="form-group-input"
              type="text"
              value={teamName}
              placeholder="Team Name"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className='form-group-row'>
            <label className='form-group-label'>Photo URL: </label>
            <input
              className="form-group-input"
              type="text"
              value={teamLogo}
              placeholder="Team Logo URL"
              onChange={(e) => setTeamLogo(e.target.value)}
            />
          </div>

          <button type="submit" className="form-button">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      </div>
    </div>
  )};

export default CreateTeam;
