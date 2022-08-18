import React, { useState } from 'react';
import NavBar from '../navbar';
import '../templates/form-template.css';


function CreateTeam() {
  const [slug, setSlug] = useState<string | undefined>()
  const [teamLocation, setTeamLocation] = useState<string | undefined>()
  const [teamName, setTeamName] = useState<string | undefined>()
  const [teamLogo, setTeamLogo] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()
  const [primaryColor, setPrimaryColor] = useState<string | undefined>()
  const [secondaryColor, setSecondaryColor] = useState<string | undefined>()
  const [shortName, setShortName] = useState<string | undefined>()
  const [abbreviation, setAbbreviation] = useState<string | undefined>()
  const [twitterURL, setTwitterURL] = useState<string | undefined>()
  const [youtubeURL, setYoutubeURL] = useState<string | undefined>()
  const [instagramURL, setInstagramURL] = useState<string | undefined>()


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
        setSlug(undefined)
        setTeamLocation(undefined)
        setTeamName(undefined)
        setTeamLogo(undefined)
        setPrimaryColor(undefined)
        setSecondaryColor(undefined)
        setShortName(undefined)
        setAbbreviation(undefined)
        setTwitterURL(undefined)
        setYoutubeURL(undefined)
        setInstagramURL(undefined)
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
            placeholder="Primary Color - use # and hex value"
            onChange={(e) => setPrimaryColor(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Secondary Color</label>
            <input
            className="form-group-input"
            type="text"
            value={secondaryColor}
            placeholder="Secondary Color - use # and hex value"
            onChange={(e) => setSecondaryColor(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Short Name</label>
            <input
            className="form-group-input"
            type="text"
            value={shortName}
            placeholder="ex: LA Thieves"
            onChange={(e) => setShortName(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Abbreviation</label>
            <input
            className="form-group-input"
            type="text"
            value={abbreviation}
            placeholder="ex: LAT"
            onChange={(e) => setAbbreviation(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Twitter URL</label>
            <input
            className="form-group-input"
            type="text"
            value={twitterURL}
            placeholder="twitter url"
            onChange={(e) => setTwitterURL(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Youtube URL</label>
            <input
            className="form-group-input"
            type="text"
            value={youtubeURL}
            placeholder="youtube url"
            onChange={(e) => setYoutubeURL(e.target.value)}/>
        </div>

        <div className="form-group-row">
            <label className="form-group-label">Instagram URL</label>
            <input
            className="form-group-input"
            type="text"
            value={instagramURL}
            placeholder="instagram url"
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
