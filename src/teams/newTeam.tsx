import React, { useState } from 'react';
import NavBar from '../navbar';
import '../templates/form-template.css';


function CreateTeam() {
  const [slug, setSlug] = useState("")
  const [teamLocation, setTeamLocation] = useState("")
  const [teamName, setTeamName] = useState("")
  const [teamLogo, setTeamLogo] = useState("")
  const [message, setMessage] = useState("")
  const [primaryColor, setPrimaryColor] = useState('')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [shortName, setShortName] = useState('')
  const [abbreviation, setAbbreviation] = useState('')
  const [twitterURL, setTwitterURL] = useState('')
  const [youtubeURL, setYoutubeURL] = useState('')
  const [instagramURL, setInstagramURL] = useState('')


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
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          shortName: shortName,
          abbreviation: abbreviation,
          twitterURL: twitterURL,
          youtubeURL: youtubeURL,
          instagramURL: instagramURL
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

          <div className="form-group-row">
            <label className="form-group-label">Primary Color</label>
            <input
            className="form-group-input"
            type="text"
            value={primaryColor}
            placeholder={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Secondary Color</label>
            <input
            className="form-group-input"
            type="text"
            value={secondaryColor}
            placeholder={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Short Name</label>
            <input
            className="form-group-input"
            type="text"
            value={shortName}
            placeholder={shortName}
            onChange={(e) => setShortName(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Abbreviation</label>
            <input
            className="form-group-input"
            type="text"
            value={abbreviation}
            placeholder={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Twitter URL</label>
            <input
            className="form-group-input"
            type="text"
            value={twitterURL}
            placeholder={twitterURL}
            onChange={(e) => setTwitterURL(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Youtube URL</label>
            <input
            className="form-group-input"
            type="text"
            value={youtubeURL}
            placeholder={youtubeURL}
            onChange={(e) => setYoutubeURL(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Instagram URL</label>
            <input
            className="form-group-input"
            type="text"
            value={instagramURL}
            placeholder={instagramURL}
            onChange={(e) => setInstagramURL(e.target.value)}/>
        </div>

          <button type="submit" className="form-button">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      </div>
    </div>
  )};

export default CreateTeam;
