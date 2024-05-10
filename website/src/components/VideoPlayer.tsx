import React from 'react';

export interface VideoPlayerProps {
  stream: MediaStream;
}
const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { stream } = props;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, []);
  return <video ref={videoRef} autoPlay/>;
};

export default VideoPlayer;
