import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../navbar";

export default function CODMap() {
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [season, setSeason] = useState<object>([]);
  const [seasons, setSeasons] = useState([]);
  const [message, setMessage] = useState<string>();

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/maps/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setName(data["name"]);
        setSeason(data["season"]);
      });
  };

  const fetchSeasons = () => {
    fetch(`${process.env.REACT_APP_API_URL}/season`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
      });
  };

  let handleSeasonChange = (e: React.ChangeEvent<any>) => {
    setSeason(e.target.value);
  };

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/maps/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
          season: season,
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

  useEffect(() => {
    fetchSeasons();
    fetchData();
  }, []);

  return (
    <div className='App'>
      <NavBar />
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>Map</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>First Name: </label>
              <input
                className='form-group-input'
                type='text'
                value={name}
                required
                placeholder='First Name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='form-group-row'>
              <label className='form-group-label'>Season: </label>
              <select
                onChange={handleSeasonChange}
                className='form-group-input'
              >
                <option> -- Select a season -- </option>
                {seasons.map((s) => (
                  <option
                    value={s["id"]}
                    selected={s["id"] === season ? true : false}
                  >
                    {s["title"]}
                  </option>
                ))}
              </select>
            </div>

            <button type='submit' className='form-button'>
              Create
            </button>

            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
