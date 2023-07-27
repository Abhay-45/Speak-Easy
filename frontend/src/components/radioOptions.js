import React, { useState } from 'react';
import COLORS from '../constants/theme';


const RadioOptions = ({setSelectedOption, selectedOption}) => {
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };

  return (
    <div style={{
        backgroundColor: COLORS.GRAY1,
        zIndex: 0,
        borderRadius: 20,
        marginBottom: 20
    }}>
        <div
      id="radios"
      style={{
        position: 'relative',
        width: '300px',
        // zIndex: -1,
        // backgroundColor: COLORS.GRAY1
      }}
    >
      <input
        id="upload"
        type="radio"
        name="radioBtn"
        checked={selectedOption === 'upload'}
        onChange={handleOptionChange}
        style={{ display: 'none' }}
      />
      <label
        htmlFor="upload"
        style={{
          width: '50%',
          height: '50px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          float: 'left',
          padding: '10px',
          zIndex: '2',
          cursor: 'pointer',
          color: selectedOption === "upload" ? COLORS.WHITE : "black",
          fontSize: 18
        }}
      >
        Upload
      </label>
      <input
        id="record"
        type="radio"
        name="radioBtn"
        checked={selectedOption === 'record'}
        onChange={handleOptionChange}
        style={{ display: 'none' }}
      />
      <label
        htmlFor="record"
        style={{
          width: '50%',
          height: '50px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          float: 'left',
          padding: '10px',
          zIndex: '2',
          cursor: 'pointer',
        //   outline: selectedOption === 'record' ? '1px solid green' : 'none',
          borderRadius: 20,
          color: selectedOption === "record" ? COLORS.WHITE : "black",
          fontSize: 18
        }}
      >
        Record
      </label>
      <div
        id="bckgrnd"
        style={{
          backgroundColor: COLORS.PRIMARY,
          position: 'absolute',
          left: selectedOption === 'record' ? '50%' : '0',
          top: '0',
          zIndex: '-1',
          transition: 'left linear 0.3s',
          width: '50%',
          height: '50px',
          borderRadius: 20,
        }}
      ></div>
    </div>
    </div>
    
  );
};

export default RadioOptions;
