'use client';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from './index.module.css';
import { IconMicrophone, IconMicrophoneOff, IconUserSquare } from '@tabler/icons-react';
export interface VideoPlayerProps {
  url: string | string[] | MediaStream;
  muted: boolean;
  playing: boolean;
  isActive: boolean;
}
const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { url, muted, playing, isActive } = props;
  console.log(url);
  return (
    <div
      className={`${styles.playerContainer} ${isActive ? styles.active : styles.notActive} ${
        !playing && styles.notPlaying
      }`}
    >
      {playing ? (
        <ReactPlayer url={url} muted={muted} playing={playing} width="100%" height="100%" />
      ) : (
        <IconUserSquare className={styles.user} size={isActive ? 400 : 100} />
      )}

      {!isActive ? (
        muted ? (
          <IconMicrophoneOff className={styles.icon} size={20} />
        ) : (
          <IconMicrophone className={styles.icon} size={20} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoPlayer;
