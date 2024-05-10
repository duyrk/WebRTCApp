import React from 'react';
import ReactPlayer from 'react-player';

export interface VideoPlayerProps {
  url: string | string[] | MediaStream;
  muted: boolean;
  playing: boolean;
  playerId: string;
}
const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { url, muted, playing, playerId } = props;
  console.log(url)
  return (
    <div>
      <ReactPlayer key={playerId} url={url} muted={muted} playing={playing} />
    </div>
  );
};

export default VideoPlayer;
