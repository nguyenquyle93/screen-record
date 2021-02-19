import { format } from 'date-fns';
import { del, entries, get, set } from 'idb-keyval';
import React, { useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';



export default function Player({ srcBlob, audio, status }) {
  const [videoList, setVideoList] = useState([]);
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);

  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  if (status === 'stopped' && data !== srcBlob ) {
    setData(srcBlob)
    const date = format(new Date(), "yyyy-MM-dd' 'HH:mm:ss")
    set(date, srcBlob);
    // set('test', new File([srcBlob], "filename", {type:"video/mkv"}));
    get(date).then((value) => setSelected([date,value]));
    entries().then((entries) => setVideoList(entries));
  }
  
  const handleDelete = (value) => {
    del(value);
    entries().then((entries) =>
    {
      setVideoList(entries)
      setSelected(entries[entries.length-1])
    }
    );
  }

  const handleSelect = (value) => {
    setSelected(value);
  }


  return (
    <div>
      <Row>
        <Col md={8} style={{ textAlign: 'right' }}>
          <div style={{paddingLeft:50}}>
    <video
      src={selected?.[1]?URL.createObjectURL(selected[1]):""}
      width={'100%'}
      height={'100%'}
      controls
      />
          </div>
      <div>
            <a href={selected?.[1] ? URL.createObjectURL(selected[1]) : ""} target="_blank" download={`${selected[0]}.webm`}> Download </a>
        </div>
        </Col>
        <Col >
          <div style={{padding: 10
          }}>
          {videoList.map((item,index) => 
          {
            return <div
              key = {index}
              style={{
                color: selected?.[0] === item[0] ? 'blue' : ''
              }}
              onClick={() => handleSelect(item)}>
              {item[0]} - {Math.round(item[1].size / 1000000)}MB
              <span style={{color: 'red'}} onClick={() => handleDelete(item[0])}> DELETE</span>
            </div>
          }
            )}
            </div>
        </Col>
      </Row>
    </div>
  );
}

