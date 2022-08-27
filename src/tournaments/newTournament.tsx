import React, { useEffect, useState } from 'react';
import NavBar from '../navbar';
import '../templates/form-template.css';


function CreateTournament() {
  const [type, setType] = useState<string>('regular_season')
  const [startDate, setStartDate] =  useState<string>()
  const [endDate, setEndDate] =  useState<string>()
  const [name, setName] = useState<string | undefined>()
  const [teamSize, setTeamSize] = useState<number | undefined>()
  const [purseSize, setPurseSize] = useState<number | undefined>()
  const [city, setCity] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()
  const [seasons, setSeasons] = useState([])
  const [season, setSeason] = useState<number | undefined>()

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/season`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setSeasons(data)
      })
  }

  let handleTypeChange = (e: React.ChangeEvent<any>) => {
    setType(e.target.value)
  }

  let handleSeasonChange = (e: React.ChangeEvent<any>) => {
    setSeason(e.target.value)
  }

  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/tournament`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          type: type,
          startDate: startDate,
          endDate: endDate,
          name: name,
          teamSize: teamSize,
          purseSize: purseSize,
          city: city,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setType('regular_season')
        setStartDate('')
        setEndDate('')
        setName(undefined)
        setTeamSize(undefined)
        setPurseSize(undefined)
        setCity(undefined)
        setMessage("Tournament created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])




  return (
    <div className="Body">
      <NavBar />
      <div className='form-wrapper'>
      <div className='form-body'>
      <h1 className="form-header">Create Tournament</h1>
        <form onSubmit={handleSubmit}>

          <div className="form-group-row">
            <label className='form-group-label'>Type: </label>
                <select onChange={handleTypeChange} className="form-group-input">
                    <option value='regular_season'>Regular Season</option>
                    <option value='pre_season'>Pre-Season</option>
                    <option value='post_season'>Post-Season</option>
                </select>
          </div>

          <div className='form-group-row'>
          <label className='form-group-label'>Start Date: </label>
            <input
              className="form-group-input"
              type="Date"
              value={startDate}
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className='form-group-row'>
          <label className='form-group-label'>End Date: </label>
            <input
              className="form-group-input"
              type="Date"
              value={endDate}
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="form-group-row">
            <label className='form-group-label'>Season: </label>
                <select onChange={handleSeasonChange} className="form-group-input">
                {seasons.map((s) => <option value={s['id']}>{s['title']}</option>)}
                </select>
          </div>

          <div className='form-group-row'>
            <label className='form-group-label'>Name: </label>
            <input
              className="form-group-input"
              type="text"
              value={name}
              placeholder="Tournament Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='form-group-row'>
            <label className='form-group-label'>Size: </label>
            <input
              className="form-group-input"
              type="number"
              value={teamSize}
              placeholder="# of Teams in Tournament"
              onChange={(e) => setTeamSize(Number(e.target.value))}
            />
          </div>

          <div className='form-group-row'>
            <label className='form-group-label'>Purse Size: </label>
            <input
              className="form-group-input"
              type="number"
              value={purseSize}
              placeholder="# of Teams in Tournament"
              onChange={(e) => setPurseSize(Number(e.target.value))}
            />
          </div>

        <div className="form-group-row">
            <label className="form-group-label">City</label>
            <input
            className="form-group-input"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}/>
        </div>

          <button type="submit" className="form-button">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      </div>
    </div>
  )};

export default CreateTournament;
