import React from 'react';
import {
  IconMicrophone2,
  IconMicrophone2Off,
  IconPhoneOff,
  IconVideo,
  IconVideoOff,
} from '@tabler/icons-react';

export interface BottomProps {
  muted: boolean;
  playing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom: () => void;
}
import styles from './index.module.css';
const Bottom: React.FC<BottomProps> = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;
  return (
    <div className={styles.bottomMenu}>
      {muted ? (
        <IconMicrophone2Off
          className={`${styles.icon} ${styles.active}`}
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <IconMicrophone2 className={styles.icon} size={55} onClick={toggleAudio} />
      )}
      {playing ? (
        <IconVideo className={styles.icon} size={55} onClick={toggleVideo}/>
      ) : (
        <IconVideoOff className={`${styles.icon} ${styles.active}`} size={55} onClick={toggleVideo}/>
      )}
      <IconPhoneOff size={55} className={styles.icon} onClick={leaveRoom}/>
    </div>
  );
};
export default Bottom;
