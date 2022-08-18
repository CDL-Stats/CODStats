import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../navbar";
import '../templates/form-template.css';

function Player() {
    const { slug } = useParams();
    const [player, setPlayer] = useState<string>()
    const [firstName, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()
    const [nickName, setNickName] = useState<string>()
    const [active, setActive] = useState<boolean>()
    const [primaryWeapon, setPrimaryWeapon] = useState<string>()
    const [birthDate, setBirthDate] = useState('') // TO DO: Type protect
    const [twitchURL, setTwitchURL] = useState<string>()
    const [youtubeURL, setYoutubeURL] = useState<string>()
    const [instagramURL, setInstagramURL] = useState<string>()
    const [twitterURL, setTwitterURL] = useState<string>()
    const [country, setCountry] = useState<string>()
    const [message, setMessage] = useState<string>();
    const [id, setID] = useState<Number>();
    const [teams, setTeams] = useState([]) // TO DO: Type protect
    const [team, setTeam] = useState<any[]>([])



    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/players/nickname/${slug}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setPlayer(data)
            setID(data['id'])
            setFirstName(data['firstName'])
            setLastName(data['lastName'])
            setNickName(data['nickName'])
            setTeam(data['team'])
            setActive(data['active'])
            setBirthDate(data['birthDate'])
            setCountry(data['country'])
            setInstagramURL(data['instagramURL'])
            setPrimaryWeapon(data['primaryWeapon'])
            setTwitchURL(data['twitchURL'])
            setTwitchURL(data['twitterURL'])
            setYoutubeURL(data['youtubeURL'])
          })
      }

    const fetchTeams = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
        .then(response => {
        return response.json()
        })
        .then(data => {
        setTeams(data)
        })
    }

    let handleTeamChange = (e: React.ChangeEvent<any>) => {
        setTeam(e.target.value)
      }

    let handleWeaponChange = (e: React.ChangeEvent<any>) => {
      setPrimaryWeapon(e.target.value)
    }
  
    let handleCountryChange = (e: React.ChangeEvent<any>) => {
      setCountry(e.target.value)
    }
    

    useEffect(() => {
        fetchData()
        fetchTeams()
      }, [])

      let handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          let res = await fetch(`${process.env.REACT_APP_API_URL}/players/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
            id: id,
              firstName: firstName,
              lastName: lastName,
              nickName: nickName,
              team: team,
              active: active,
              birthDate: birthDate,
              country: country,
              instagramURL: instagramURL,
              primaryWeapon: primaryWeapon,
              twitchURL: twitchURL,
              twitterURL: twitterURL,
              youtubeURL: youtubeURL
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 || res.status === 201) {
            fetchData()
            fetchTeams()
            setMessage("Player updated successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          // console.log(err);
        }
      };

    return (
  <div>
    <NavBar />
    <div className="form-wrapper">
      <div className='form-body'>
        <h1 className="form-header">{nickName}</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group-row">
                <label className='form-group-label'>First Name: </label>
                <input
                className="form-group-input"
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group-row">
                <label className='form-group-label'>Last Name: </label>
                <input
                className="form-group-input"
                type="text"
                value={lastName}
                placeholder="Last"
                onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group-row">
               <label className='form-group-label'>Nickname: </label>
                <input
                className="form-group-input"
                type="text"
                value={nickName}
                placeholder="Nickname"
                onChange={(e) => setNickName(e.target.value)}
                />
              </div>
              <div className="form-group-row">
                <label className='form-group-label'>Team: </label>
                <select onChange={handleTeamChange} className="form-group-input"> 
                { team && <option value={team['id']}>{team["teamName"]}</option> }
                { teams && teams.map((team) => <option value={team['id']}>{team['teamName']}</option>)}
                </select>
              </div>

              <div className="form-group-row">
                <label className='form-group-label'>Primary Weapon: </label>
                <select onChange={handleWeaponChange} className="form-group-input">
                <option value={primaryWeapon}>{primaryWeapon}</option>
                  <option value='AR'>AR</option>
                  <option value='Sub'>Sub</option>
                </select>
              </div>

              <div className="form-group-row">
               <label className='form-group-label'>Twitch: </label>
                <input
                className="form-group-input"
                type="text"
                value={twitchURL}
                placeholder="Twitch URL"
                onChange={(e) => setTwitchURL(e.target.value)}
                />
              </div>

              <div className="form-group-row">
               <label className='form-group-label'>Instagram: </label>
                <input
                className="form-group-input"
                type="text"
                value={instagramURL}
                placeholder="Instagram URL"
                onChange={(e) => setInstagramURL(e.target.value)}
                />
              </div>

              <div className="form-group-row">
               <label className='form-group-label'>Twitter: </label>
                <input
                className="form-group-input"
                type="text"
                value={twitterURL}
                placeholder="Twitter URL"
                onChange={(e) => setTwitchURL(e.target.value)}
                />
              </div>

              <div className="form-group-row">
                <label className='form-group-label'>Country: </label>
                <select onChange={handleCountryChange} className="form-group-input"> 
                <option value={country}>{country}</option>
                  <option value='USA'>USA</option>
                  <option value='Canada'>Canada</option>
                </select>
              </div>
              <button type="submit" className="form-button">Update</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
      </div>
      {team && <span><a href={"/teams/" + team['slug']}>Go to team</a></span>}
      </div>
  </div>
    )
}

export default Player;
