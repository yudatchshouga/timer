'use client';

import { useEffect, useRef, useState } from 'react';
import { getDisplayTime } from './function';
import { Button } from './Button';
import { Spacer } from './Spacer';

export default function Page() {
  // 時間
  const [time, setTime] = useState<number>(300);
  // 状態
  enum Status {
    PROGRESS = 'PROGRESS',
    STOP = 'STOP',
    ALARM = 'ALARM',
  }
  const [status, setStatus] = useState<Status>(Status.STOP);
  // ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (status === Status.PROGRESS) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev < 1) {
            clearInterval(intervalRef.current!);
            setStatus(Status.ALARM);
            // 音を鳴らす
            audioRef.current?.play();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (status === Status.STOP && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{}}>
        <div
          style={{
            fontSize: '100px',
            fontFamily: 'Roboto, sans-serif',
            textAlign: 'center',
          }}
        >
          {getDisplayTime(time)}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            name="リセット"
            onClick={() => {
              setTime(0);
              setStatus(Status.STOP);
              audioRef.current?.pause();
            }}
            width="120px"
          />
          <Spacer width="4px" />
          <Button
            name="分"
            onClick={() => {
              console.log('分');
              setTime((prev) => prev + 60);
            }}
            width="60px"
          />
          <Spacer width="4px" />
          <Button
            name="秒"
            onClick={() => {
              setTime((prev) => prev + 1);
            }}
            width="60px"
          />
          <Spacer width="4px" />
          <Button
            name={status === Status.STOP ? 'スタート' : '停止'}
            onClick={() => {
              if (status === Status.STOP) {
                setStatus(Status.PROGRESS);
              } else if (status === Status.PROGRESS) {
                setStatus(Status.STOP);
              } else if (status === Status.ALARM) {
                setStatus(Status.STOP);
                audioRef.current?.pause();
              }
            }}
            disabled={status === Status.STOP && time === 0}
            width="120px"
          />
        </div>
      </div>
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" loop></audio>
    </div>
  );
}
