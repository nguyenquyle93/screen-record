// import VideoCrop from 'video-crop';

export default function VideoEdit(video) {
const testFile = video;
const outFile = '/public/videoout/out.mp4';

const opts = {
  input: testFile,
  output: outFile,
  x: [500, 600],
  y: [250, 500],
  height: [100, 300],
  width: [100, 300],
  fps: 60 // optional 
};

  // const vc = new VideoCrop();
  
; // outputs two files: '/path/to/out1.mp4', '/path/to/out2.mp4'
  return (
    <div></div>
  )
}

