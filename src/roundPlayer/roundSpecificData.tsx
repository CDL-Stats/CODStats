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
          placeholder='First Bloods'
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
