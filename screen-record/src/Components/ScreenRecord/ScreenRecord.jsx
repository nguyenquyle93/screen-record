import { LoadingOutlined } from '@ant-design/icons';
import useMediaRecorder from '@wmik/use-media-recorder';
import { Spin } from 'antd';
import React, { useState } from 'react';
import Clock from './Clock';
import Player from './Player';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function LiveStreamPreview({ stream }) {
  let videoPreviewRef = React.useRef();

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoPreviewRef} width={'50%'} height={'50%'} autoPlay />;
}


export default function ScreenRecord2() {
  const [recordScreen, setRecordScreen] = useState(true);
  const [action, setAction] = useState('');
  let {
    error,
    status,
    liveStream,
    mediaBlob,
    stopRecording,
    pauseRecording,
    getMediaStream,
    startRecording,
    resumeRecording,
  } = useMediaRecorder({
    recordScreen: recordScreen,
    blobOptions: {
      type: 'video',
      disableLogs: true,
    },
    mediaRecorderOptions: {
      mimeType: "video/webm\;codecs=vp9",
      bitsPerSecond: 128000*8,
      audioBitsPerSecond: 128000*8,
      videoBitsPerSecond: 128000*8,
      frameInterval: 90,
    },
    mediaStreamConstraints: { audio: true, video: true },
  });

  const handlePause = (value) => {
    setAction(value)
    if (value === 'pause') {
      pauseRecording()
    } else {
      resumeRecording()
    }
  }

  return (
    <article style={{textAlign: 'center'}}>
      <h1>Screen recorder</h1>
      <span style={{fontSize:24, margin: 10}}>
       Status :
      </span>
      <span style={{color: 'red', fontSize:24, margin: 10}}>
        {error ? `${status} ${error.message}` : status === 'recording' ?
          <span>
            {status}
            <Spin indicator={antIcon} />
            <Clock action={action}/>
          </span>
          : status}
      </span>
      <section>
        <button
          type="button"
          onClick={() => {
            startRecording(1000);
            setAction('')
          }}
          disabled={status === 'recording'}
          style={{
            color: status === 'recording'?
              'gray' : 'red', 
            borderColor: status === 'recording'?
              '' : 'red', 
          }}
        >
          Start recording
        </button>
        <button
          style={{
            paddingLeft: 10,
            color: status !== 'recording'?
              'gray'
              : action === 'pause' ? 'gray':'red',
            borderColor: status !== 'recording' ?
              ''
              : action === 'pause' ? '':'red',
          }}
          type="button"
          onClick={() => handlePause('pause')}
          disabled={status !== 'recording'}
        >
          Pause recording
        </button>
        <button
          style={{
            paddingLeft: 10,
            color: status !== 'recording'?
              'gray'
              : action === 'resume' ? 'gray':action === 'pause'?'red':'gray',
            borderColor: status !== 'recording' ?
              ''
              : action === 'resume' ? 'gray':action === 'pause'?'red':'',
          }}
          type="button"
          onClick={() => handlePause('resume')}
          disabled={status !== 'recording'}
        >
          Resume recording
        </button>
        <button
          style={{
            paddingLeft: 10,
            color: status !== 'recording' ?
              'gray' : 'red',
            borderColor: status !== 'recording' ?
              '' : 'red',
          }}
          type="button"
          onClick={() =>
            {stopRecording();
            setAction('')
          }
          }
          disabled={status !== 'recording'}
        >
          Stop recording
        </button>
        <p>
        Select video source
        <label style={{paddingLeft:10}}>
          <input
            type="radio"
            checked={recordScreen}
            onChange={() => setRecordScreen((prevState) => !prevState)}
          />{' '}
          Screen
        </label>
        <label style={{paddingLeft:10}}>
          <input
            type="radio"
            checked={!recordScreen}
            onChange={() => setRecordScreen((prevState) => !prevState)}
          />{' '}
          Camera
        </label>
      </p>
      </section>
      <LiveStreamPreview stream={liveStream} />
      {
        status === 'stopped' && <Player srcBlob={mediaBlob} status={status}  />
      }
    </article>
  );
}