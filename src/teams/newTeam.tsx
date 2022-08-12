import React, { useState } from 'react';


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
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={slug}
            placeholder="Slug"
            onChange={(e) => setSlug(e.target.value)}
          />
          <input
            type="text"
            value={teamLocation}
            placeholder="Location"
            onChange={(e) => setTeamLocation(e.target.value)}
          />
          <input
            type="text"
            value={teamName}
            placeholder="Team Name"
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            type="text"
            value={teamLogo}
            placeholder="Team Logo URL"
            onChange={(e) => setTeamLogo(e.target.value)}
          />

          <button type="submit">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <span><a href={"/teams"}>All Teams</a></span>
    </div>
  )};

export default CreateTeam;
