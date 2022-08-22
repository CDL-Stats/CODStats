import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../navbar";
import '../templates/form-template.css';

function Season() {
    const { id } = useParams();
    const [season, setSeason] = useState<object>()
    const [year, setYear] = useState<number>()
    const [title, setTitle] = useState<string>()
    const [message, setMessage] = useState<string>();
    
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/season/${id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setSeason(data)
            setYear(data['year'])
            setTitle(data['title'])
          })
      }

    useEffect(() => {
        fetchData()
      }, [])

      let handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          let res = await fetch(`${process.env.REACT_APP_API_URL}/season/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: id,
                year: year,
    title: title,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 || res.status === 201) {
            fetchData()
            setMessage("Season updated successfully");
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
        <h1 className="form-header">{title}</h1>
        <h2 className="form-sub-header"><a href="/season">All Seasons</a></h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group-row">
                <label className='form-group-label'>Year: </label>
                <input
                className="form-group-input"
                type="number"
                value={year}
                placeholder="First Name"
                onChange={(e) => setYear(e.target.valueAsNumber)}
                />
              </div>

              <div className="form-group-row">
                <label className='form-group-label'>Title: </label>
                <input
                className="form-group-input"
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <button type="submit" className="form-button">Update</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
      </div>
    </div>
</div>
    )
}

export default Season;
