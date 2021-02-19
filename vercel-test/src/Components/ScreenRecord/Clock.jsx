import React, { useState, useEffect } from 'react';


export default function Clock() {
  const [timeH, setTimeH] = useState(0);
  const [timeM, setTimeM] = useState(0);
  const [timeS, setTimeS] = useState(0);

  setTimeout(() => {
    if (timeS === 59) {
      setTimeS(0);
      setTimeM(timeM + 1);
      if (timeM === 59) {
      setTimeM(0)
      setTimeH(timeH+1)
    }
      return
      }
      setTimeS(timeS+1)
    }, 1000) 

  return (
    <span style={{paddingLeft: 10}}>
      {timeH > 0 && <span>{timeH<10?`0${timeH}`:timeH}:</span>}
      <span>{timeM<10?`0${timeM}`:timeM}:</span>
      <span>{timeS<10?`0${timeS}`:timeS}</span>
    </span>
  )
}

