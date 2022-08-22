import React, { useEffect, useState } from 'react';
import NavBar from '../navbar';
import '../templates/form-template.css';


function CreateSeason() {
  const [year, setYear] = useState<number>()
  const [title, setTitle] = useState<string>()
  const [message, setMessage] = useState<string>()


  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/season`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            year: year,
            title: title
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setYear(undefined);
        setTitle(undefined);
        setMessage("Season created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };



  return (
    <div className="App">
      <NavBar />
        <div className='form-wrapper'>
          <div className='form-body'>
          <h1 className="form-header">Create Season</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group-row">
                <label className='form-group-label'>Year: </label>
                <input
                className="form-group-input"
                type="number"
                value={year}
                required
                placeholder="Year"
                onChange={(e) => setYear(e.target.valueAsNumber)}
                />
              </div>

              <div className="form-group-row">
                <label className='form-group-label'>Title: </label>
                <input
                className="form-group-input"
                type="text"
                required
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <button type="submit" className="form-button">Create</button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            </div>
      </div>
    </div>
  )};

export default CreateSeason;
