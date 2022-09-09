import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "../navbar";
import "../templates/form-template.scss";

function Season() {
  const { id } = useParams();
  const [season, setSeason] = useState<object>();
  const [maps, setMaps] = useState([]);
  const [year, setYear] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/season/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSeason(data);
        setYear(data["year"]);
        setTitle(data["title"]);
      });
  };

  const fetchMaps = () => {
    fetch(`${process.env.REACT_APP_API_URL}/maps?season=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMaps(data);
      });
  };

  useEffect(() => {
    fetchData();
    fetchMaps();
  }, []);

  const toNewMap = () => {
    navigate(`/maps/new?season=${id}`, { state: { season: id } });
  };

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/season/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          id: id,
          year: year,
          title: title,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        fetchData();
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
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>{title}</h1>
          <h2 className='form-sub-header'>
            <a href='/season'>All Seasons</a>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>Year: </label>
              <input
                className='form-group-input'
                type='number'
                value={year}
                placeholder='First Name'
                onChange={(e) => setYear(e.target.valueAsNumber)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Title: </label>
              <input
                className='form-group-input'
                type='text'
                value={title}
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button type='submit' className='form-button'>
              Update
            </button>
            <div className='message'>{message ? <p>{message}</p> : null}</div>
            <button onClick={() => toNewMap()} className='form-button non-div'>
              New Map
            </button>
          </form>
          <div className='form-body'>
            <h2 className='form-header'>Maps</h2>
            <table className='table-striped'>
              <thead>
                <tr className='table-header'>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody>
                {maps.map((map) => (
                  <tr>
                    <td>
                      <a href={"/maps/" + map["id"]}>{map["name"]}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Season;
