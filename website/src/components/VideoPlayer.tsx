import React from 'react';
import ReactPlayer from 'react-player';

export interface VideoPlayerProps {
  url: string | string[] | MediaStream;
  muted: boolean;
  playing: boolean;
}
const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { url, muted, playing} = props;
  console.log(url)
  return (
    <div>
      <ReactPlayer  url={url} muted={muted} playing={playing} />
    </div>
  );
};

export default VideoPlayer;
