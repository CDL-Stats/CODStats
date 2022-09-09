import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../navbar";

export default function CreateMap() {
  const [name, setName] = useState<string | undefined>();
  const [season, setSeason] = useState<number>();
  const [seasons, setSeasons] = useState([]);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();

  const preSetSeason = searchParams.get("season");

  const fetchSeasons = () => {
    fetch(`${process.env.REACT_APP_API_URL}/season`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
      });
  };

  useEffect(() => {
    fetchSeasons();
    if (preSetSeason) {
      setSeason(parseInt(preSetSeason));
    }
  }, []);

  let handleSeasonChange = (e: React.ChangeEvent<any>) => {
    setSeason(e.target.value);
  };

  let handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/maps`, {
        method: "POST",
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
        setName("");
        setMessage("Map created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <div className='App'>
      <NavBar />
      <div className='form-wrapper'>
        <div className='form-body'>
          <h1 className='form-header'>Create Map</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group-row'>
              <label className='form-group-label'>Name: </label>
              <input
                className='form-group-input'
                type='text'
                value={name}
                required
                placeholder='Name'
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
                    selected={season === s["id"] ? true : false}
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
