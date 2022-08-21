import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { start } from 'repl';
import NavBar from '../navbar';
import '../templates/form-template.css';


function Tournament() {
    const [tournament, setTournament] = useState<object | undefined>()
  const [type, setType] = useState<string>('regular_season')
  const [startDate, setStartDate] =  useState<Date | null | string>()
  const [endDate, setEndDate] =  useState<Date | null | string>()
  const [name, setName] = useState<string | undefined>()
  const [teamSize, setTeamSize] = useState<number | undefined>()
  const [purseSize, setPurseSize] = useState<number | undefined>()
  const [city, setCity] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams/${id}`, { method: 'DELETE' })
}

  let handleTypeChange = (e: React.ChangeEvent<any>) => {
    setType(e.target.value)
  }


  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/tournament/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            id: id,
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
        fetchData()
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tournament/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTournament(data)
        setType(data['type'])
        setStartDate(new Date(data['startDate']).toISOString().slice(0, 10))
        setEndDate(new Date(data['endDate']).toISOString().slice(0, 10))
        setName(data['name'])
        setTeamSize(data['teamSize'])
        setPurseSize(data['purseSize'])
        setCity(data['city'])
      })
  }

  useEffect(() => {
    fetchData()
    console.log(startDate)
  }, [])

  const { id } = useParams();


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

export default Tournament;
