import { useState } from "react";

export default function RoundSpecificData(props: any) {
  console.log(props.roundSpecific);
  const gameMode = props.mode;
  const searchRounds = (
    <div>
      <div className='form-group-row'>
        <label className='form-group-label'>First Bloods:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["firstBloods"]}
          required
          placeholder='Defuses'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              firstBloods: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>Plants:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["plants"]}
          required
          placeholder='Plants'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              plants: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>Defuses:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["defuses"]}
          required
          placeholder='Defuses'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              defuses: e.target.valueAsNumber,
            })
          }
        />
      </div>
    </div>
  );

  const hardPointRounds = (
    <div>
      <div className='form-group-row'>
        <label className='form-group-label'>Hill Time:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["hillTime"]}
          required
          placeholder='Hill Time'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              hillTime: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>P1 Time:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["p1Time"]}
          required
          placeholder='P1 Time'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              p1Time: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>P2 Time:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["p2Time"]}
          required
          placeholder='P2 Time'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              p2Time: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>P3 Time:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["p3Time"]}
          required
          placeholder='P3 Time'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              p3Time: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>P4 Time:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["p4Time"]}
          required
          placeholder='P4 Time'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              p4Time: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>P5 Time:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["p5Time"]}
          required
          placeholder='P5 Time'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              p5Time: e.target.valueAsNumber,
            })
          }
        />
      </div>
    </div>
  );

  const controlRounds = (
    <div>
      <div className='form-group-row'>
        <label className='form-group-label'>Zones Captured:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["zoneCapture"]}
          required
          placeholder='Zone Capture'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              zoneCapture: e.target.valueAsNumber,
            })
          }
        />
      </div>

      <div className='form-group-row'>
        <label className='form-group-label'>Zones Tiers Captured:</label>
        <input
          className='form-group-input'
          type='number'
          value={props.roundSpecific["zoneTiers"]}
          required
          placeholder='Zone Tiers Captured'
          onChange={(e) =>
            props.setRoundSpecific({
              ...props.roundSpecific,
              zoneTiers: e.target.valueAsNumber,
            })
          }
        />
      </div>
    </div>
  );
  return (
    <div>
      {gameMode == "Hardpoint" && hardPointRounds}
      {gameMode == "Search" && searchRounds}
      {gameMode == "Control" && controlRounds}
    </div>
  );
}
